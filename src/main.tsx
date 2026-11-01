import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminPage from './AdminPage.tsx'
import Privacy from './Privacy.tsx'
import ThankYou from './ThankYou.tsx'
import { captureAttribution } from './lib/attribution'

const url = new URL(window.location.href)
const isAdminRoute =
  url.searchParams.get('admin') === '1' ||
  window.location.hash.toLowerCase().startsWith('#/admin')

if (
  /[?&#]type=(invite|recovery)(?:&|$)/i.test(window.location.href) &&
  (url.searchParams.has('token_hash') || window.location.hash.includes('access_token='))
) {
  sessionStorage.setItem('brandup-password-setup', '1')
}

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
