import { Component, StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
// v55: type.css and proto.css are linked from index.html (render-blocking in dev too: no unstyled first frame)
import { Proto } from './Proto'
import { captureAttribution } from '../lib/attribution'

/** senior-review (juri-v58): if the client tree throws (a bad deploy, a corrupted chunk), this restores the
 *  prerendered HTML that was already sitting in #root before render() replaced it — a complete, readable page
 *  without JS (proven by the "sem CSS"/no-JS probes already), not a blank screen. `createRoot` (not
 *  `hydrateRoot`) means that markup is simply gone the instant render() commits; the only way back is to put it
 *  back ourselves, after React has cleared the container for the (empty) fallback this renders. If the snapshot
 *  is somehow empty, a plain message with a way to the form and a reload stands in instead. */
class LandingErrorBoundary extends Component<{ snapshot: string; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: unknown) {
    console.error('the landing failed to render; restoring the prerendered page', error)
    const el = document.getElementById('root')
    if (el && this.props.snapshot) el.innerHTML = this.props.snapshot
  }
  render() {
    if (!this.state.failed) return this.props.children
    if (this.props.snapshot) return null // componentDidCatch (above) restores it right after this empties #root
    return (
      <main style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24, textAlign: 'center', background: '#08070B', color: '#F4F1F8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <p style={{ margin: 0 }}>Something went wrong loading this page.</p>
        <p style={{ margin: 0, display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="#diagnostic" style={{ color: '#58F6B1', fontWeight: 700 }}>Go to the form</a>
          <button type="button" onClick={() => location.reload()} style={{ minHeight: 44, padding: '0 20px', borderRadius: 8, border: 'none', background: '#58F6B1', color: '#08070B', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Reload
          </button>
        </p>
      </main>
    )
  }
}

// senior-review I3: index.html's own first script sets this just before `location.replace('/admin/…')` (an
// admin/token link that landed here by mistake). The module script can still be mid-fetch when that redirect is
// issued, so this guards against the brief race: no attribution capture (it would overwrite the real landing
// record with a token-laden one) and no engine boot, while the navigation away takes effect.
const buLeaving = (window as Window & { __buLeaving?: boolean }).__buLeaving === true

const params = new URLSearchParams(location.search)
const root = document.documentElement
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
type NetInfo = { saveData?: boolean }
const nav = navigator as Navigator & { connection?: NetInfo; deviceMemory?: number }
const lowEnd = nav.connection?.saveData === true || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2)
if (reduced) root.classList.add('reduced')
if (params.has('poster')) root.classList.add('poster-mode')

if (!buLeaving) {
  // admin-crm-inventario §9.2 item 1: the landing records where the visit came from (UTMs, link_id of the tracked
  // links and QRs) before anything else; the lead reads it back on submit. This page is never the admin route.
  captureAttribution()

  // The HTML is prerendered at build/dev time (brief-v4.1 §8 item 8: readable without JS). The client
  // renders over it with createRoot rather than hydrating: the client tree depends on the viewport and on
  // reduced motion, which the prerender cannot know, and a hydration mismatch would log an error.
  const rootEl = document.getElementById('root')!
  const snapshot = rootEl.innerHTML

  createRoot(rootEl).render(
    <StrictMode>
      <LandingErrorBoundary snapshot={snapshot}>
        <Proto />
      </LandingErrorBoundary>
    </StrictMode>,
  )
}

/** After the LCP (the H1, in text): the posters, then the engine. Nothing heavy competes with the
 *  first paint. With reduced motion, Save-Data, ≤ 2 GB or ?gl=0 the engine is never downloaded. */
function afterLcp(run: () => void) {
  let done = false
  const go = () => { if (!done) { done = true; run() } }
  try {
    const po = new PerformanceObserver(() => { po.disconnect(); idle(go) })
    po.observe({ type: 'largest-contentful-paint', buffered: true })
  } catch (error) {
    // Safari < 26 has no LCP entry type: fall back to the timer below.
    console.debug('LCP observer unavailable', error)
  }
  setTimeout(go, 1200)
}
function idle(fn: () => void) {
  const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback
  if (ric) ric(fn, { timeout: 600 })
  else setTimeout(fn, 60)
}

/** brief-v4.5 §4.4: the engine DOWNLOADS during the intro (afterLcp is still the gate, so it never competes with the
 *  LCP); the intro only gates the REVEAL. The canvas draws hidden (visibility, not opacity: no compositing) until the
 *  engine has drawn 2 frames (gl-on) AND the intro has run its hand-off time; then one class flips both in the same
 *  frame (no fade: the frames are the same picture). */
function revealWhenReady() {
  // v52: the intro hands over at .82 s × k (index.html adds .intro-handoff, also on a skip and at its end): from then the
  // canvas may show, in the first frame where the engine has drawn 2 frames (gl-on). Without an intro: at once.
  const ready = () => !root.classList.contains('intro') || root.classList.contains('intro-handoff')
  const flip = () => { if (ready() && root.classList.contains('gl-on')) { mo.disconnect(); requestAnimationFrame(() => root.classList.add('gl-show')) } }
  const mo = new MutationObserver(flip)
  mo.observe(root, { attributes: true, attributeFilter: ['class'] })
  flip()
}

if (!buLeaving) {
  afterLcp(() => {
    root.classList.add('posters')
    const wantGl = params.get('gl') !== '0' && !reduced && !lowEnd
    if (!wantGl) { root.classList.add('gl-off'); return }
    const canvas = document.getElementById('gl') as HTMLCanvasElement | null
    if (!canvas) return
    revealWhenReady()
    import('./engine/engine')
      .then(({ startEngine }) => {
        const freeze = params.get('poster') ? 6 : undefined
        const cell = Number(params.get('cell')) || undefined
        const density = Number(params.get('n')) || undefined
        // juri-v57 §6 item 2: startEngine() now yields between its setup steps (engine.ts), so this await
        // never holds the main thread for the whole ~0.6 s boot in one task.
        return startEngine(canvas, { freezeAt: freeze, cell, density }).then((stop) => {
          if (!stop) root.classList.add('gl-off')
          if (import.meta.hot) import.meta.hot.dispose(() => stop?.())
        })
      })
      .catch((error: unknown) => {
        console.error('engine failed to load; the SVG logo stays', error)
        root.classList.add('gl-off')
      })
  })
}
