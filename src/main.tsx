import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminPage from './AdminPage.tsx'
import Privacy from './Privacy.tsx'
import ThankYou from './ThankYou.tsx'
import { captureAttribution } from './lib/attribution'
import { detectPasswordLink, hasAuthLinkError, storePasswordSetup } from './lib/passwordLink'

const url = new URL(window.location.href)
const passwordLinkType = detectPasswordLink(window.location.href)

if (passwordLinkType) {
  storePasswordSetup(sessionStorage, passwordLinkType)
}

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
