import { ticker, type Task } from './ticker'

/** v57: the in-page anchors' glide (nav.ts). Set while initSmoothScroll runs; without it (reduced motion, before the
 *  mount) scrollToY jumps, which is the reduced-motion version of the glide. */
let glide: ((y: number, done: () => void, onCancel?: () => void) => void) | null = null

/** Scrolls the page to y (document px) and calls done when it is there. A wheel, touch, key, pointer, a dragged
 *  scrollbar or the browser's own find-in-page jump — any scroll we did not cause — cancels the glide: `done`
 *  is then never called (the person took over), and `onCancel` runs instead, so a caller tracking "is a glide in
 *  flight" (nav.ts's `gliding`) always hears about it, however the person interrupted it. */
export function scrollToY(y: number, done: () => void = () => undefined, onCancel?: () => void) {
  if (glide) { glide(y, done, onCancel); return }
  scrollTo(0, y)
  done()
}

/** Wheel/trackpad scrolling with inertia (own lerp, no dependency) and a speed limit inside the pinned
 *  stages, so a fast flick cannot cross a scene before it can be read (owner 09/11). Touch, keyboard,
 *  anchors, find-in-page and the scrollbar stay native: any scroll we did not cause re-syncs the target.
 *  Not started with reduced motion. */
export function initSmoothScroll() {
  const PINNED = Array.from(document.querySelectorAll<HTMLElement>('[data-scene="night"], [data-scene="office"], [data-scene="you"]'))
  let target = scrollY
  let cur = scrollY
  let mine = -1 // the last y we set ourselves
  let running = false
  // v57 the anchors' glide: a timed tween (not the wheel's lerp, which the pinned stages cap at 1.2 screens/s: from the
  // footer to the top that was ~20 s). Far targets cut to 1.2 screens before the target and glide the rest, so the
  // scrubbed scenes in between are not flashed through.
  let tween: { from: number; to: number; t0: number; dur: number; cut: boolean; done: () => void; onCancel?: () => void } | null = null
  const max = () => document.documentElement.scrollHeight - innerHeight
  // senior-review: a cancelled glide tells its caller (nav.ts's `gliding`), instead of nav.ts mirroring the
  // handful of events that land here — which never covered a dragged scrollbar or the browser's find-in-page
  // jump (neither fires wheel/keydown/pointerdown/touchstart; both do move scrollY, straight into onScroll below).
  const cancelTween = () => { const onCancel = tween?.onCancel; tween = null; onCancel?.() }

  const onWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.defaultPrevented || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
    const t = e.target as Element | null
    if (t?.closest('textarea, select, [data-native-scroll]')) return
    e.preventDefault()
    cancelTween()
    if (!running) { target = cur = scrollY }
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1
    target = Math.min(max(), Math.max(0, target + e.deltaY * unit))
    running = true
    ticker.wake()
  }
  const stop = () => { running = false; cancelTween(); target = cur = scrollY }
  const onScroll = () => { if (Math.abs(scrollY - mine) > 2) stop() }

  glide = (to, done, onCancel) => {
    const vh = innerHeight
    to = Math.round(Math.min(max(), Math.max(0, to)))
    running = false
    let from = scrollY
    const cut = Math.abs(to - from) > 2 * vh
    if (cut) { from = Math.round(to - Math.sign(to - from) * 1.2 * vh); mine = from; scrollTo(0, from) }
    const dist = Math.abs(to - from)
    if (dist < 1) { tween = null; done(); return }
    tween = { from, to, t0: -1, dur: Math.min(760, Math.max(420, 300 + (dist / vh) * 260)), cut, done, onCancel }
    ticker.wake()
  }

  const task: Task = (now, dt) => {
    if (tween) {
      if (tween.t0 < 0) tween.t0 = now
      const t = Math.min(1, (now - tween.t0) / tween.dur)
      // after a cut the motion is already under way: ease-out only; a short glide eases in and out
      const e = tween.cut ? 1 - Math.pow(1 - t, 3) : t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      cur = tween.from + (tween.to - tween.from) * e
      mine = Math.round(cur)
      scrollTo(0, cur)
      if (t >= 1) { const done = tween.done; tween = null; target = cur = scrollY; done() }
      return tween !== null
    }
    if (!running) return false
    const vh = innerHeight
    const pinned = PINNED.some((el) => { const r = el.getBoundingClientRect(); return r.top <= 1 && r.bottom >= vh - 1 })
    // px per 60-Hz frame: ~1.2 screens/s inside a pinned stage, ~5 screens/s elsewhere
    const cap = (pinned ? vh * 0.02 : vh * 0.085) * (dt / 16.7)
    // v4.2 step 0: inside a stage the wheel is faster than the cap, so without a bound the target ran
    // screens ahead and the backlog was then paid at 5 screens/s right after the pin (a stage "skipped"
    // after the hand stopped). The lead is capped at ~half a screen: extra flick is dropped, not queued.
    if (pinned) target = Math.max(cur - vh * 0.5, Math.min(cur + vh * 0.5, target))
    let step = (target - cur) * (1 - Math.pow(1 - 0.12, dt / 16.7))
    step = Math.max(-cap, Math.min(cap, step))
    cur += step
    if (Math.abs(target - cur) < 0.5) { cur = target; running = false }
    mine = Math.round(cur)
    scrollTo(0, cur)
    return running
  }

  addEventListener('wheel', onWheel, { passive: false })
  addEventListener('scroll', onScroll, { passive: true })
  for (const ev of ['keydown', 'pointerdown', 'touchstart', 'hashchange'] as const) addEventListener(ev, stop, { passive: true })
  ticker.add(task)
  return () => {
    glide = null
    removeEventListener('wheel', onWheel)
    removeEventListener('scroll', onScroll)
    for (const ev of ['keydown', 'pointerdown', 'touchstart', 'hashchange'] as const) removeEventListener(ev, stop)
    ticker.remove(task)
  }
}
