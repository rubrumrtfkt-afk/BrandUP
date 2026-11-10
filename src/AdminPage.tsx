import { useCallback, useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowLeft,
  KeyRound,
  LoaderCircle,
  LogOut,
  Mail,
  ShieldCheck,
} from 'lucide-react'
import { supabase } from './lib/supabase'
import './AdminPage.css'

import LeadBoard from './LeadBoard'
import type { Lead, LeadStatus } from './lib/leadboard'
import { createPasswordFlow } from './lib/passwordFlow'
import {
  canSetPassword,
  clearPasswordSetup,
  hasAuthLinkError,
  parsePasswordLink,
} from './lib/passwordLink'
import type { KeyValueStore, PasswordLinkType, PasswordSetup } from './lib/passwordLink'

// Read before Supabase finishes parsing the URL, because it clears the auth hash.
const initialUrl = new URL(window.location.href)
const initialLink = parsePasswordLink(initialUrl.href)
const expiredLinkMessage =
  'This link has expired or was already used. Enter your email to get a new reset link.'
const initialLinkError = hasAuthLinkError(initialUrl.href) ? expiredLinkMessage : ''

// A token_hash left in the address bar rides in the referrer of the next navigation
// ("Back to website", where attribution and the Pixel read it) and stays in history.
// verifyOtp gets it from memory; supabase-js never reads it from the URL.
if (initialLink?.tokenHash) {
  window.history.replaceState(null, '', '/?admin=1')
}

// Lazy, so a browser that blocks storage cannot crash the module (helpers catch the throw).
const tabStorage: KeyValueStore = {
  getItem: key => window.sessionStorage.getItem(key),
  setItem: (key, value) => window.sessionStorage.setItem(key, value),
  removeItem: key => window.sessionStorage.removeItem(key),
}
const passwordFlow = createPasswordFlow(supabase.auth, initialLink, tabStorage)

function AdminPage() {
  const [authReady, setAuthReady] = useState(false)
  const [sessionEmail, setSessionEmail] = useState<string | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isCheckingAccess, setIsCheckingAccess] = useState(false)
  const [isLoadingLeads, setIsLoadingLeads] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isAcceptingInvitation, setIsAcceptingInvitation] = useState(false)
  const [isSettingPassword, setIsSettingPassword] = useState(false)
  const [isSendingReset, setIsSendingReset] = useState(false)
  const [pendingInviteToken] = useState(() => initialLink?.tokenHash ?? '')
  const [pendingLinkType] = useState<PasswordLinkType>(() => initialLink?.type ?? 'invite')
  // Set only on trusted paths (see passwordFlow.ts) and bound to the link's account.
  const [passwordSetup, setPasswordSetup] = useState<PasswordSetup | null>(null)
  const passwordSetupRef = useRef<PasswordSetup | null>(null)
  const loginFormRef = useRef<HTMLFormElement>(null)
  const loginViewChangedRef = useRef(false)
  const [loginView, setLoginView] = useState<'signIn' | 'forgot'>(() =>
    initialLinkError ? 'forgot' : 'signIn',
  )
  const [loginError, setLoginError] = useState('')
  const [resetError, setResetError] = useState(initialLinkError)
  const [resetMessage, setResetMessage] = useState('')
  const [invitationError, setInvitationError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [dashboardError, setDashboardError] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])

  const loadDashboard = async (userId: string, email: string | null) => {
    setIsCheckingAccess(true)
    setIsLoadingLeads(true)
    setDashboardError('')
    setSessionEmail(email)

    const { data: adminMembership, error: membershipError } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle()

    if (membershipError || !adminMembership) {
      setIsAuthorized(false)
      setLeads([])
      setIsLoadingLeads(false)
      setIsCheckingAccess(false)

      if (membershipError) {
        setDashboardError('Secure access could not be verified. Please sign out and try again.')
      }

      return
    }

    setIsAuthorized(true)
    setIsCheckingAccess(false)

    const items: Lead[] = []
    for (let offset = 0; ; offset += 1000) {
      const { data, error } = await supabase.from('leads')
        .select('id,created_at,name,email,phone,company,monthly_revenue,status,utm_source,utm_medium,utm_campaign,utm_content,utm_term,fbclid,gclid,referrer,landing_page,offer,placement,partner,link_id')
        .order('created_at', { ascending: false }).order('id').range(offset, offset + 999)
      if (error) {
        setDashboardError('Não foi possível atualizar os leads. Confira a conexão e se a migração do banco foi aplicada. Dados anteriores, se houver, foram mantidos.')
        setIsLoadingLeads(false)
        return
      }
      items.push(...data as Lead[])
      if (data.length < 1000) break
    }
    setLeads(items)

    setIsLoadingLeads(false)
  }

  useEffect(() => {
    document.title = 'Lead Dashboard | BrandUp'

    const initializeSession = async () => {
      const result = await passwordFlow.init()

      if (result.linkFailed) {
        setLoginView('forgot')
        setResetError(expiredLinkMessage)
      }

      if (result.session) {
        setSessionEmail(result.session.user.email ?? null)

        if (result.passwordSetup) {
          setPasswordSetup(result.passwordSetup)
        } else {
          await loadDashboard(result.session.user.id, result.session.user.email ?? null)
        }
      }

      setAuthReady(true)
    }

    void initializeSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const action = passwordFlow.onAuthEvent(event, session, passwordSetupRef.current)

      if (action.kind === 'ignore') {
        return
      }

      if (action.kind === 'signedOut') {
        setSessionEmail(null)
        setIsAuthorized(false)
        setLeads([])
        setPasswordSetup(null)
        setAuthReady(true)
        return
      }

      setSessionEmail(action.session.user.email ?? null)
      setAuthReady(true)

      if (action.kind === 'passwordSetup') {
        setPasswordSetup(action.setup)
      } else if (!action.keepPasswordSetup) {
        // Another account signed in (e.g. in another tab): the password step on screen is not theirs.
        setPasswordSetup(null)
        void loadDashboard(action.session.user.id, action.session.user.email ?? null)
      }
    })

    return () => {
      subscription.unsubscribe()
      document.title = 'BrandUp | Restaurant Marketing Australia'
    }
  }, [])

  useEffect(() => {
    passwordSetupRef.current = passwordSetup
  }, [passwordSetup])

  // Moving between sign-in and reset swaps the whole form: put focus on its first field.
  useEffect(() => {
    if (!loginViewChangedRef.current) return
    loginViewChangedRef.current = false
    loginFormRef.current?.querySelector('input')?.focus()
  }, [loginView])

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSigningIn(true)
    setLoginError('')
    // A typed password is not a link flow: a leftover flag must not open the password screen.
    clearPasswordSetup(tabStorage)
    setPasswordSetup(null)

    const formData = new FormData(event.currentTarget)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: String(formData.get('email') ?? '').trim().toLowerCase(),
      password: String(formData.get('password') ?? ''),
    })

    if (error) {
      if (error.code === 'email_not_confirmed') {
        setLoginError('This email address has not been confirmed yet.')
      } else if (error.code === 'over_request_rate_limit') {
        setLoginError('Too many attempts. Wait a moment and try again.')
      } else if (error.code === 'invalid_credentials') {
        setLoginError('The email or password is incorrect.')
      } else {
        setLoginError('The authentication service could not be reached. Please try again.')
      }

      setIsSigningIn(false)
      return
    }

    if (!data.user) {
      setLoginError('The session could not be created. Please try again.')
      setIsSigningIn(false)
      return
    }

    await loadDashboard(data.user.id, data.user.email ?? null)
    setIsSigningIn(false)
  }

  const handleRequestReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSendingReset(true)
    setResetError('')
    setResetMessage('')

    const formData = new FormData(event.currentTarget)
    const { error } = await supabase.auth.resetPasswordForEmail(
      String(formData.get('email') ?? '').trim().toLowerCase(),
      { redirectTo: `${window.location.origin}/?admin=1` },
    )

    // over_email_send_rate_limit is per address: answering it differently would tell
    // whether the email has an account, so it gets the same neutral message as success.
    if (error && error.code !== 'over_email_send_rate_limit') {
      if (error.code === 'over_request_rate_limit') {
        setResetError('Too many reset requests. Wait a few minutes and try again.')
      } else {
        setResetError('The reset link could not be sent. Please try again.')
      }
    } else {
      setResetMessage(
        'If this email belongs to an agency account, a reset link is on its way. Check your inbox and spam folder.',
      )
    }

    setIsSendingReset(false)
  }

  const showLoginView = (view: 'signIn' | 'forgot') => {
    loginViewChangedRef.current = true
    setLoginView(view)
    setLoginError('')
    setResetError('')
    setResetMessage('')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const handleAcceptInvitation = async () => {
    setIsAcceptingInvitation(true)
    setInvitationError('')

    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: pendingInviteToken,
      type: pendingLinkType,
    })

    if (error || !data.session) {
      setInvitationError(
        pendingLinkType === 'recovery'
          ? 'This reset link is no longer valid. Request a new one from the sign-in page.'
          : 'This invitation is no longer valid. Ask BrandUp to send a new invitation.',
      )
      setIsAcceptingInvitation(false)
      return
    }

    setSessionEmail(data.session.user.email ?? null)
    setPasswordSetup(passwordFlow.acceptVerifiedLink(data.session))
    setIsAcceptingInvitation(false)
  }

  const handleSetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSettingPassword(true)
    setPasswordError('')

    const formData = new FormData(event.currentTarget)
    const password = String(formData.get('password') ?? '')
    const passwordConfirmation = String(formData.get('passwordConfirmation') ?? '')

    if (password.length < 8) {
      setPasswordError('Use at least 8 characters.')
      setIsSettingPassword(false)
      return
    }

    if (password !== passwordConfirmation) {
      setPasswordError('The passwords do not match.')
      setIsSettingPassword(false)
      return
    }

    const saveFailedMessage =
      passwordSetup?.type === 'recovery'
        ? 'Your password could not be saved. Request a new reset link.'
        : 'Your password could not be saved. Request a new invitation.'

    // Backstop: if the live session is no longer the link's account (another tab signed
    // in as someone else), never change that account's password.
    const {
      data: { session: liveSession },
    } = await supabase.auth.getSession()

    if (!canSetPassword(passwordSetup, liveSession?.user.id ?? null)) {
      setPasswordError(saveFailedMessage)
      setIsSettingPassword(false)
      return
    }

    const { data, error } = await supabase.auth.updateUser({ password })

    if (error || !data.user) {
      if (error?.code === 'same_password') {
        setPasswordError('Choose a password different from your current one.')
      } else if (error?.code === 'weak_password') {
        setPasswordError('This password is too weak. Try a longer one.')
      } else {
        setPasswordError(saveFailedMessage)
      }

      setIsSettingPassword(false)
      return
    }

    clearPasswordSetup(tabStorage)
    window.history.replaceState({}, '', '/?admin=1')
    setPasswordSetup(null)
    setIsSettingPassword(false)
    await loadDashboard(data.user.id, data.user.email ?? null)
  }

  const refreshLeads = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      await loadDashboard(session.user.id, session.user.email ?? null)
    }
  }, [])

  const updateLeadStatus = async (leadId: string, status: LeadStatus) => {
    setDashboardError('')
    const { error } = await supabase.from('leads').update({ status }).eq('id', leadId).select('id').single()
    if (error) {
      setDashboardError('A etapa não foi salva. Nenhum dado local foi alterado; confira a conexão e tente novamente.')
      return
    }
    setLeads(current => current.map(lead => lead.id === leadId ? { ...lead, status } : lead))
  }

  if (!authReady) {
    return (
      <main className="admin-state-screen" aria-busy="true">
        <LoaderCircle className="admin-spinner" aria-hidden="true" />
        <p>Checking secure access...</p>
      </main>
    )
  }

  if (pendingInviteToken && !sessionEmail) {
    return (
      <main className="admin-login-page">
        <a className="admin-back-link" href="/" rel="noreferrer">
          <ArrowLeft aria-hidden="true" size={18} />
          Back to website
        </a>

        <section className="admin-login-panel" aria-labelledby="admin-invite-title">
          <div className="admin-login-brand">
            <span>BrandUp</span>
            <ShieldCheck aria-hidden="true" size={26} />
          </div>
          <p className="admin-eyebrow">
            {pendingLinkType === 'recovery' ? 'Password reset' : 'Secure invitation'}
          </p>
          <h1 id="admin-invite-title">
            {pendingLinkType === 'recovery' ? 'Reset your password' : 'Activate agency access'}
          </h1>
          <p className="admin-login-copy">
            {pendingLinkType === 'recovery'
              ? 'Confirm this secure link to choose a new password for the lead dashboard.'
              : 'Confirm this invitation to create your password and access the lead dashboard.'}
          </p>
          <button
            className="admin-primary-button"
            disabled={isAcceptingInvitation}
            onClick={handleAcceptInvitation}
            type="button"
          >
            {isAcceptingInvitation ? (
              <LoaderCircle className="admin-spinner" aria-hidden="true" size={20} />
            ) : (
              <ShieldCheck aria-hidden="true" size={20} />
            )}
            {isAcceptingInvitation
              ? 'Confirming link...'
              : pendingLinkType === 'recovery'
                ? 'Continue securely'
                : 'Accept secure invitation'}
          </button>
          <p className="admin-form-error" role="alert">
            {invitationError}
          </p>
          {invitationError && pendingLinkType === 'recovery' && (
            <a className="admin-link-button" href="/?admin=1">
              Back to sign in
            </a>
          )}
        </section>
      </main>
    )
  }

  if (!sessionEmail) {
    return (
      <main className="admin-login-page">
        <a className="admin-back-link" href="/" rel="noreferrer">
          <ArrowLeft aria-hidden="true" size={18} />
          Back to website
        </a>

        <section className="admin-login-panel" aria-labelledby="admin-login-title">
          <div className="admin-login-brand">
            <span>BrandUp</span>
            <ShieldCheck aria-hidden="true" size={26} />
          </div>
          <p className="admin-eyebrow">Agency access</p>
          <h1 id="admin-login-title">
            {loginView === 'forgot' ? 'Reset your password' : 'Lead dashboard'}
          </h1>
          <p className="admin-login-copy">
            {loginView === 'forgot'
              ? 'Enter your agency email and we will send you a secure link to choose a new password.'
              : 'Sign in with your authorized agency account to manage incoming leads.'}
          </p>

          {loginView === 'forgot' ? (
            <form className="admin-login-form" onSubmit={handleRequestReset} ref={loginFormRef}>
              <label>
                Email
                <input
                  autoComplete="email"
                  name="email"
                  placeholder="name@brandupadvisory.com"
                  required
                  type="email"
                />
              </label>
              <button className="admin-primary-button" disabled={isSendingReset} type="submit">
                {isSendingReset ? (
                  <LoaderCircle className="admin-spinner" aria-hidden="true" size={20} />
                ) : (
                  <Mail aria-hidden="true" size={20} />
                )}
                {isSendingReset ? 'Sending link...' : 'Send reset link'}
              </button>
              {/* Both live regions stay mounted so screen readers announce text changes. */}
              <div className="admin-form-feedback">
                <p className="admin-form-success" role="status">
                  {resetMessage}
                </p>
                <p className="admin-form-error" role="alert">
                  {resetMessage ? '' : resetError}
                </p>
              </div>
              <button
                className="admin-link-button"
                onClick={() => showLoginView('signIn')}
                type="button"
              >
                Back to sign in
              </button>
            </form>
          ) : (
            <form className="admin-login-form" onSubmit={handleLogin} ref={loginFormRef}>
              <label>
                Email
                <input
                  autoComplete="email"
                  name="email"
                  placeholder="name@brandupadvisory.com"
                  required
                  type="email"
                />
              </label>
              <label>
                Password
                <input
                  autoComplete="current-password"
                  minLength={8}
                  name="password"
                  placeholder="Your password"
                  required
                  type="password"
                />
              </label>
              <button className="admin-primary-button" disabled={isSigningIn} type="submit">
                {isSigningIn ? (
                  <LoaderCircle className="admin-spinner" aria-hidden="true" size={20} />
                ) : (
                  <ShieldCheck aria-hidden="true" size={20} />
                )}
                {isSigningIn ? 'Signing in...' : 'Sign in securely'}
              </button>
              <p className="admin-form-error" role="alert">
                {loginError}
              </p>
              <button
                className="admin-link-button"
                onClick={() => showLoginView('forgot')}
                type="button"
              >
                Forgot password?
              </button>
            </form>
          )}
        </section>
      </main>
    )
  }

  if (passwordSetup) {
    return (
      <main className="admin-login-page">
        <a className="admin-back-link" href="/" rel="noreferrer">
          <ArrowLeft aria-hidden="true" size={18} />
          Back to website
        </a>

        <section className="admin-login-panel" aria-labelledby="admin-password-title">
          <div className="admin-login-brand">
            <span>BrandUp</span>
            <ShieldCheck aria-hidden="true" size={26} />
          </div>
          <p className="admin-eyebrow">
            {passwordSetup.type === 'recovery' ? 'Password reset' : 'Invitation accepted'}
          </p>
          <h1 id="admin-password-title">
            {passwordSetup.type === 'recovery' ? 'Choose a new password' : 'Create your password'}
          </h1>
          <p className="admin-login-copy">
            {passwordSetup.type === 'recovery'
              ? `Set a new password for ${sessionEmail} to get back into the lead dashboard.`
              : `Set a secure password for ${sessionEmail} to finish activating your agency account.`}
          </p>

          <form className="admin-login-form" onSubmit={handleSetPassword}>
            <label>
              New password
              <input
                autoComplete="new-password"
                minLength={8}
                name="password"
                placeholder="At least 8 characters"
                required
                type="password"
              />
            </label>
            <label>
              Confirm password
              <input
                autoComplete="new-password"
                minLength={8}
                name="passwordConfirmation"
                placeholder="Enter your password again"
                required
                type="password"
              />
            </label>
            <button
              className="admin-primary-button"
              disabled={isSettingPassword}
              type="submit"
            >
              {isSettingPassword ? (
                <LoaderCircle className="admin-spinner" aria-hidden="true" size={20} />
              ) : (
                <KeyRound aria-hidden="true" size={20} />
              )}
              {isSettingPassword
                ? 'Saving password...'
                : passwordSetup.type === 'recovery'
                  ? 'Save new password'
                  : 'Activate secure access'}
            </button>
            <p className="admin-form-error" role="alert">
              {passwordError}
            </p>
          </form>
        </section>
      </main>
    )
  }

  if (isCheckingAccess && !isAuthorized) {
    return (
      <main className="admin-state-screen" aria-busy="true">
        <LoaderCircle className="admin-spinner" aria-hidden="true" />
        <p>Verifying agency access...</p>
      </main>
    )
  }

  if (!isAuthorized) {
    return (
      <main className="admin-state-screen">
        <ShieldCheck aria-hidden="true" size={38} />
        <h1>Access not authorized</h1>
        <p>
          {dashboardError || `${sessionEmail} is not on the BrandUp agency access list.`}
        </p>
        <button className="admin-secondary-button" onClick={handleLogout} type="button">
          <LogOut aria-hidden="true" size={18} />
          Sign out
        </button>
      </main>
    )
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-header">
        <a className="admin-logo" href="/">
          BrandUp
          <ShieldCheck aria-hidden="true" size={24} />
        </a>
        <div className="admin-account">
          <span>{sessionEmail}</span>
          <button aria-label="Sign out" onClick={handleLogout} title="Sign out" type="button">
            <LogOut aria-hidden="true" size={19} />
          </button>
        </div>
      </header>

      <LeadBoard leads={leads} loading={isLoadingLeads} error={dashboardError} refresh={refreshLeads} updateStatus={updateLeadStatus} />
    </main>
  )
}

export default AdminPage
