// Geometry shared by the WebGL engine and the DOM that must sit on top of it (agent buttons, night
// labels). The shader and these functions use the same numbers, so a label lands on its point.

export type V2 = [number, number]

/** Network nodes in "net units": x across (−1…1), y up from the base (0) to the vertex (1.55).
 *  0–5 agents (base of the triangle, reading order), 6–8 brains (the inner arrow head), 9 = you. */
export const NODES: V2[] = [
  [-1.0, 0.02], [-0.62, -0.06], [-0.22, 0.04], [0.2, -0.04], [0.6, 0.06], [1.0, -0.02],
  [-0.42, 0.66], [0.42, 0.66], [0.0, 0.98],
  [0.0, 1.55],
]
/** Nine named relations, agent → brain and brain → you (no plexus: 6 + 3 wires). */
export const EDGES: [number, number][] = [[0, 6], [1, 6], [2, 8], [3, 8], [4, 7], [5, 7], [6, 9], [7, 9], [8, 9]]

export const isPortrait = (vw: number) => vw < 768

/** Where the network sits in the hero (document px at scroll 0): centre x, base y, px per net unit. */
export type NetF = { cx: number; baseY: number; unit: number; sx?: number }
/** Juri-v4 D2/D3: the six agents (and their 28 px hit areas) stay inside the screen at 390 and above
 *  the fold at 1440. sx stretches x only (the phone network spans the section, brief-v4.1 §4.4). */
export function netFrame(vw: number, vh: number): NetF {
  if (isPortrait(vw)) {
    const unit = Math.min(vh * 0.25, (vw / 2 - 40) / 1.04)
    return { cx: vw * 0.5, baseY: vh * 0.95, unit }
  }
  const unit = Math.min(vh * 0.44, vw * 0.27)
  return { cx: vw * 0.79, baseY: vh * 0.9, unit }
}

export function netToScreen(n: V2, f: NetF): V2 {
  return [f.cx + n[0] * f.unit * (f.sx ?? 1), f.baseY - n[1] * f.unit]
}

/** The second network (brief-v4.1 §4.4): its vertex is the base of the phone, its six agents sit on
 *  the base of the stage. Viewport px. */
export function phoneNetFrame(phone: { x0: number; x1: number; y1: number }, stageBottom: number, vw: number): NetF {
  const portrait = isPortrait(vw)
  const baseY = stageBottom - (portrait ? 26 : 40)
  const unit = Math.max(40, (baseY - (phone.y1 + 10)) / 1.55)
  const half = portrait ? Math.min(165, vw / 2 - 30) : Math.min(vw * 0.4, 620)
  return { cx: (phone.x0 + phone.x1) / 2, baseY, unit, sx: half / unit }
}

/** object-fit: cover for a W×H box over an iw×ih image; uv = o + local01 * s. posY like object-position. */
export function coverMap(w: number, h: number, iw: number, ih: number, posY = 0.45) {
  const qa = w / h, ia = iw / ih
  if (qa > ia) { const sv = ia / qa; return { su: 1, sv, ou: 0, ov: (1 - sv) * posY } }
  const su = qa / ia
  return { su, sv: 1, ou: (1 - su) * 0.5, ov: 0 }
}
/** The office camera (v4.3: the owner wants to SEE the figures move): a window of the cover map, z× closer,
 *  centred on (fu, fv) in image uv and kept inside the picture. Shared by the engine and the DOM tags. */
export type CoverMap = ReturnType<typeof coverMap>
export function zoomMap(cm: CoverMap, z: number, fu: number, fv: number): CoverMap {
  const su = cm.su / z, sv = cm.sv / z
  return { su, sv, ou: Math.min(Math.max(fu - su / 2, cm.ou), cm.ou + cm.su - su), ov: Math.min(Math.max(fv - sv / 2, cm.ov), cm.ov + cm.sv - sv) }
}
/** Desk monitor centres (render/v2/desks.json), in image px, and the day each desk goes live (MODELO). */
export const OFFICE_IMG = { master: { w: 2080, h: 1800 }, portrait: { w: 1170, h: 1680 } }
export const OFFICE_DESKS: { id: string; master: V2; portrait: V2 }[] = [
  { id: 'receptionist', master: [1454.4, 1167.5], portrait: [239.8, 859.6] },
  { id: 'followup', master: [1566.4, 760.8], portrait: [726.1, 726.5] },
  { id: 'bookkeeper', master: [310.3, 730.7], portrait: [438.7, 418.1] },
  { id: 'admanager', master: [1997.0, 454.5], portrait: [1320.7, 702.0] },
  // social and analyst sit outside the 2080-px master frame: clamped to its right edge there
  { id: 'social', master: [2010, 744.7], portrait: [1005.5, 955.8] },
  { id: 'analyst', master: [2030, 946.5], portrait: [1049.0, 1373.0] },
]

/** The ground plane of the night, seen low. time runs along x on desktop and along depth (up the
 *  screen) on a phone, so the scroll pushes the crest upward, the brand's direction. */
export function gridCam(vw: number, vh: number) {
  // W is wide enough that even the far row reaches both screen edges (owner 09/11: edge to edge)
  if (isPortrait(vw)) return { f: vw * 1.1, horizon: vh * 0.3, h: 1.0, zNear: 1.15, zFar: 7.0, W: (7.0 * vw) / (vw * 1.1) * 1.04, cols: 72, rows: 56, Wev: 2.8 }
  return { f: vw * 0.62, horizon: vh * 0.3, h: 1.0, zNear: 1.25, zFar: 6.5, W: (6.5 * vw) / (vw * 0.62) * 1.04, cols: 168, rows: 52, Wev: 4.4 }
}
export type GridCam = ReturnType<typeof gridCam>

/** gx, gz in 0…1 (column, row), y = height above the plane. Returns screen px (viewport). */
export function projectGrid(gx: number, gz: number, y: number, cam: GridCam, vw: number): V2 {
  const X = (gx - 0.5) * cam.W
  const Z = cam.zNear + (cam.zFar - cam.zNear) * gz
  return [vw / 2 + (cam.f * X) / Z, cam.horizon + (cam.f * (cam.h - y)) / Z]
}

/** Night events: hour → time 0…1 (18:00 → 08:00) and the area (depth) where it happens. */
const hourToT = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  const mins = ((h < 18 ? h + 24 : h) - 18) * 60 + m
  return mins / (14 * 60)
}
const AREAS = [0.14, 0.44, 0.24, 0.6, 0.1, 0.52, 0.2, 0.66, 0.34, 0.06]
export function nightEvents(times: string[]) {
  return times.map((t, i) => ({ t: hourToT(t), a: AREAS[i % AREAS.length] }))
}
/** grid (col,row) of an event for a camera: desktop time = column, phone time = row. */
export function eventCell(ev: { t: number; a: number }, cam: GridCam, portrait: boolean) {
  // events stay in the band that was always on screen (Wev of W), the grid around them is wider
  const k = cam.Wev / cam.W
  const col = Math.round((0.5 + ((portrait ? ev.a : ev.t) - 0.5) * k) * (cam.cols - 1))
  const row = Math.round((portrait ? ev.t : ev.a) * (cam.rows - 1))
  return { col, row, gx: col / (cam.cols - 1), gz: row / (cam.rows - 1) }
}

/** Seeded RNG so the poster and the live scene are the same picture. */
export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Build the one particle buffer: every point is both a network point and a grid point, so the
 *  network can fall and become the grid of the night (E2). */
export function buildPoints(cam: GridCam, portrait: boolean, eventTimes: string[]) {
  const n = cam.cols * cam.rows
  const r = rng(7)
  const gauss = () => Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r())
  const aNet = new Float32Array(n * 3)
  const aGrid = new Float32Array(n * 3)
  const aInfo = new Float32Array(n * 4)
  // role split (fractions of n): brains 30%, agents 15%, you 3%, flow along the wires the rest
  const nBrain = Math.floor(n * 0.1), nAgent = Math.floor(n * 0.025), nYou = Math.floor(n * 0.03)
  const order = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [order[i], order[j]] = [order[j], order[i]] }
  const events = nightEvents(eventTimes).map((ev) => eventCell(ev, cam, portrait))
  const eventAt = new Map(events.map((e, i) => [e.row * cam.cols + e.col, i]))
  for (let k = 0; k < n; k++) {
    const i = order[k] // grid slot of this network point
    let role: number, id: number, ox = 0, oy = 0
    if (k < nBrain * 3) { role = 0; id = 6 + Math.floor(k / nBrain); ox = gauss() * 0.062; oy = gauss() * 0.055 }
    else if (k < nBrain * 3 + nAgent * 6) { role = 1; id = Math.floor((k - nBrain * 3) / nAgent); ox = gauss() * 0.04; oy = gauss() * 0.035 }
    else if (k < nBrain * 3 + nAgent * 6 + nYou) { role = 2; id = 9; ox = gauss() * 0.028; oy = gauss() * 0.028 }
    else {
      role = 3
      // brain → you wires carry more (the bright bar of the arrow), agent → brain wires the rest
      const u = r()
      id = u < 0.42 ? 6 + Math.floor(r() * 3) : Math.floor(r() * 6)
      ox = gauss() * 0.012
    }
    aNet.set([ox, oy, 0], k * 3)
    const col = i % cam.cols, row = Math.floor(i / cam.cols)
    const ev = eventAt.get(i)
    const flag = ev !== undefined ? 2 + ev : r() < 0.07 ? 1 : 0
    aGrid.set([col / (cam.cols - 1), row / (cam.rows - 1), flag], k * 3)
    aInfo.set([role, id, r(), r()], k * 4)
  }
  return { n, aNet, aGrid, aInfo, events }
}
