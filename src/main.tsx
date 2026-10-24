import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminPage from './AdminPage.tsx'

const url = new URL(window.location.href)
const passwordLinkType = /[?&#]type=(invite|recovery)(?:&|$)/i
  .exec(window.location.href)?.[1]
  ?.toLowerCase()
const isPasswordLink =
  Boolean(passwordLinkType) &&
  (url.searchParams.has('token_hash') || window.location.hash.includes('access_token='))

if (isPasswordLink && passwordLinkType) {
  sessionStorage.setItem('brandup-password-setup', passwordLinkType)
}

// Invite and reset links open the admin page even if Supabase falls back to the site root.
const isAdminRoute =
  url.searchParams.get('admin') === '1' ||
  window.location.hash.toLowerCase().startsWith('#/admin') ||
  isPasswordLink

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminRoute ? <AdminPage /> : <App />}
  </StrictMode>,
)
