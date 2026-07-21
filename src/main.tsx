import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminPage from './AdminPage.tsx'

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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminRoute ? <AdminPage /> : <App />}
  </StrictMode>,
)
