import { ticker, type Task } from './ticker'

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
  const max = () => document.documentElement.scrollHeight - innerHeight

  const onWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.defaultPrevented || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
    const t = e.target as Element | null
    if (t?.closest('textarea, select, [data-native-scroll]')) return
    e.preventDefault()
    if (!running) { target = cur = scrollY }
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? innerHeight : 1
    target = Math.min(max(), Math.max(0, target + e.deltaY * unit))
    running = true
    ticker.wake()
  }
  const stop = () => { running = false; target = cur = scrollY }
  const onScroll = () => { if (!running || Math.abs(scrollY - mine) > 2) { if (running && Math.abs(scrollY - mine) > 2) stop(); else if (!running) target = cur = scrollY } }

  const task: Task = (_now, dt) => {
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
    removeEventListener('wheel', onWheel)
    removeEventListener('scroll', onScroll)
    for (const ev of ['keydown', 'pointerdown', 'touchstart', 'hashchange'] as const) removeEventListener(ev, stop)
    ticker.remove(task)
  }
}
