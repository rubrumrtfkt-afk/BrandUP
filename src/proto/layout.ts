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
/** v5.0 (owner: "All clear" left in ~0.1 s): the yes holds the finale for YOU_HOLD screens of pinned scroll after its
 *  first screen (the orders); the section is (2 + YOU_HOLD) screens tall and the yes's p stays in units of the first
 *  screen. Measured (proto-v50/clear): the DWELL chain makes the clear arrive late when the hand is quick (p ≈ 1.25 at
 *  .43 screen/s), so the hold must absorb that lag AND the reading. */
export const YOU_HOLD = 1.15
/** C5 starts at this p of the yes at the earliest (first-screen units): the v4.4 start (.90) pushed past the hold */
export const C5_AT = 0.9 + 0.75
/** the lock's text is fully in at .65 s + .3 s (proto.css .lock > p; v54: it waits for the silk to settle) */
export const CLEAR_IN_MS = 950
/** and C5 may not begin before it has been read: 600 ms of time AND .8 screen of scroll after it came in (= 667 ms
 *  at the 1.2 screen/s cap of smoothScroll), so a quick hand cannot take it away and a slow one is not held */
export const CLEAR_READ_MS = CLEAR_IN_MS + 600
export const CLEAR_READ_SCREENS = 0.8

/** Where the network sits in the hero (document px at scroll 0): centre x, base y, px per net unit. */
export type NetF = { cx: number; baseY: number; unit: number; sx?: number }
/** Juri-v4 D2/D3: the six agents (and their 28 px hit areas) stay inside the screen at 390 and above
 *  the fold at 1440. sx stretches x only (the phone network spans the section, brief-v4.1 §4.4). */
export function netFrame(vw: number, vh: number): NetF {
  if (isPortrait(vw)) {
    const unit = Math.min(vh * 0.25, (vw / 2 - 40) / 1.04)
    return { cx: vw * 0.5, baseY: vh * 0.95, unit }
  }
  // v55 (owner, hero-cortado.png: the right agent sat at cx + unit = 1527 px on a 1440 screen): the network keeps about
  // the size it had and moves LEFT until its right agent's cloud (1.12 unit) ends a page margin from the edge. The
  // triangle is narrow at the H1's height, so it clears the text by ≥ 56 px at 1024–1920 (proto-v55, fit2). proto.html
  // repeats this formula for the intro's landing spot (keep them together).
  // below ~1280 the text column is a larger share of the screen: (vw − 620) / 2 keeps 1024 × 768 clear (76 px) too
  const unit = Math.min(vh * 0.42, vw * 0.25, Math.max(150, (vw - 620) * 0.5))
  return { cx: vw - pageMargin(vw) - 1.12 * unit, baseY: vh * 0.9, unit }
}
/** --m of proto.css: clamp(20px, 4.45vw, 64px) */
export const pageMargin = (vw: number) => Math.min(64, Math.max(20, vw * 0.0445))

export function netToScreen(n: V2, f: NetF): V2 {
  return [f.cx + n[0] * f.unit * (f.sx ?? 1), f.baseY - n[1] * f.unit]
}

/** The second network (brief-v4.1 §4.4): its vertex is the base of the phone, its six agents sit on
 *  the base of the stage. Viewport px. */
export function phoneNetFrame(phone: { x0: number; x1: number; y1: number }, stageBottom: number, vw: number): NetF {
  const portrait = isPortrait(vw)
  // brief-v4.5 §9.1: the network gets height (160 px at 1440, 150 at 390, instead of ~60) and room under it for the
  // names (base 124 px above the stage's foot at 1440, 154 at 390); 720 px wide at 1440 (c3–c10), 350 at 390
  let baseY = stageBottom - (portrait ? 154 : 124)
  let unit = Math.max(40, (baseY - (phone.y1 + 16)) / 1.55)
  // v54 (owner: "so the person sees what is happening"; jury v53: the names sat at the foot of the screen, far from the
  // card): at 1440 the network is at most 130 px tall, so its base and the names under it come up toward the card
  if (!portrait && unit > 84) { unit = 84; baseY = phone.y1 + 16 + unit * 1.55 }
  const half = portrait ? Math.min(175, vw / 2 - 20) : Math.min(vw * 0.25, 360)
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
  // v54 (jury v53, chromium 1440: the hero came back as 3 loose nodes): the points above are generated role by role
  // (brains, agents, you, wires), and the engine's quality drop shortens the DRAW RANGE, so a prefix of the buffer
  // kept whole roles and lost the rest (50 % → brains + agents + you; 25 % → the 3 brains only). The buffer is now
  // stored in a seeded random order, so any prefix is an even sample of every role; the night's event points go first,
  // so no drop ever takes an event of the night away. A separate seed keeps the picture itself identical.
  const r2 = rng(11)
  const perm = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(r2() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]] }
  perm.sort((a, b) => Number(aGrid[b * 3 + 2] >= 2) - Number(aGrid[a * 3 + 2] >= 2)) // stable: the shuffle stays
  const oNet = new Float32Array(n * 3), oGrid = new Float32Array(n * 3), oInfo = new Float32Array(n * 4)
  perm.forEach((k, j) => {
    oNet.set(aNet.subarray(k * 3, k * 3 + 3), j * 3)
    oGrid.set(aGrid.subarray(k * 3, k * 3 + 3), j * 3)
    oInfo.set(aInfo.subarray(k * 4, k * 4 + 4), j * 4)
  })
  return { n, aNet: oNet, aGrid: oGrid, aInfo: oInfo, events }
}

/** brief-v4.3 §7.1: is a point of the office quad (local 0…1) inside the oval the composite draws, with a margin?
 *  Same superellipse as COMP_FS (exponent 3.2; the edge starts dissolving at .58), so .52 keeps ≥ 10 % inside. */
/** v5.0 (owner: "only 2 desks light, the rest is murky"): a desk counts as inside the model's oval up to .78 of the
 *  superellipse (the composite is solid to .58 and grain-fades to .98), not .52: the bookkeeper (1440) and the
 *  receptionist, bookkeeper and social (390) sit in the render and now light, are framed and get their tag */
export const OVAL_IN = 0.78
export function inOval(lu: number, lv: number, k = 0.52) {
  const ex = Math.abs(lu - 0.5) * 2, ey = Math.abs(lv - 0.5) * 2
  return Math.pow(Math.pow(ex, 3.2) + Math.pow(ey, 3.2), 1 / 3.2) < k
}
