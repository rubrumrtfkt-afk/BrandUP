/** v4.5 the footer's landscape: the logo triangle as a MOUNTAIN of points (owner's reference: footers whose base is
 *  a big field of grain). Canvas 2D, our ramp: deep → brand → lilac → core, 4 levels by a Bayer threshold plus a
 *  seeded grain, so the light reads as dots and never as a flat fill. The arrow of the logo is lit in the core white
 *  (the logo is purple + white); the green is only the energy at the mountain's foot, a thin dotted aura OUTSIDE the
 *  silhouette, never in the arrow. Drawn once per size; while on screen (and not reduced motion) only the foot's
 *  energy and the ridge twinkle, at 8 fps, paused with the tab hidden or the footer off screen. */
import { MINT, RAMP, bayer, drawLevels, rng } from './grain'
// brief-v4.4 §8.1 ground-peak: the mountain paints FROM ITS FOOT TO ITS APEX by a Bayer threshold (a cell lights when
// bayer < advance − its relative height), triggered at 25 % visible, 900 ms; the foot's mint lights last (the page's
// last green); then the 8-fps shimmer of v4.5, which now stops after 5 s
const REVEAL_MS = 900, SHIMMER_MS = 5000
const revealEase = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 2.6) // ≈ cubic-bezier(.3, .6, .2, 1)

type Geo = { w: number; h: number; pitch: number; dot: number; cx: number; apex: number; base: number; half: number }

// the logo (viewBox 5 5 30 28): body M20 5 L35 33 L5 33; arrow head M20 13 L26 22 L14 22; shaft x 17.5–22.5, y 21–30
function inArrow(u: number, v: number) {
  // u, v in logo units (x 5…35, y 5…33)
  if (v >= 13 && v <= 22) { const k = (v - 13) / 9; if (Math.abs(u - 20) <= 6 * k) return true }
  if (v < 21 || v > 30 || u < 17.5 || u > 22.5) return false
  return v <= 27.5 || Math.hypot(u - 20, v - 27.5) <= 2.5 // the shaft's rounded foot
}


export function initFootPeak(canvas: HTMLCanvasElement, reduced: boolean): () => void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}
  let geo: Geo | null = null
  let field: Uint8Array = new Uint8Array(0) // static level per grid cell (0 none, 1–4 ramp)
  let energy: { x: number; y: number; k: number }[] = []
  let ridge: { x: number; y: number }[] = []
  let raf = 0, last = 0, visible = false
  let adv = reduced ? 2 : 0, revealAt = -1, stopAt = 0
  let order: Int32Array = new Int32Array(0), thr = new Float32Array(0)
  const still = document.createElement('canvas') // the static field, painted once per size

  function layout() {
    const r = canvas.getBoundingClientRect()
    const w = Math.round(r.width), h = Math.round(r.height)
    if (!w || !h) return
    const dpr = Math.min(devicePixelRatio || 1, 2)
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    const pitch = w < 700 ? 3 : 4
    const dot = w < 700 ? 1.5 : 2
    // the mountain: the logo's proportion (base 30 : height 28), its foot on the horizon
    // the foot stands on the wordmark's cap line: proto.css --peak-base (fraction of the height), per breakpoint
    // v4.6: measured from the wordmark (cap height ≈ .87 em above its box's bottom, line-height 1, bottom-aligned), so
    // the foot stands ON the letters at every width instead of over them; --peak-base stays the fallback
    const word = canvas.parentElement?.querySelector<HTMLElement>('.foot-word')
    const fs = word ? parseFloat(getComputedStyle(word).fontSize) : 0
    const base = fs > 0 ? Math.round(h - fs * 0.87 - 2) : Math.round(h * (parseFloat(getComputedStyle(canvas).getPropertyValue('--peak-base')) || 0.62))
    const tall = Math.min(base - 8, (w * (w < 700 ? 0.8 : 0.36)) * 28 / 30)
    const half = tall * 15 / 28
    geo = { w, h, pitch, dot, cx: w / 2, apex: base - tall, base, half }
    build()
    still.width = canvas.width; still.height = canvas.height
    const sc = still.getContext('2d')
    if (sc) { sc.setTransform(dpr, 0, 0, dpr, 0, 0); drawField(sc) }
    if (adv >= 2) paint(reduced ? 0 : performance.now())
    else { ctx!.setTransform(1, 0, 0, 1, 0, 0); ctx!.clearRect(0, 0, canvas.width, canvas.height); const a = adv; adv = 0; revealTo(a) }
  }

  function build() {
    const g = geo!
    const cols = Math.ceil(g.w / g.pitch), rows = Math.ceil(g.h / g.pitch)
    field = new Uint8Array(cols * rows)
    energy = []; ridge = []
    const rnd = rng(45)
    const tall = g.base - g.apex
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const x = i * g.pitch + g.pitch / 2, y = j * g.pitch + g.pitch / 2
      const b = bayer(i, j)
      const grain = (rnd() - 0.5) * 0.3
      let I = 0
      const t = (y - g.apex) / tall // 0 apex … 1 foot
      const halfAt = t * g.half
      const dx = x - g.cx
      if (t >= 0 && t <= 1 && Math.abs(dx) <= halfAt) {
        // logo units, for the arrow
        const u = 20 + (dx / g.half) * 15, v = 5 + t * 28
        if (inArrow(u, v)) I = 0.7 + 0.2 * (1 - t) // core + lilac dots: the logo's white arrow, still made of grain
        else {
          const edge = (halfAt - Math.abs(dx)) / Math.max(1, g.pitch) // cells from the slope
          const rim = edge < 2.5 ? 0.3 * (1 - edge / 2.5) : 0
          // a ridge from the apex down the middle: the left face catches the light, the right face is in shade
          const face = dx < 0 ? 0.74 : 0.5
          const depth = 1 - 0.5 * t // brighter toward the apex, the foot sinks into the night
          I = face * depth + rim + (Math.abs(dx) < g.pitch * 0.8 ? 0.12 * (1 - t) : 0)
        }
      } else if (y > g.base) {
        // the ground: rows of points receding from the foot, fading to the sides and down
        // (a few rows only: below them the wordmark is the ground)
        const d = (y - g.base) / (g.h * 0.14)
        const spread = 1 - Math.min(1, Math.abs(dx) / (g.w * 0.5))
        const row = (j % 2 === 0) ? 1 : 0.3
        I = d > 1 ? 0 : 0.55 * spread * spread * (1 - d) * row
      } else {
        // the sky: a faint haze toward the peak, mostly empty
        const near = Math.max(0, 1 - Math.hypot(dx / (g.half * 2.4), (y - g.apex - tall * 0.4) / (tall * 1.1)))
        I = 0.2 * near * near
      }
      I = Math.max(0, Math.min(1, I + grain * (I > 0.02 ? 1 : 0.3)))
      const lv = Math.floor(I * 4 + b - 0.5)
      field[j * cols + i] = Math.max(0, Math.min(4, lv))
      // the foot's green energy: a thin dotted band just OUTSIDE the silhouette (both slopes' last 18 %) and on the
      // horizon right under the foot; ≤ 1.5 % of the footer's points
      const outside = !(t >= 0 && t <= 1 && Math.abs(dx) <= halfAt)
      if (outside && t > 0.82 && t <= 1.04 && Math.abs(Math.abs(dx) - halfAt) < g.pitch * 2.2 && rnd() < 0.42) energy.push({ x, y, k: rnd() })
      if (!outside && t < 0.22 && (halfAt - Math.abs(dx)) < g.pitch * 1.5 && rnd() < 0.5) ridge.push({ x, y })
    }
    // the reveal: each lit cell's threshold = its height over the foot (0 at the foot, 1 at the apex) + its Bayer value
    thr = new Float32Array(cols * rows)
    const lit: number[] = []
    for (let k = 0; k < field.length; k++) {
      if (!field[k]) continue
      const i = k % cols, j = Math.floor(k / cols)
      thr[k] = Math.min(1, Math.max(0, (g.base - (j * g.pitch + g.pitch / 2)) / tall)) + bayer(i, j)
      lit.push(k)
    }
    lit.sort((p, q) => thr[p] - thr[q])
    order = Int32Array.from(lit)
  }
  // draws the cells whose threshold the advance just passed (incremental; the canvas is not cleared)
  function revealTo(a: number) {
    const g = geo
    if (!g) return
    const cols = Math.ceil(g.w / g.pitch)
    const o = (g.pitch - g.dot) / 2
    ctx!.setTransform(canvas.width / g.w, 0, 0, canvas.height / g.h, 0, 0)
    for (const k of order) {
      const t = thr[k]
      if (t > a) break
      if (t <= adv) continue
      ctx!.fillStyle = RAMP[field[k] - 1]
      ctx!.fillRect((k % cols) * g.pitch + o, Math.floor(k / cols) * g.pitch + o, g.dot, g.dot)
    }
    adv = a
  }

  function drawField(c: CanvasRenderingContext2D) {
    const g = geo!
    drawLevels(c, field, Math.ceil(g.w / g.pitch), Math.ceil(g.h / g.pitch), g.pitch, g.dot)
  }

  function paint(time: number) {
    const g = geo
    if (!g) return
    const c = ctx!
    c.setTransform(1, 0, 0, 1, 0, 0)
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.drawImage(still, 0, 0)
    c.setTransform(canvas.width / g.w, 0, 0, canvas.height / g.h, 0, 0)
    // the ridge twinkles (core white), the foot's energy breathes in three greens; both still when reduced
    const ph = time / 1000
    c.fillStyle = RAMP[3]
    for (const p of ridge) if (reduced || Math.sin(ph * 2.1 + p.x * 0.37 + p.y * 0.11) > 0.55) c.fillRect(p.x - g.dot / 2, p.y - g.dot / 2, g.dot, g.dot)
    for (const p of energy) {
      const s = reduced ? p.k : 0.5 + 0.5 * Math.sin(ph * 1.6 + p.k * 6.283)
      if (s < 0.35) continue
      c.fillStyle = MINT[s > 0.85 ? 2 : s > 0.6 ? 1 : 0]
      c.fillRect(p.x - g.dot / 2, p.y - g.dot / 2, g.dot, g.dot)
    }
  }

  const loop = (now: number) => {
    raf = 0
    if (!visible || document.hidden) return
    if (adv < 2) {
      if (revealAt < 0) revealAt = now
      const e = revealEase((now - revealAt) / REVEAL_MS)
      revealTo(e * 2)
      if (adv >= 2) { stopAt = now + SHIMMER_MS; paint(now) }
    } else if (now >= stopAt) { paint(0); return } // the shimmer stops: one still frame, the loop ends
    else if (now - last >= 125) { last = now; paint(now) }
    raf = requestAnimationFrame(loop)
  }
  const kick = () => { if (!reduced && visible && !document.hidden && !raf && (adv < 2 || performance.now() < stopAt)) raf = requestAnimationFrame(loop) }

  const ro = new ResizeObserver(() => layout())
  ro.observe(canvas)
  const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; kick() }, { threshold: 0.25 })
  io.observe(canvas)
  document.addEventListener('visibilitychange', kick)
  return () => {
    ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', kick)
    if (raf) cancelAnimationFrame(raf)
  }
}
