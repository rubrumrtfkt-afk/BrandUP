/** brief-v4.4 §3 "a costura": the one code path of every green packet on the page. A packet is a grain of mint
 *  light (head) plus 3 ghosts on the same quadratic Bézier, Δt .035/.07/.105 behind it at .6/.35/.15 of its
 *  intensity; the head rides e = t²(3 − 2t). Scrubbed packets (between sections) are written by the engine with
 *  writePacket(); timed packets (inside a scene: the night's desks → the bed) go through this queue: ≤ 3 in the air
 *  (140 ms apart), the excess is delivered without a flight so every count stays right. The engine reads the slots
 *  (uPkt[12], vec4 x, y, radius, intensity) and stays awake only while a packet flies. */
export type Pt = [number, number]
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
export const ease = (t: number) => { const c = clamp01(t); return c * c * (3 - 2 * c) }
export const bez = (a: Pt, b: Pt, c: Pt, t: number): Pt => {
  const u = 1 - t
  return [u * u * a[0] + 2 * u * t * b[0] + t * t * c[0], u * u * a[1] + 2 * u * t * b[1] + t * t * c[1]]
}
const TRAIL: [number, number][] = [[0, 1], [0.035, 0.6], [0.07, 0.35], [0.105, 0.15]]
export const PKT_SLOTS = 3 // packets (× 4 blobs = uPkt[12])

/** writes packet slot k (4 vec4) of `out`: `at(e)` is the path at the eased progress; t may run past 1 (the ghosts
 *  catch up with the head and merge), a ghost before the start is not drawn */
export function writePacket(out: number[], k: number, at: (e: number) => Pt, t: number, r: number, w: number) {
  if (k >= PKT_SLOTS) return
  TRAIL.forEach(([dt, f], j) => {
    const tt = t - dt
    const o = (k * 4 + j) * 4
    if (tt < 0 && j > 0) { out[o + 3] = 0; return }
    const [x, y] = at(ease(tt))
    out[o] = x; out[o + 1] = y; out[o + 2] = r; out[o + 3] = w * f
  })
}

/** scope: who owns the flight; clear() drops only its own scope (the night's untagged flights by default), so the night
 *  leaving the screen does not swallow the testimonials' packet (brief-v4.6 §4.2) */
type Flight = { from: () => Pt | null; to: () => Pt | null; ctrl: (a: Pt, b: Pt) => Pt; dur: number; r: number; done: () => void; start: number; arrived: boolean; scope?: string }
const air: Flight[] = []
const queue: Flight[] = []
let lastStart = -1e9

export const transit = {
  /** a timed packet; delivered at once (no flight) when 3 are already in the air or waiting */
  launch(f: Omit<Flight, 'start' | 'arrived'>) {
    if (air.length + queue.length >= PKT_SLOTS) { f.done(); return }
    queue.push({ ...f, start: -1, arrived: false })
  },
  /** advances the queue; fires each arrival once; true while anything is waiting or flying */
  tick(now: number) {
    if (queue.length && now - lastStart >= 140 && air.length < PKT_SLOTS) { const f = queue.shift()!; f.start = now; lastStart = now; air.push(f) }
    for (let i = air.length - 1; i >= 0; i--) {
      const f = air[i], t = (now - f.start) / f.dur
      if (t >= 1 && !f.arrived) { f.arrived = true; f.done() }
      if (t >= 1 + TRAIL[3][0]) air.splice(i, 1)
    }
    return air.length + queue.length > 0
  },
  /** drops everything in the air without delivering (the scroll went back: the state is recomputed by position) */
  clear(scope?: string) {
    for (const list of [air, queue]) for (let i = list.length - 1; i >= 0; i--) if (list[i].scope === scope) list.splice(i, 1)
  },
  busy: () => air.length + queue.length > 0,
  /** writes the flights into the slots from `k0`; returns the next free slot */
  write(out: number[], now: number, k0: number) {
    let k = k0
    for (const f of air) {
      const a = f.from(), c = f.to()
      if (!a || !c || k >= PKT_SLOTS) continue
      const b = f.ctrl(a, c)
      writePacket(out, k++, (e) => bez(a, b, c, e), (now - f.start) / f.dur, f.r, 1)
    }
    return k
  },
}
