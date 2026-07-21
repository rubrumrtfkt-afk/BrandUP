import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowLeft,
  Download,
  KeyRound,
  LoaderCircle,
  LogOut,
  RefreshCw,
  Search,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'
import { supabase } from './lib/supabase'
import './AdminPage.css'

type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed' | 'archived'

type Lead = {
  id: string
  created_at: string
  name: string
  email: string
  phone: string
  company: string
  monthly_revenue: string
  status: LeadStatus
}

const statusLabels: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  closed: 'Closed',
  archived: 'Archived',
}

const csvCell = (value: string) => `"${value.replaceAll('"', '""')}"`

function AdminPage() {
  const [authReady, setAuthReady] = useState(false)
  const [sessionEmail, setSessionEmail] = useState<string | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)
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
  const [searchTerm, setSearchTerm] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])

  const loadDashboard = async (userId: string, email: string | null) => {
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
      return
    }

    setIsAuthorized(true)

    const { data, error } = await supabase
      .from('leads')
      .select('id, created_at, name, email, phone, company, monthly_revenue, status')
      .order('created_at', { ascending: false })

    if (error) {
      setDashboardError('The leads could not be loaded. Please try again.')
      setLeads([])
    } else {
      setLeads((data ?? []) as Lead[])
    }

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
        if (sessionStorage.getItem('brandup-password-setup') === '1') {
          setRequiresPasswordSetup(true)
          setSessionEmail(session.user.email ?? null)
          setAuthReady(true)
          return
        }

        void loadDashboard(session.user.id, session.user.email ?? null)
      }
    })

    return () => {
      subscription.unsubscribe()
      document.title = 'BrandUp | Restaurant Marketing Australia'
    }
  }, [])

  const filteredLeads = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return leads
    }

    return leads.filter((lead) =>
      [lead.name, lead.email, lead.phone, lead.company, lead.monthly_revenue]
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [leads, searchTerm])

  const metrics = useMemo(
    () => ({
      total: leads.length,
      new: leads.filter((lead) => lead.status === 'new').length,
      contacted: leads.filter((lead) => lead.status === 'contacted').length,
      converted: leads.filter((lead) =>
        ['qualified', 'closed'].includes(lead.status),
      ).length,
    }),
    [leads],
  )

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSigningIn(true)
    setLoginError('')

    const formData = new FormData(event.currentTarget)
    const { error } = await supabase.auth.signInWithPassword({
      email: String(formData.get('email') ?? '').trim().toLowerCase(),
      password: String(formData.get('password') ?? ''),
    })

    if (error) {
      setLoginError('Invalid email or password.')
      setIsSigningIn(false)
      return
    }

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
    window.history.replaceState({}, '', '/?admin=1')
    setRequiresPasswordSetup(false)
    setIsSettingPassword(false)
    await loadDashboard(data.user.id, data.user.email ?? null)
  }

  const refreshLeads = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      await loadDashboard(session.user.id, session.user.email ?? null)
    }
  }

  const updateLeadStatus = async (leadId: string, status: LeadStatus) => {
    const previousLeads = leads
    setLeads((current) =>
      current.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)),
    )

    const { error } = await supabase.from('leads').update({ status }).eq('id', leadId)

    if (error) {
      setLeads(previousLeads)
      setDashboardError('The lead status could not be updated.')
    }
  }

  const exportCsv = () => {
    const header = [
      'Created at',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Monthly revenue',
      'Status',
    ]
    const rows = filteredLeads.map((lead) => [
      lead.created_at,
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      lead.monthly_revenue,
      statusLabels[lead.status],
    ])
    const csv = [header, ...rows]
      .map((row) => row.map((value) => csvCell(value)).join(','))
      .join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `brandup-leads-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
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

  if (!isAuthorized) {
    return (
      <main className="admin-state-screen">
        <ShieldCheck aria-hidden="true" size={38} />
        <h1>Access not authorized</h1>
        <p>{sessionEmail} is not on the BrandUp agency access list.</p>
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

      <div className="admin-content">
        <div className="admin-title-row">
          <div>
            <p className="admin-eyebrow">Lead management</p>
            <h1>Agency pipeline</h1>
            <p>Review, qualify, and follow up with every restaurant opportunity.</p>
          </div>
          <button className="admin-secondary-button" onClick={exportCsv} type="button">
            <Download aria-hidden="true" size={18} />
            Export CSV
          </button>
        </div>

        <section className="admin-metrics" aria-label="Lead summary">
          <article>
            <span>Total leads</span>
            <strong>{metrics.total}</strong>
          </article>
          <article>
            <span>New</span>
            <strong>{metrics.new}</strong>
          </article>
          <article>
            <span>Contacted</span>
            <strong>{metrics.contacted}</strong>
          </article>
          <article>
            <span>Qualified / closed</span>
            <strong>{metrics.converted}</strong>
          </article>
        </section>

        <section className="admin-leads-panel" aria-labelledby="lead-table-title">
          <div className="admin-toolbar">
            <div>
              <h2 id="lead-table-title">Incoming leads</h2>
              <span>{filteredLeads.length} records</span>
            </div>
            <div className="admin-toolbar-actions">
              <label className="admin-search">
                <Search aria-hidden="true" size={18} />
                <span className="admin-sr-only">Search leads</span>
                <input
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search name, company, or contact"
                  type="search"
                  value={searchTerm}
                />
              </label>
              <button
                aria-label="Refresh leads"
                disabled={isLoadingLeads}
                onClick={refreshLeads}
                title="Refresh leads"
                type="button"
              >
                <RefreshCw
                  className={isLoadingLeads ? 'admin-spinner' : undefined}
                  aria-hidden="true"
                  size={19}
                />
              </button>
            </div>
          </div>

          {dashboardError && (
            <p className="admin-dashboard-error" role="alert">
              {dashboardError}
            </p>
          )}

          {isLoadingLeads ? (
            <div className="admin-table-state" aria-busy="true">
              <LoaderCircle className="admin-spinner" aria-hidden="true" />
              Loading leads...
            </div>
          ) : filteredLeads.length ? (
            <div className="admin-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Lead</th>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Monthly revenue</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        {new Intl.DateTimeFormat('en-AU', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        }).format(new Date(lead.created_at))}
                      </td>
                      <td>
                        <strong>{lead.name}</strong>
                      </td>
                      <td>{lead.company}</td>
                      <td>
                        <a href={`mailto:${lead.email}`}>{lead.email}</a>
                        <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                      </td>
                      <td>{lead.monthly_revenue}</td>
                      <td>
                        <select
                          aria-label={`Status for ${lead.name}`}
                          className={`admin-status admin-status-${lead.status}`}
                          onChange={(event) =>
                            updateLeadStatus(lead.id, event.target.value as LeadStatus)
                          }
                          value={lead.status}
                        >
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-table-state">
              <UsersRound aria-hidden="true" size={28} />
              {searchTerm ? 'No leads match this search.' : 'No leads have arrived yet.'}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default AdminPage
