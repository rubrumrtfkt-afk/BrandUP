import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowLeft,
  KeyRound,
  LoaderCircle,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import { supabase } from './lib/supabase'
// plano-producao §1: main.tsx no longer imports index.css globally (the landing never needed it); AdminPage.css
// and LeadBoard.css still read its tokens (--aqua, --text-muted, --line, --accent, --text, --bg,
// admin-crm-inventario §3.2), so this is the one page that imports it now.
import './index.css'
import './AdminPage.css'

import LeadBoard from './LeadBoard'
import type { Lead, LeadStatus } from './lib/leadboard'

function AdminPage() {
  const [authReady, setAuthReady] = useState(false)
  const [sessionEmail, setSessionEmail] = useState<string | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isCheckingAccess, setIsCheckingAccess] = useState(false)
  const [isLoadingLeads, setIsLoadingLeads] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isAcceptingInvitation, setIsAcceptingInvitation] = useState(false)
  const [isSettingPassword, setIsSettingPassword] = useState(false)
  const [pendingInviteToken] = useState(
    () => new URL(window.location.href).searchParams.get('token_hash') ?? '',
  )
  const [requiresPasswordSetup, setRequiresPasswordSetup] = useState(
    () => sessionStorage.getItem('brandup-password-setup') === '1',
  )
  const [loginError, setLoginError] = useState('')
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

    // Not N+1: one cursor-paginated catch-up load (Supabase's own 1000-row page cap), not a query per row.
    // Pre-existing (admin-crm-inventario §4.2); out of scope for this swap, which only touches the shell and routing.
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
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        setSessionEmail(session.user.email ?? null)

        if (sessionStorage.getItem('brandup-password-setup') !== '1') {
          await loadDashboard(session.user.id, session.user.email ?? null)
        }
      }

      setAuthReady(true)
    }

    void initializeSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setSessionEmail(null)
        setIsAuthorized(false)
        setLeads([])
        setAuthReady(true)
        return
      }

      if (event === 'SIGNED_IN') {
        setSessionEmail(session.user.email ?? null)
        setAuthReady(true)

        if (sessionStorage.getItem('brandup-password-setup') === '1') {
          setRequiresPasswordSetup(true)
        }
      }
    })

    return () => {
      subscription.unsubscribe()
      // admin-crm-inventario §9.3 item 9: this used to restore the old site's restaurant-era title; /admin/ is
      // its own page now (app.html), so the only sane "other" title to restore is the page's own.
      document.title = 'Lead Dashboard | BrandUp'
    }
  }, [])

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSigningIn(true)
    setLoginError('')

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

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const handleAcceptInvitation = async () => {
    setIsAcceptingInvitation(true)
    setInvitationError('')
    sessionStorage.setItem('brandup-password-setup', '1')

    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: pendingInviteToken,
      type: 'invite',
    })

    if (error || !data.session) {
      sessionStorage.removeItem('brandup-password-setup')
      setInvitationError(
        'This invitation is no longer valid. Ask BrandUp to send a new invitation.',
      )
      setIsAcceptingInvitation(false)
      return
    }

    setSessionEmail(data.session.user.email ?? null)
    setRequiresPasswordSetup(true)
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

    const { data, error } = await supabase.auth.updateUser({ password })

    if (error || !data.user) {
      setPasswordError('Your password could not be saved. Request a new invitation.')
      setIsSettingPassword(false)
      return
    }

    sessionStorage.removeItem('brandup-password-setup')
    // plano-producao §1: the admin now lives at its own route; a bare "/?admin=1" would hit the landing's
    // diversion script again on the next load, which already sends it here, but this keeps the address bar honest.
    window.history.replaceState({}, '', '/admin/?admin=1')
    setRequiresPasswordSetup(false)
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
        <a className="admin-back-link" href="/">
          <ArrowLeft aria-hidden="true" size={18} />
          Back to website
        </a>

        <section className="admin-login-panel" aria-labelledby="admin-invite-title">
          <div className="admin-login-brand">
            <span>BrandUp</span>
            <ShieldCheck aria-hidden="true" size={26} />
          </div>
          <p className="admin-eyebrow">Secure invitation</p>
          <h1 id="admin-invite-title">Activate agency access</h1>
          <p className="admin-login-copy">
            Confirm this invitation to create your password and access the lead dashboard.
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
            {isAcceptingInvitation ? 'Confirming invitation...' : 'Accept secure invitation'}
          </button>
          <p className="admin-form-error" role="alert">
            {invitationError}
          </p>
        </section>
      </main>
    )
  }

  if (!sessionEmail) {
    return (
      <main className="admin-login-page">
        <a className="admin-back-link" href="/">
          <ArrowLeft aria-hidden="true" size={18} />
          Back to website
        </a>

        <section className="admin-login-panel" aria-labelledby="admin-login-title">
          <div className="admin-login-brand">
            <span>BrandUp</span>
            <ShieldCheck aria-hidden="true" size={26} />
          </div>
          <p className="admin-eyebrow">Agency access</p>
          <h1 id="admin-login-title">Lead dashboard</h1>
          <p className="admin-login-copy">
            Sign in with your authorized agency account to manage incoming leads.
          </p>

          <form className="admin-login-form" onSubmit={handleLogin}>
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
          </form>
        </section>
      </main>
    )
  }

  if (requiresPasswordSetup) {
    return (
      <main className="admin-login-page">
        <a className="admin-back-link" href="/">
          <ArrowLeft aria-hidden="true" size={18} />
          Back to website
        </a>

        <section className="admin-login-panel" aria-labelledby="admin-password-title">
          <div className="admin-login-brand">
            <span>BrandUp</span>
            <ShieldCheck aria-hidden="true" size={26} />
          </div>
          <p className="admin-eyebrow">Invitation accepted</p>
          <h1 id="admin-password-title">Create your password</h1>
          <p className="admin-login-copy">
            Set a secure password for {sessionEmail} to finish activating your agency
            account.
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
              {isSettingPassword ? 'Saving password...' : 'Activate secure access'}
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
