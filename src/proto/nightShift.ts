import { night } from './content'
import { ticker, type Task } from './ticker'

/** brief-v4.2 §5.2 "the shift": the scroll only moves the time. The moon is the one clock (18:00 → 08:00 on
 *  an arc), each label is done by a desk (its line under the figure changes, the figure types, a dot leaves
 *  the monitor and rises), and at 07:58 the phone at home lights. Same progress → crest mapping as the
 *  engine, so the K3 words, the grid crest and the moon agree. DOM only: transforms, opacity, data-attrs. */
export const hourToT = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return (((h < 18 ? h + 24 : h) - 18) * 60 + m) / (14 * 60)
}
const fmt = (t: number) => {
  const mins = Math.round(t * 14 * 60) + 18 * 60
  const hh = Math.floor(mins / 60) % 24, mm = mins % 60
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}
const EV = night.labels.map(([time], i) => ({ t: hourToT(time), time, desk: night.tasks[i][0], task: night.tasks[i][1] }))
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

/** The text under each desk at time t: its latest task, or a dash before its first. */
export function deskLines(t: number) {
  const lines = night.desks.map(() => '—')
  for (const e of EV) if (e.desk >= 0 && e.t <= t) lines[e.desk] = `${e.time} · ${e.task}`
  return lines
}
export const POSTER_T = hourToT(night.posterAt)
export const PHONE_T = EV[EV.length - 1].t

export function initNightShift(reduced: boolean) {
  const sec = document.querySelector<HTMLElement>('[data-scene="night"]')
  const shift = document.querySelector<HTMLElement>('[data-shift]')
  if (!sec || !shift) return undefined
  const moon = shift.querySelector<HTMLElement>('[data-moon]')
  const moonT = shift.querySelector<HTMLElement>('[data-moon-t]')
  const path = shift.querySelector<HTMLElement>('[data-moon-path]')
  const home = shift.querySelector<HTMLElement>('[data-home]')
  const desks = Array.from(shift.querySelectorAll<HTMLElement>('[data-desk]'))
  const tasks = desks.map((d) => d.querySelector<HTMLElement>('[data-task]'))
  const workUntil = desks.map(() => 0)
  let lastT = -1
  let lastLines: string[] = []
  const melt = desks.map(() => -1)

  const place = (t: number) => {
    if (!moon || !path) return
    const W = path.clientWidth, H = path.clientHeight
    const exit = clamp01((t - 0.9) / 0.1)
    const u = Math.min(t, 0.9) / 0.9
    const x = u * W + exit * 80
    const y = H * (1 - Math.sin(Math.PI * u))
    moon.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
    moon.style.opacity = String(1 - exit)
    // gone moon, no dark box: its box would cut a hole in the dawn horizon (T3) where nothing is drawn
    if (exit >= 1) { if (moon.hasAttribute('data-dark')) moon.removeAttribute('data-dark') } else if (moon.dataset.dark !== '10') moon.dataset.dark = '10'
    if (moonT) moonT.textContent = fmt(Math.min(t, 1))
  }
  const write = (t: number) => {
    const lines = deskLines(t)
    lines.forEach((l, i) => { if (l !== lastLines[i] && tasks[i]) { tasks[i]!.textContent = l; tasks[i]!.dataset.fresh = l === '—' ? 'false' : 'true' } })
    lastLines = lines
    if (home) home.dataset.lit = String(t >= PHONE_T)
  }

  const poster = () => { shift.dataset.on = 'true'; place(POSTER_T); write(POSTER_T) }
  if (reduced) { poster(); return undefined }

  const hz = document.querySelector<HTMLElement>('[data-horizon="diagnostic"]')
  const root = document.documentElement
  let hzD = 0
  let posterDone = false
  const task: Task = (now) => {
    // without the engine the night is not pinned (static height): it is the poster at 02:14, like reduced motion
    if (root.classList.contains('gl-off')) { if (!posterDone) { posterDone = true; poster() } return false }
    const r = sec.getBoundingClientRect()
    const vh = innerHeight
    // T2 "sunset" (§5.3): the form's horizon (drawn by the engine from this element's box) goes down slower
    // than the content (≈ 0.64) and lands on the night's horizon (0.3 vh) as the stage pins; then it hands
    // over to the grid's own horizon (moved off-screen, so the engine stops drawing it).
    if (hz) {
      const hr = hz.getBoundingClientRect()
      const natural = (hr.top + hr.bottom) / 2 - hzD // where the line would be without the parallax
      const d = !root.classList.contains('gl-on') || r.top >= vh ? 0 : r.top >= 0 ? (vh * 0.3 - natural) * (1 - r.top / vh) : -3 * vh
      if (d !== hzD) { hzD = d; hz.style.transform = d ? `translate3d(0, ${d.toFixed(1)}px, 0)` : '' }
    }
    // T3 "the dawn" (§5.3): as the office comes up (its top = this section's bottom), each figure comes apart while
    // the engine flies its dots to its desk in the model (engine.ts FLY_*: same seam, same order and timing)
    const seam = Math.min(1, Math.max(0, (vh - r.bottom) / (vh * 1.22)))
    desks.forEach((d, i) => {
      const m = root.classList.contains('gl-on') ? Math.round(clamp01((seam - 0.04 - i * 0.05) / 0.14) * 4) / 4 : 0
      if (m !== melt[i]) { melt[i] = m; d.style.setProperty('--melt', String(m)) }
    })
    if (r.bottom < -vh * 0.2 || r.top > vh * 1.2) return false
    const on = r.top < vh * 0.2
    if (shift.dataset.on !== String(on)) shift.dataset.on = String(on)
    const prog = clamp01(-r.top / Math.max(1, r.height - vh))
    const t = clamp01(-0.08 + (prog / 0.86) * 1.12)
    let keep = false
    if (t !== lastT) {
      // a desk does its task when the time passes it going forward (not when scrolling back)
      if (lastT >= 0 && t > lastT) for (const e of EV) if (e.desk >= 0 && e.t > lastT && e.t <= t) workUntil[e.desk] = now + 600
      place(t); write(t); lastT = t
    }
    desks.forEach((d, i) => {
      const w = now < workUntil[i]
      if (d.dataset.work !== String(w)) d.dataset.work = String(w)
      if (w) keep = true
    })
    return keep
  }
  ticker.add(task)
  addEventListener('resize', ticker.wake)
  return () => { ticker.remove(task); removeEventListener('resize', ticker.wake) }
}
