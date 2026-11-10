/** brief-v4.4 §3.2 / §9.5: the grain painter shared by the footer's mountain (footPeak.ts) and the orla (orla.ts).
 *  One matter for every resting fragment: a 4×4 Bayer threshold plus a seeded grain over our 4-level ramp
 *  (deep → brand → lilac → core); the energy in two/three mint levels. */
export const RAMP = ['#1A0B33', '#9232EA', '#C9A2FF', '#FBF7FF'] as const
export const MINT = ['#0E3B2A', '#2FD08F', '#58F6B1'] as const
export const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]

/** the Bayer value (0…1) of a grid cell */
export const bayer = (i: number, j: number) => (B4[(i % 4) + (j % 4) * 4] + 0.5) / 16
/** deterministic grain: the same field at every visit and every size */
export function rng(seed: number) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 } }
/** intensity 0…1 → ramp level 0…4 by the cell's Bayer threshold */
export const level = (I: number, b: number) => Math.max(0, Math.min(4, Math.floor(Math.max(0, Math.min(1, I)) * 4 + b - 0.5)))

/** paints the cells of a level field (0 none, 1–4 ramp) as square dots, one fillStyle per level */
export function drawLevels(c: CanvasRenderingContext2D, field: Uint8Array, cols: number, rows: number, pitch: number, dot: number) {
  const o = (pitch - dot) / 2
  for (let lv = 1; lv <= 4; lv++) {
    c.fillStyle = RAMP[lv - 1]
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) if (field[j * cols + i] === lv) c.fillRect(i * pitch + o, j * pitch + o, dot, dot)
  }
}
