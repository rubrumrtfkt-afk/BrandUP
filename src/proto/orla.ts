import { bus } from './bus'
import { MINT, RAMP, bayer, drawLevels, level, rng } from './grain'
import { ticker } from './ticker'
import { pageMargin } from './layout'
import type { Pt } from './transit'

/** brief-v4.4 §9 "a orla": the grain of the footer's mountain, resting around a content area (the two forms and the
 *  FAQ list) so black on black gets an edge without a box. It lives OUTSIDE the area's rectangle R (the box + 40 px,
 *  + 20 at 390): a 72-px base under R (40 at 390), dense on R's line and thinning outward, and two side bands that
 *  climb 45 % of R (25 % at 390) and thin to nothing; nothing on top (the light comes from the ground); the bottom
 *  corners densest; core only in the row touching R; mint only in the middle 30 % of the base (≤ 24 fragments, 12 at
 *  390). Painted once per size into an offscreen canvas; it lights ONCE by a Bayer threshold growing from its seeds
 *  (§8.1 ground-orla: the trigger + 640 ms in ~16 steps), then ≤ 6 fragments flicker one level at 8 fps for 5 s and
 *  it stops. Canvas 2D: the same without WebGL; without JS there is no orla. */
export type OrlaId = 'form' | 'faq' | 'final'
const registry = new Map<OrlaId, () => Pt[] | null>()
/** the 24 landing points of the orla in viewport px (the FAQ's: where the phone's fragments land, §6.2) */
export const orlaTargets = (id: OrlaId) => registry.get(id)?.() ?? null

type Geo = { w: number; h: number; pitch: number; dot: number; cols: number; rows: number; R: [number, number, number, number]; up: number; S: number; B: number }
const IGNITE_MS = 640, STEPS = 16, A_MAX = 1.2

export function initOrla(canvas: HTMLCanvasElement, area: HTMLElement, opts: { id: OrlaId; reduced: boolean; baseEl?: HTMLElement | null }) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}
  const { id, reduced } = opts
  const root = document.documentElement
  let geo: Geo | null = null
  let field = new Uint8Array(0) // 0 none, 1–4 ramp, 5–6 mint
  let order: Int32Array = new Int32Array(0) // lit cells sorted by their ignition threshold
  let thr = new Float32Array(0)
  let flick: number[] = []
  let a = reduced ? A_MAX : 0 // ignition advance
  let lit = reduced, seen = false, flickUntil = 0, timer = 0
  let seeds: Pt[] | null = null // canvas px

  function targetsLocal(g: Geo): Pt[] {
    const [x0, , x1, yB] = g.R
    const Ls = g.up * 0.6, Lb = x1 - x0, L = 2 * Ls + Lb
    return Array.from({ length: 24 }, (_, i) => {
      const d = (i / 23) * L
      if (d < Ls) return [x0 - g.S * 0.45, yB - (Ls - d)] as Pt
      if (d < Ls + Lb) return [x0 + d - Ls, yB + g.B * 0.25] as Pt
      return [x1 + g.S * 0.45, yB - (d - Ls - Lb)] as Pt
    })
  }
  registry.set(id, () => {
    if (!geo) return null
    const r = canvas.getBoundingClientRect()
    return targetsLocal(geo).map(([x, y]) => [r.left + x, r.top + y] as Pt)
  })

  function layout() {
    const aw = area.offsetWidth, ah = area.offsetHeight
    if (!aw || !ah) return
    const portrait = innerWidth < 768
    // v55d (owner, Safari 1440: the first form's orla "frames nothing": its base sat on the horizon 120 px under the form
    // and its right band ran past the screen): the first form's orla hugs the form block itself (fields, button,
    // privacy) and its side bands stay inside the page margin; the final form and the FAQ keep the v4.4 geometry
    const hug = id === 'form' && !portrait
    const padX = portrait ? 0 : hug ? 24 : 40, padY = portrait ? 20 : hug ? 32 : 40
    const left = area.getBoundingClientRect().left
    const S = portrait ? Math.max(8, Math.min(20, left)) : hug ? Math.max(16, Math.min(56, pageMargin(innerWidth) - padX - 8)) : 56
    const B = portrait ? 40 : 72
    let yB = ah + padY
    // §9.2: the form's horizon (uHz) IS the line of this base, when it sits just under the area (not the first form's
    // since v55d: its horizon is the section's ground, below the beams' room, and the orla sits on the form)
    const hz = id === 'form' ? null : opts.baseEl
    if (hz && hz.offsetParent && hz.offsetParent === area.offsetParent) {
      const hy = hz.offsetTop + hz.offsetHeight / 2 - area.offsetTop
      if (hy > ah + 8 && hy < ah + 180) yB = hy
    }
    const up = (yB + padY) * (portrait ? 0.25 : 0.45)
    const ox = -padX - S, oy = yB - up
    const w = Math.round(aw + 2 * padX + 2 * S), h = Math.round(up + B)
    Object.assign(canvas.style, { left: `${ox}px`, top: `${oy}px`, width: `${w}px`, height: `${h}px` })
    const dpr = Math.min(devicePixelRatio || 1, 2)
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    const pitch = portrait ? 3 : 4, dot = portrait ? 1.5 : 2
    const R: Geo['R'] = [S, up - yB - padY, S + aw + 2 * padX, up] // R in canvas px (x0, y0, x1, base)
    geo = { w, h, pitch, dot, cols: Math.ceil(w / pitch), rows: Math.ceil(h / pitch), R, up, S, B }
    build(geo, portrait)
    if (lit) paintAll()
  }

  function build(g: Geo, portrait: boolean) {
    const { cols, rows, pitch, R, up, S, B } = g
    const [x0, y0, x1, yB] = R
    field = new Uint8Array(cols * rows)
    const rnd = rng(id === 'faq' ? 71 : id === 'form' ? 13 : 29)
    const cx = (x0 + x1) / 2, half = (x1 - x0) / 2
    let greens = 0
    const maxGreen = portrait ? 12 : 24
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const X = i * pitch + pitch / 2, Y = j * pitch + pitch / 2
      const grain = (rnd() - 0.5) * 0.28
      const inX = X >= x0 && X <= x1
      if (inX && Y < yB && Y >= y0) continue // never inside R (nor under the text)
      const dxOut = X < x0 ? x0 - X : X > x1 ? X - x1 : 0
      const below = Y - yB, above = yB - Y
      let Is = 0, Ib = 0
      if (dxOut > 0 && dxOut <= S && above >= 0) Is = Math.pow(1 - dxOut / S, 1.2) * Math.pow(1 - above / up, 1.6)
      if (below >= 0 && below <= B && dxOut <= S) {
        const toEdge = Math.min(Math.abs(X - x0), Math.abs(X - x1))
        const corner = inX ? Math.max(0, 1 - toEdge / (half * 0.6)) : 1
        Ib = Math.pow(1 - below / B, 1.5) * (0.55 + 0.45 * corner) * (dxOut > 0 ? 1 - dxOut / S : 1)
      }
      let I = Math.max(Is, Ib)
      if (I <= 0) continue
      const dc = Math.min(Math.hypot(X - x0, Y - yB), Math.hypot(X - x1, Y - yB))
      I += Math.max(0, 1 - dc / (1.2 * Math.max(S, B))) * 0.4 // the bottom corners are the densest
      let lv = level(I + grain, bayer(i, j))
      const touching = (inX && below >= 0 && below < pitch * 1.5) || (dxOut > 0 && dxOut < pitch * 1.5 && above >= 0)
      if (lv === 4 && !touching) lv = 3 // the core only in the row touching R
      if (!lv) continue
      // the mint: only on the base, in its middle 30 %, in two levels
      if (below >= 0 && below < B * 0.4 && Math.abs(X - cx) < half * 0.3 && lv >= 2 && greens < maxGreen && rnd() < 0.22) { lv = rnd() < 0.5 ? 5 : 6; greens++ }
      field[j * cols + i] = lv
    }
    // ignition thresholds: distance to the nearest seed + the cell's Bayer value (the light grows in dither, never a fade)
    const sd = seeds ?? [[cx, yB + 2]]
    const maxD = Math.hypot(g.w, g.h) * 0.62
    thr = new Float32Array(cols * rows)
    const lits: number[] = []
    for (let k = 0; k < field.length; k++) {
      if (!field[k]) continue
      const X = (k % cols) * pitch + pitch / 2, Y = Math.floor(k / cols) * pitch + pitch / 2
      let d = Infinity
      for (const [sx, sy] of sd) d = Math.min(d, Math.hypot(X - sx, Y - sy))
      thr[k] = Math.min(1, d / maxD) + bayer(k % cols, Math.floor(k / cols)) * 0.18
      lits.push(k)
    }
    lits.sort((p, q) => thr[p] - thr[q])
    order = Int32Array.from(lits)
    flick = lits.filter((k) => field[k] === 2 || field[k] === 3).filter((_, n) => n % Math.max(1, Math.floor(lits.length / 7)) === 3).slice(0, 6)
  }

  const colourOf = (lv: number) => (lv >= 5 ? MINT[lv - 4] : RAMP[lv - 1])
  function cell(k: number, lv = field[k]) {
    const g = geo!
    const o = (g.pitch - g.dot) / 2
    ctx!.fillStyle = colourOf(lv)
    ctx!.fillRect((k % g.cols) * g.pitch + o, Math.floor(k / g.cols) * g.pitch + o, g.dot, g.dot)
  }
  function paintAll() {
    const g = geo
    if (!g) return
    ctx!.clearRect(0, 0, g.w, g.h)
    const ramp = field.map((v) => (v >= 5 ? 0 : v))
    drawLevels(ctx!, ramp, g.cols, g.rows, g.pitch, g.dot)
    for (let k = 0; k < field.length; k++) if (field[k] >= 5) cell(k)
  }
  function paintSlice(a0: number, a1: number) {
    for (const k of order) { const t = thr[k]; if (t > a1) break; if (t > a0) cell(k) }
  }

  function ignite(from: Pt[] | null) {
    if (lit) return
    lit = true
    area.dataset.inState = 'on' // §8.2 voice-control: the controls come with the orla
    if (from && geo) {
      const r = canvas.getBoundingClientRect()
      seeds = from.map(([x, y]) => [x - r.left, y - r.top] as Pt)
      build(geo, innerWidth < 768)
    }
    const t0 = performance.now()
    const step = () => {
      const prev = a
      a = Math.min(A_MAX, ((performance.now() - t0) / IGNITE_MS) * A_MAX)
      paintSlice(prev, a)
      bus.ign[id] = a / A_MAX
      if (a < A_MAX) timer = window.setTimeout(step, IGNITE_MS / STEPS)
      else { flickUntil = performance.now() + 5000; timer = window.setTimeout(flicker, 125) }
    }
    step()
  }
  function flicker() {
    if (!geo) return
    const on = performance.now() < flickUntil && !document.hidden
    for (const k of flick) { const g = geo; ctx!.clearRect((k % g.cols) * g.pitch, Math.floor(k / g.cols) * g.pitch, g.pitch, g.pitch); cell(k, on && Math.random() < 0.5 ? field[k] + 1 : field[k]) }
    if (on) timer = window.setTimeout(flicker, 125)
  }

  const ro = new ResizeObserver(() => layout())
  ro.observe(area)
  const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { seen = true; check() } }, { threshold: 0.2 })
  io.observe(area)
  // the FAQ's orla is lit by the phone's fragments (§6.2, c ≥ .45); without the engine, by the plain trigger
  const check = (): boolean => {
    if (lit) return false
    const glOn = root.classList.contains('gl-on')
    if (id === 'faq' && glOn) { if (bus.c5 >= 0.45) ignite(orlaTargets('faq')) }
    else if (seen && (id !== 'faq' || root.classList.contains('gl-off') || bus.c5 >= 0.45 || !root.classList.contains('scenes'))) ignite(null)
    return false
  }
  if (id === 'faq') ticker.add(check)
  if (reduced) { area.dataset.inState = 'on'; bus.ign[id] = 1 }
  return () => { ro.disconnect(); io.disconnect(); ticker.remove(check); clearTimeout(timer); registry.delete(id) }
}
