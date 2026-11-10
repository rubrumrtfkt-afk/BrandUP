import { night } from './content'
import { ticker, type Task } from './ticker'
import { transit, type Pt } from './transit'

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

/** brief-v4.4 §4.2 the shift board of each desk at time t: its tasks so far, newest first (≤ 2: the one it just did and
 *  the one before), or none before its first. */
export type BoardLine = { time: string; task: string }
export function deskBoards(t: number): BoardLine[][] {
  const boards: BoardLine[][] = night.desks.map(() => [])
  for (const e of EV) if (e.desk >= 0 && e.t <= t) boards[e.desk] = [{ time: e.time, task: e.task }, ...boards[e.desk]].slice(0, 2)
  return boards
}
/** the night's count at time t (§4.3): the tasks done at a desk (the 07:58 request is not one) */
export const doneAt = (t: number) => EV.filter((e) => e.desk >= 0 && e.t <= t).length
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
  const stacks = desks.map((d) => d.querySelector<HTMLElement>('[data-stack]'))
  const workUntil = desks.map(() => 0)
  let lastT = -1
  let lastKeys: string[] = []
  const melt = desks.map(() => -1)
  const root = document.documentElement
  const params = new URLSearchParams(location.search)
  const typeOn = params.get('type') !== '0' // §4.2 "em avaliação": the new task types itself (18 ms a letter)
  const typing: { el: HTMLElement; text: string; at: number }[] = []
  const countEl = home?.querySelector<HTMLElement>('[data-count]') ?? null
  const handset = home?.querySelector<SVGElement>('.handset') ?? null
  const auraHost = home?.querySelector<HTMLElement>('.sleeper') ?? null
  let shown = 0 // the count on the bed: packets that have arrived
  let curT = 0

  // ---- the board (§4.2): a station board that rolls one line; only transforms and opacity animate
  const lineEl = (l: BoardLine, prev: boolean) => {
    const el = document.createElement('span')
    el.className = prev ? 'dline prev' : 'dline'
    const h = document.createElement('span'); h.className = 'dh'; h.textContent = l.time
    const k = document.createElement('span'); k.className = 'dtk'; k.textContent = l.task
    el.append(h, ' ', k)
    return el
  }
  const setBoard = (i: number, b: BoardLine[]) => {
    const st = stacks[i]
    if (!st) return
    st.style.transition = 'none'; st.style.transform = ''
    st.replaceChildren(...(b.length ? b.map((l, k) => lineEl(l, k > 0)) : [Object.assign(document.createElement('span'), { className: 'dline dnone' })]))
  }
  const roll = (i: number, l: BoardLine, now: number) => {
    const st = stacks[i]
    if (!st) return
    st.querySelector('.dnone')?.remove()
    const el = lineEl(l, false)
    const old = Array.from(st.children) as HTMLElement[]
    st.prepend(el)
    const gap = parseFloat(getComputedStyle(st).rowGap) || 0
    st.style.transition = 'none'
    st.style.transform = `translate3d(0, ${-(el.offsetHeight + gap)}px, 0)`
    void st.offsetHeight // the start of the roll is committed before it moves
    st.style.transition = ''
    st.style.transform = ''
    old.forEach((o, k) => { o.classList.add('prev'); if (k >= 1) window.setTimeout(() => o.remove(), 360) })
    if (typeOn) { const k = el.querySelector<HTMLElement>('.dtk'); if (k) { k.textContent = ''; typing.push({ el: k, text: l.task, at: now }) } }
  }
  // ---- the count (§4.3): a 240-ms digit roll in tabular figures
  const setCount = (n: number, rollIt: boolean) => {
    if (!countEl) return
    const cur = countEl.lastElementChild as HTMLElement | null
    if (cur && cur.textContent === String(n)) return
    const d = document.createElement('span')
    d.className = rollIt ? 'cd in' : 'cd'
    d.textContent = String(n)
    if (cur && rollIt) { cur.classList.add('out'); window.setTimeout(() => cur.remove(), 260) } else cur?.remove()
    countEl.append(d)
  }
  const pulse = () => { if (!auraHost) return; auraHost.removeAttribute('data-pulse'); void auraHost.offsetWidth; auraHost.dataset.pulse = 'on' }
  const arrive = () => { shown = Math.min(shown + 1, doneAt(curT)); setCount(shown, true); pulse() }
  const centre = (el: Element | null): Pt | null => { if (!el) return null; const r = el.getBoundingClientRect(); return r.width || r.height ? [(r.left + r.right) / 2, (r.top + r.bottom) / 2] : null }
  const launch = (desk: number) => {
    // §4.3: no packet without the engine (the arrival happens with the task); the excess of a fast scroll lands at once
    if (!root.classList.contains('gl-on')) { arrive(); return }
    const portrait = innerWidth < 768
    const tela = parseFloat(getComputedStyle(root).getPropertyValue('--tela')) || innerHeight // frozen on touch (Instagram)
    const vh = /px$/.test(getComputedStyle(root).getPropertyValue('--tela').trim()) ? tela : innerHeight
    transit.launch({
      from: () => centre(desks[desk]?.querySelector('.mon') ?? null),
      to: () => centre(handset),
      ctrl: (a, c) => (portrait ? [a[0] + (c[0] - a[0]) * 0.25, (a[1] + c[1]) / 2 + 0.06 * vh] : [(a[0] + c[0]) / 2, Math.min(a[1], c[1]) - 0.14 * vh]),
      dur: portrait ? 800 : 1000, r: portrait ? 5 : 7, done: arrive,
    })
  }

  const place = (t: number) => {
    if (!moon || !path) return
    const W = path.clientWidth, H = path.clientHeight
    // t = 1 gives (1 - 0.9) / 0.1 = 0.9999999999999998 in floats: exit never reached 1, the moon stayed at opacity
    // 2e-16 and kept its dark box (an empty box beside "You, asleep", owner v4.8). The end is the end.
    const exit = t >= 1 ? 1 : clamp01((t - 0.9) / 0.1)
    const u = Math.min(t, 0.9) / 0.9
    // brief-v4.3 §6.5: the moon leaves DOWN (it used to slide 80 px right, past the margin at 390)
    const x = u * W
    const y = H * (1 - Math.sin(Math.PI * u)) + exit * 40
    moon.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
    moon.style.opacity = String(1 - exit)
    // gone moon, no dark box: its box would cut a hole in the dawn horizon (T3) where nothing is drawn
    if (exit >= 1) { if (moon.hasAttribute('data-dark')) moon.removeAttribute('data-dark') } else if (moon.dataset.dark !== '10') moon.dataset.dark = '10'
    if (moonT) moonT.textContent = fmt(Math.min(t, 1))
  }
  const write = (t: number, now: number, forward: boolean) => {
    curT = t
    const boards = deskBoards(t)
    boards.forEach((b, i) => {
      const key = b[0]?.time ?? ''
      if (key === lastKeys[i]) return
      // a board rolls only when the time passes its new task going forward; otherwise it is set (recomputed by position)
      if (forward && b[0] && lastKeys[i] !== undefined) roll(i, b[0], now)
      else setBoard(i, b)
      lastKeys[i] = key
    })
    if (home) home.dataset.lit = String(t >= PHONE_T)
  }
  const syncCount = (t: number) => { transit.clear(); shown = doneAt(t); setCount(shown, false) }

  const poster = () => { shift.dataset.on = 'true'; place(POSTER_T); write(POSTER_T, 0, false); syncCount(POSTER_T) }
  if (reduced) { poster(); return undefined }

  const hz = document.querySelector<HTMLElement>('[data-horizon="diagnostic"]')
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
      // v55d (owner: the line floated up into the middle of the section): the parallax only ever carries it DOWN, toward
      // the night; it used to rise up to ~80 px toward the form first (d < 0 while the night's top was at .4–.95 vh)
      const d = !root.classList.contains('gl-on') || r.top >= vh ? 0 : r.top >= 0 ? Math.max(0, (vh * 0.3 - natural) * (1 - r.top / vh)) : -3 * vh
      if (d !== hzD) { hzD = d; hz.style.transform = d ? `translate3d(0, ${d.toFixed(1)}px, 0)` : '' }
    }
    // T3 "the dawn" (§5.3): as the office comes up (its top = this section's bottom), each figure comes apart while
    // the engine flies its dots to its desk in the model (engine.ts FLY_*: same seam, same order and timing)
    const seam = Math.min(1, Math.max(0, (vh - r.bottom) / (vh * 1.22)))
    desks.forEach((d, i) => {
      const m = root.classList.contains('gl-on') ? Math.round(clamp01((seam - 0.04 - i * 0.05) / 0.14) * 4) / 4 : 0
      if (m !== melt[i]) { melt[i] = m; d.style.setProperty('--melt', String(m)) }
    })
    // off screen: nothing may stay in the air (the engine would never sleep); the count is the position's
    if (r.bottom < -vh * 0.2 || r.top > vh * 1.2) { if (transit.busy()) syncCount(curT); return false }
    const on = r.top < vh * 0.2
    if (shift.dataset.on !== String(on)) shift.dataset.on = String(on)
    const prog = clamp01(-r.top / Math.max(1, r.height - vh))
    const t = clamp01(-0.08 + (prog / 0.86) * 1.12)
    let keep = false
    if (t !== lastT) {
      // a desk does its task when the time passes it going forward (not when scrolling back): the monitor and the pool
      // confirm it (600 ms) and a packet leaves for the bed (§4.3); going back, the board and the count are recomputed
      const forward = lastT >= 0 && t > lastT
      curT = t // before the launches: a packet delivered at once (full queue) counts against the new time
      if (forward) for (const e of EV) if (e.desk >= 0 && e.t > lastT && e.t <= t) { workUntil[e.desk] = now + 600; launch(e.desk) }
      place(t); write(t, now, forward)
      if (!forward) syncCount(t)
      lastT = t
    }
    if (transit.tick(now)) keep = true
    for (let k = typing.length - 1; k >= 0; k--) {
      const ty = typing[k], n = Math.min(ty.text.length, Math.floor((now - ty.at) / 18))
      if (ty.el.textContent !== ty.text.slice(0, n)) ty.el.textContent = ty.text.slice(0, n)
      if (n >= ty.text.length) typing.splice(k, 1); else keep = true
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
