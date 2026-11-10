import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminPage from './AdminPage.tsx'
import Privacy from './Privacy.tsx'
import ThankYou from './ThankYou.tsx'
import { captureAttribution } from './lib/attribution'
import { detectPasswordLink, hasAuthLinkError } from './lib/passwordLink'

const url = new URL(window.location.href)
// Routing only: an unverified URL never marks a password step (the admin page does,
// after the link's token produced the session). AdminPage, imported above, has already
// read the link and dropped a token_hash from the address bar.
const passwordLinkType = detectPasswordLink(window.location.href)

// Invite and reset links (and their expired-link redirects) open the admin page even if
// Supabase falls back to the site root, so their tokens never reach captureAttribution.
const isAdminRoute =
  url.searchParams.get('admin') === '1' ||
  window.location.hash.toLowerCase().startsWith('#/admin') ||
  passwordLinkType !== null ||
  hasAuthLinkError(window.location.href)

const path = window.location.pathname.replace(/\/+$/, '')

if (!isAdminRoute) {
  captureAttribution()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminRoute ? (
      <AdminPage />
    ) : path === '/thank-you' ? (
      <ThankYou />
    ) : path === '/privacy' ? (
      <Privacy />
    ) : (
      <App />
    )}
  </StrictMode>,
)
