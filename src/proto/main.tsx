import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './type.css'
import './proto.css'
import { Proto } from './Proto'

const params = new URLSearchParams(location.search)
const root = document.documentElement
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
type NetInfo = { saveData?: boolean }
const nav = navigator as Navigator & { connection?: NetInfo; deviceMemory?: number }
const lowEnd = nav.connection?.saveData === true || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2)
if (reduced) root.classList.add('reduced')
if (params.has('poster')) root.classList.add('poster-mode')

// The HTML is prerendered at build/dev time (brief-v4.1 §8 item 8: readable without JS). The client
// renders over it with createRoot rather than hydrating: the client tree depends on the viewport and on
// reduced motion, which the prerender cannot know, and a hydration mismatch would log an error.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Proto />
  </StrictMode>,
)

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

/** The intro (proto.html) owns the right side for ≤ 1.5 s: the poster and the engine wait for it to end. */
function afterIntro(run: () => void) {
  if (!root.classList.contains('intro')) { run(); return }
  const mo = new MutationObserver(() => { if (!root.classList.contains('intro')) { mo.disconnect(); run() } })
  mo.observe(root, { attributes: true, attributeFilter: ['class'] })
}

afterLcp(() => afterIntro(() => {
  root.classList.add('posters')
  const wantGl = params.get('gl') !== '0' && !reduced && !lowEnd
  if (!wantGl) { root.classList.add('gl-off'); return }
  const canvas = document.getElementById('gl') as HTMLCanvasElement | null
  if (!canvas) return
  import('./engine/engine')
    .then(({ startEngine }) => {
      const freeze = params.get('poster') ? 6 : undefined
      const cell = Number(params.get('cell')) || undefined
      const density = Number(params.get('n')) || undefined
      const stop = startEngine(canvas, { freezeAt: freeze, cell, density })
      if (!stop) root.classList.add('gl-off')
      if (import.meta.hot) import.meta.hot.dispose(() => stop?.())
    })
    .catch((error: unknown) => {
      console.error('engine failed to load; posters stay', error)
      root.classList.add('gl-off')
    })
}))
