import { Component, StrictMode, Suspense, lazy, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { captureAttribution } from './lib/attribution'

// senior-review S8: a lazy chunk that fails to load (a bad deploy, an ad blocker on fbevents-adjacent paths, an
// offline reload) used to crash to a blank white screen — no React error boundary ever caught it. One boundary
// for the whole shell, with the one thing a person can do about it: try again.
class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: unknown) { console.error('the app shell failed to render', error) }
  render() {
    if (!this.state.failed) return this.props.children
    // inline styles on purpose: this must render correctly even if the page's own CSS chunk is what failed to load
    return (
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, minHeight: '100svh', padding: 24, textAlign: 'center', background: '#08070B', color: '#F4F1F8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <p style={{ margin: 0 }}>Something went wrong loading this page.</p>
        <button type="button" onClick={() => location.reload()} style={{ minHeight: 44, padding: '0 24px', borderRadius: 8, border: 'none', background: '#58F6B1', color: '#08070B', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
          Reload
        </button>
      </main>
    )
  }
}

// plano-producao §1: the light shell (app.html) of /thank-you, /privacy and /admin/. The landing is index.html →
// src/proto/main.tsx. Each page is its own chunk: the dashboard (supabase-js, AdminPage.css, LeadBoard.css) never
// loads on a public page and vice versa.
const pages = {
  admin: lazy(() => import('./AdminPage.tsx')),
  thankYou: lazy(() => import('./ThankYou.tsx')),
  privacy: lazy(() => import('./Privacy.tsx')),
}

const url = new URL(window.location.href)
// senior-review S4: /admin/index.html (the literal file GitHub Pages also serves) must resolve the same as
// /admin/ — same normalization as app.html's own inline Pixel guard above.
const path = window.location.pathname.replace(/\/index\.html$/i, '').replace(/\/+$/, '')
const isAdminRoute =
  path === '/admin' ||
  url.searchParams.get('admin') === '1' ||
  window.location.hash.toLowerCase().startsWith('#/admin')

if (
  /[?&#]type=(invite|recovery)(?:&|$)/i.test(window.location.href) &&
  (url.searchParams.has('token_hash') || window.location.hash.includes('access_token='))
) {
  sessionStorage.setItem('brandup-password-setup', '1')
}

const Page = isAdminRoute ? pages.admin : path === '/thank-you' ? pages.thankYou : path === '/privacy' ? pages.privacy : null

if (!Page) {
  // Not a route of this shell (a stale bookmark, a typo): the landing is the home.
  window.location.replace('/')
} else {
  // admin-crm-inventario §9.2 item 1 / §2: captureAttribution() never runs on the admin route (it would record the
  // dashboard's own visit); on /thank-you and /privacy it is a safe no-op (attribution.ts already refuses to
  // overwrite the landing's record on those two paths, tests/leadboard.test.mjs "Direct visits...").
  if (!isAdminRoute) captureAttribution()
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <Page />
        </Suspense>
      </ErrorBoundary>
    </StrictMode>,
  )
}
