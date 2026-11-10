import { bus } from './bus'
import { ticker, type Task } from './ticker'
import { transit, type Pt } from './transit'

/** brief-v4.6 "a voz chega pelo fio": each owner is a node of the network and the voice arrives by the wire. The green
 *  packet (the engine's uPkt, one path for the page) comes down from the FAQ's orla to the 1st node (scrub), runs from
 *  node to node at 1440 (transit, timed) and rides the rail's gesture at 390 (scrub); when it lands the node lights,
 *  the quote lights line by line (CSS @property --ln) and the signature writes itself (?sig=0 turns it off).
 *  The current one comes from cached document positions (0 layout reads per frame), clamped at both ends: this replaces
 *  the thin-band IO that left "04 / 04" on the 1st quote when scrolling back up. Reduced motion: all lit, at rest. */
export function initTesti(sec: HTMLElement, opts: { reduced: boolean; sig: boolean }) {
  const railEl = sec.querySelector<HTMLElement>('.testi-rail')
  if (!railEl) return () => undefined
  const rail: HTMLElement = railEl
  const countEl = sec.querySelector<HTMLElement>('[data-tcount]')
  const bar = sec.querySelector<HTMLElement>('.testi-bar')
  const figs = Array.from(rail.querySelectorAll<HTMLElement>('[data-tq]'))
  const inis = figs.map((f) => f.querySelector<HTMLElement>('.tq-ini'))
  const n = figs.length
  const root = document.documentElement
  const { reduced } = opts
  const narrowQ = matchMedia('(max-width: 767px)')
  const timers = new Set<number>()
  const later = (fn: () => void, ms: number) => { const id = window.setTimeout(() => { timers.delete(id); fn() }, ms); timers.add(id) }
  const glOn = () => root.classList.contains('gl-on') && !reduced

  rail.dataset.cursor = reduced ? 'rest' : 'on'
  sec.dataset.testi = 'on'
  rail.dataset.sig = opts.sig && !reduced ? 'on' : 'off'
  if (!reduced) figs.forEach((f) => { f.dataset.state = 'other' }) // nothing is lit before the voice arrives

  // ---- the cache (ResizeObserver + resize + fonts): document px
  let narrow = narrowQ.matches
  let center: number[] = [] // the quote's centre (y), 1440
  let node: Pt[] = [] // the node's centre; x is relative to the rail's content at 390 (minus scrollLeft when used)
  let secTop = 0, secBottom = 0
  let snaps: number[] = [0], railMax = 1, sl = 0
  let barX = 0, barW = 0, barY = 0
  const measure = () => {
    narrow = narrowQ.matches
    const sy = scrollY
    sl = rail.scrollLeft
    const sb = sec.getBoundingClientRect()
    secTop = sb.top + sy; secBottom = sb.bottom + sy
    center = figs.map((f) => { const b = f.getBoundingClientRect(); return (b.top + b.bottom) / 2 + sy })
    node = inis.map((el) => { const b = el?.getBoundingClientRect(); return b ? [(b.left + b.right) / 2 + (narrow ? sl : 0), (b.top + b.bottom) / 2 + sy] as Pt : [0, 0] as Pt })
    figs.forEach((f) => {
      const p = f.querySelector('p')
      if (!p) return
      const lh = parseFloat(getComputedStyle(p).lineHeight) || 28
      f.style.setProperty('--n', String(Math.max(1, Math.min(14, Math.round(p.offsetHeight / lh)))))
    })
    if (!narrow && node.length) {
      const rt = rail.getBoundingClientRect().top + sy
      rail.style.setProperty('--wt', `${(node[0][1] - rt).toFixed(1)}px`)
      rail.style.setProperty('--wh', `${(node[n - 1][1] - node[0][1]).toFixed(1)}px`)
    }
    railMax = Math.max(1, rail.scrollWidth - rail.clientWidth)
    const step = figs.length > 1 ? figs[1].offsetLeft - figs[0].offsetLeft : 1
    snaps = figs.map((_, k) => Math.min(railMax, k * step))
    if (bar) { const b = bar.getBoundingClientRect(); barX = b.left; barW = b.width; barY = (b.top + b.bottom) / 2 + sy }
    // the entry seam (§4.1): from the section's top at 85 % of the screen to the 1st node at 45 %
    bus.testi.a = secTop - innerHeight * 0.85
    bus.testi.b = (node[0]?.[1] ?? secTop) - innerHeight * 0.45
    paintWire()
    sync(true)
  }
  const nodeAt = (k: number): Pt => [node[k][0] - (narrow ? sl : 0), node[k][1] - scrollY]

  // ---- the state
  let ignited = reduced
  let cur = -1 // the quote at full ink (-1 = none yet, or a packet in the air)
  let flyingTo = -1 // the destination of the packet in the air
  let entryArmed = true // the entry seam draws its packet
  let readTo = reduced ? n - 1 : -1 // the deepest node lit (the light never goes out while reading down)
  let flight = 0 // token of the packet in the air (a newer move cancels the arrival of an older one)
  const setAttr = (el: HTMLElement, k: string, v: string) => { if (el.dataset[k] !== v) el.dataset[k] = v }

  const setCount = (i: number, roll: boolean) => {
    if (!countEl) return
    const txt = String(i + 1).padStart(2, '0')
    const old = countEl.lastElementChild as HTMLElement | null
    if (old && old.textContent === txt) return
    const d = document.createElement('span')
    d.className = roll && !reduced ? 'cd in' : 'cd'
    d.textContent = txt
    if (old && roll && !reduced) { old.classList.add('out'); later(() => old.remove(), 260) } else old?.remove()
    countEl.append(d)
  }
  function paintWire() {
    if (narrow || !node.length) return
    const k = reduced ? 0 : Math.max(0, readTo) // reduced motion: the whole wire dotted, at rest (brief §6.2)
    rail.style.setProperty('--wl', `${(node[k][1] - node[0][1]).toFixed(1)}px`)
  }
  const paintNodes = () => figs.forEach((f, k) => {
    if (f.dataset.node === 'land') return
    setAttr(f, 'node', k === cur || reduced ? 'lit' : k <= readTo ? 'read' : 'unread')
  })
  /** the packet landed on k (or it arrived without a flight): the node, the lines, the signature, the count */
  const arrive = (k: number) => {
    cur = k
    flyingTo = -1
    readTo = Math.max(readTo, k)
    figs.forEach((f, j) => setAttr(f, 'state', j === k ? 'current' : 'other'))
    setAttr(figs[k], 'signed', 'true')
    if (!reduced) { figs[k].dataset.node = 'land'; later(() => { if (figs[k].dataset.node === 'land') { figs[k].dataset.node = 'x'; paintNodes() } }, 120) }
    paintNodes(); paintWire(); setCount(k, true)
  }
  const ignite = () => {
    ignited = true
    setAttr(rail, 'drawn', 'true')
  }
  /** the reading position moved to k (1440: the scroll; 390: the snap) */
  const go = (k: number, fly: boolean) => {
    if (k === cur || k === flyingTo) return
    const from = cur >= 0 ? cur : flyingTo
    const id = ++flight
    // the quote that leaves dims at once (bottom → top, 30 ms per line in the CSS); the ones skipped light without flight
    if (cur >= 0) setAttr(figs[cur], 'state', 'other')
    if (fly && from >= 0 && k > from && glOn()) {
      readTo = Math.max(readTo, k - 1)
      for (let j = from + 1; j < k; j++) setAttr(figs[j], 'signed', 'true')
      paintNodes(); paintWire()
      cur = -1
      flyingTo = k
      const a = from, b = k
      transit.launch({
        from: () => nodeAt(a), to: () => nodeAt(b), ctrl: (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], dur: 560, r: 7, scope: 'testi',
        done: () => { if (id === flight) arrive(b) },
      })
      ticker.wake()
    } else arrive(k)
  }

  // ---- the rail (390): the gesture is the time
  const onRail = () => {
    sl = rail.scrollLeft
    if (!narrow) return
    ticker.wake()
  }
  rail.addEventListener('scroll', onRail, { passive: true })

  const targetWide = () => {
    const mid = scrollY + innerHeight * 0.45
    let best = 0, bd = Infinity
    center.forEach((c, k) => { const d = Math.abs(c - mid); if (d < bd) { bd = d; best = k } })
    return best
  }
  const sync = (jump: boolean) => {
    const sy = scrollY, vh = innerHeight
    const near = secBottom - sy > -vh && secTop - sy < 2 * vh
    // the 1st node (the entry scrub's arrival at 1440 and 390)
    // v53 (measured: parked on the 1st quote after coming back up, the packet hung over the lit text at 390): once the
    // voice has arrived the entry packet stays away (v4.4 §3.3, the way back does not return the packet) until the
    // scroll goes back above the seam's start; then the seam scrubs again
    if (sy < bus.testi.a) entryArmed = true
    if (ignited && sy >= bus.testi.b) entryArmed = false
    bus.testi.n1 = reduced || !entryArmed || !node.length ? null : [node[0][0] - (narrow ? sl : 0), node[0][1]]
    if (!ignited) {
      if (reduced || (bus.testi.b > bus.testi.a && sy >= bus.testi.b)) { ignite(); go(narrow ? 0 : targetWide(), false) }
      else { paintNodes(); return }
    }
    if (narrow) {
      // the read part of the bar follows the scroll; between two snaps the packet's head rides its tip
      const p = Math.min(1, Math.max(0, sl / railMax))
      bar?.style.setProperty('--bp', p.toFixed(4))
      let k = 0
      while (k < n - 1 && sl > snaps[k + 1]) k++
      const span = (snaps[k + 1] ?? snaps[k]) - snaps[k]
      const f = span > 0 ? (sl - snaps[k]) / span : 0
      if (f > 0.02 && f < 0.98 && glOn() && !reduced) {
        const tip = (s: number): Pt => [barX + barW * Math.min(1, s / railMax), barY]
        // the inverse of the packet's ease (writePacket rides e = t²(3 − 2t)): the head sits exactly on the tip
        bus.testi.rail = { a: tip(snaps[k]), b: tip(snaps[k + 1]), t: 0.5 - Math.sin(Math.asin(1 - 2 * f) / 3) }
      } else bus.testi.rail = null
      // on a snap: the arrival (the gesture carried the light: no flight)
      const settled = snaps.findIndex((s) => Math.abs(sl - s) <= 2)
      if (settled >= 0 && settled !== cur) go(settled, false)
      return
    }
    bus.testi.rail = null
    go(targetWide(), near && !jump)
  }
  const task: Task = (now) => {
    const keep = transit.tick(now) // the night's task ticks the queue only near the night
    sync(false)
    return keep
  }

  if (reduced) {
    figs.forEach((f) => { f.dataset.signed = 'true' })
    rail.dataset.drawn = 'true'
  }
  measure()
  const ro = new ResizeObserver(measure)
  ro.observe(sec); ro.observe(document.body)
  document.fonts?.ready.then(measure).catch((error: unknown) => console.warn('fonts.ready failed', error))
  ticker.add(task)
  return () => {
    ticker.remove(task); ro.disconnect(); rail.removeEventListener('scroll', onRail)
    timers.forEach(clearTimeout); timers.clear()
    bus.testi.n1 = null; bus.testi.rail = null
    delete rail.dataset.cursor; delete sec.dataset.testi
  }
}
