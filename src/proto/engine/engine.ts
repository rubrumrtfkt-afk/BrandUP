import { Geometry, Mesh, Program, RenderTarget, Renderer, Texture, Triangle } from 'ogl'
import { bus } from '../bus'
import { night } from '../content'
import {
  NODES, OFFICE_DESKS, OFFICE_IMG, buildPoints, coverMap, inOval, OVAL_IN, zoomMap, gridCam, isPortrait, netFrame, netToScreen,
  phoneNetFrame, projectGrid, type GridCam, type NetF,
} from '../layout'
import { ticker } from '../ticker'
import { bez, ease, transit, writePacket, type Pt } from '../transit'
import { orlaTargets } from '../orla'
import { COMP_FS, FIELD_FS, POINT_FS, POINT_VS, QUAD_VS } from './shaders'
import { OFFICE_LOOP, type LoopSrc } from './officeLoop'
import nightMasterUrl from '../assets/office-night-1600.webp?url'
import dayMasterUrl from '../assets/office-day-1600.webp?url'
import nightPortraitUrl from '../assets/office-night-p780.webp?url'
import dayPortraitUrl from '../assets/office-day-p780.webp?url'

export type EngineOptions = { cell?: number; freezeAt?: number; density?: number }
type Rect = { x0: number; y0: number; x1: number; y1: number }

// T3 "the dawn" (brief-v4.2 §5.3): each night figure (content night.desks order) flies to its desk in the model
// (OFFICE_DESKS order: receptionist, followup, bookkeeper, admanager, social, analyst) as four dots: the monitor,
// the head, the lamp and the body, in the figure's 36-unit SVG box (Proto.tsx <Seated/>).
const DESK_OF_FIG = [1, 2, 3, 4, 0, 5]
const FIG_DOTS: [number, number][] = [[27 / 36, 13.5 / 36], [11.5 / 36, 8.5 / 36], [33 / 36, 11 / 36], [10.5 / 36, 16.5 / 36]]
// seam progress s (0 = the office's top enters the screen, 1 = the office has pinned for 0.22 screen): figure i
// leaves at FLY_A + i × FLY_STEP, each dot takes FLY_LEN; the last lands at s ≈ .84, as the model fades in
const FLY_A = 0.04, FLY_STEP = 0.05, FLY_DOT = 0.015, FLY_LEN = 0.5
const flyEnd = (i: number) => FLY_A + i * FLY_STEP + 3 * FLY_DOT + FLY_LEN
// v4.8 (owner, Safari: "a striped purple band above 'You, asleep' when the moon leaves, it means nothing"): the T3
// dawn horizon landed on 0.3 vh, inside the night H2's dark box, and left a 96-px fringe slab on the right. v4.9: it
// is back by default, rising FROM the ground between the night and the office (line only, no fringe): no title ever
// stands on that line. ?dawn=0 takes it away.
const params = typeof location === 'undefined' ? new URLSearchParams() : new URLSearchParams(location.search)
const dawnOff = params.get('dawn') === '0'
// brief-v4.4 §5.3 "em avaliação" (?pull=0 removes it): 7 light fragments of the model's edge follow the order out
const pullOn = params.get('pull') !== '0'

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (a: number, b: number, v: number) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t) }
const approach = (cur: number, target: number, k: number, dt: number) => cur + (target - cur) * (1 - Math.pow(1 - k, dt / 16.7))
const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 2)
const mix = (a: number, b: number, t: number) => a + (b - a) * t

/** Starts the one WebGL2 renderer of the page. Returns a dispose function, or null when WebGL2 is not
 *  available (the caller keeps the posters). */
export function startEngine(canvas: HTMLCanvasElement, opts: EngineOptions = {}): (() => void) | null {
  const portrait0 = isPortrait(innerWidth)
  const dpr = Math.min(devicePixelRatio || 1, portrait0 ? 1.5 : 2)
  // v4.5: alpha so the unlit ground is the textured CSS ground (proto.css body::before/after), the same before the
  // engine boots, while it idles and without WebGL; the composite writes alpha 0 there and opaque light on top
  const renderer = new Renderer({ canvas, dpr, alpha: true, antialias: false, depth: false, webgl: 2, powerPreference: 'high-performance' })
  const gl = renderer.gl
  if (!gl || !renderer.isWebgl2) return null
  // v55b (jury v55: with GL in software the intro froze 1.7–5 s on the first visible frame, frames of 337 ms, 30 fps):
  // a software rasteriser (SwiftShader, llvmpipe, Microsoft Basic Render) cannot run this scene; the caller keeps the
  // posters, like ≤ 2 GB or Save-Data. ?gl=1 forces the engine (to compare).
  const dbg = gl.getExtension('WEBGL_debug_renderer_info')
  const gpu = String(gl.getParameter(dbg ? dbg.UNMASKED_RENDERER_WEBGL : gl.RENDERER) ?? '')
  if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(gpu) && new URLSearchParams(location.search).get('gl') !== '1') return null
  gl.clearColor(0, 0, 0, 0)
  let cell = opts.cell ?? 2

  let vw = 0, vh = 0, portrait = portrait0, cam: GridCam = gridCam(innerWidth, innerHeight)
  let light: RenderTarget
  let points: Mesh
  let geometry: Geometry
  let total = 0
  let drawCount = 0

  const pointProgram = new Program(gl, {
    vertex: POINT_VS, fragment: POINT_FS, depthTest: false, depthWrite: false,
    uniforms: {
      uView: { value: [1, 1] }, uTime: { value: 0 }, uNetF: { value: [0, 0, 1] }, uFall: { value: 0 }, uHot: { value: -1 },
      uNodes: { value: NODES.flat() }, uCam: { value: [1, 1, 1, 1] }, uZ: { value: [1, 2] }, uPortrait: { value: 0 },
      uGridOn: { value: 0 }, uGridY: { value: 0 }, uCrest: { value: -1 }, uConv: { value: 0 }, uLead: { value: [0, 0] }, uCell: { value: cell },
      uNetS: { value: 1 }, uDim: { value: 0 }, uNetI: { value: 1 }, uForm: { value: [0, 0, 1, 1] }, uFormMix: { value: 0 }, uPtr: { value: [-999, -999, 0] }, uThin: { value: 1 },
      uLogo: { value: [0, 0, 1, 1] }, uLogoI: { value: 1 },
    },
  })
  pointProgram.setBlendFunc(gl.ONE, gl.ONE)

  const fieldProgram = new Program(gl, {
    vertex: QUAD_VS, fragment: FIELD_FS, depthTest: false, depthWrite: false,
    uniforms: {
      uBuf: { value: [1, 1] }, uCell: { value: cell }, uTime: { value: 0 }, uHz: { value: [0, 0, 0, 0] }, uBeam: { value: [0, 0, 0, 0, 0] },
      uBeamTo: { value: [0, 0, 0, 0] }, uRise: { value: [0, 0, 0, 0] },
      uAct: { value: new Array(8).fill(0) }, uActP: { value: new Array(8).fill(0) },
      uActG: { value: 1 }, uHzX: { value: [1, 0, 0, 0] }, uPkt: { value: new Array(48).fill(0) }, uPktOn: { value: 0 },
      uFrag: { value: new Array(96).fill(0) }, uFragOn: { value: 0 }, uEvB: { value: new Array(20).fill(0) }, uPool: { value: new Array(24).fill(0) },
      uFly: { value: new Array(96).fill(0) }, uFlyOn: { value: 0 },
      uArw: { value: new Array(16).fill(0) }, uArwH: { value: 100 },
    },
  })
  const quad = new Triangle(gl)
  const fieldMesh = new Mesh(gl, { geometry: quad, program: fieldProgram })

  const blank = () => new Texture(gl, { generateMipmaps: false })
  let tNight = blank(), tDay = blank()
  const compProgram = new Program(gl, {
    vertex: QUAD_VS, fragment: COMP_FS, depthTest: false, depthWrite: false,
    uniforms: {
      tLight: { value: null }, uBuf: { value: [1, 1] }, uCell: { value: cell }, uDpr: { value: dpr }, uViewH: { value: 1 },
      uDark: { value: new Array(64).fill(0) }, uDarkF: { value: new Array(16).fill(1) }, uDarkN: { value: 0 },
      tNight: { value: tNight }, tDay: { value: tDay }, uOffR: { value: [0, 0, 0, 0] }, uOffM: { value: [0, 0, 1, 1] }, uOffOn: { value: 0 },
      uOffLum: { value: 1.0 }, uDesk: { value: new Array(18).fill(0) }, uDeskK: { value: 1.4 }, uDayP: { value: 0 },
    },
  })
  const compMesh = new Mesh(gl, { geometry: quad, program: compProgram })

  let events: ReturnType<typeof buildPoints>['events'] = []
  function buildGeometry() {
    const built = buildPoints(cam, portrait, night.labels.map((l) => l[0]))
    geometry?.remove()
    geometry = new Geometry(gl, { aNet: { size: 3, data: built.aNet }, aGrid: { size: 3, data: built.aGrid }, aInfo: { size: 4, data: built.aInfo } })
    total = built.n
    drawCount = Math.round(total * (opts.density ?? 1))
    geometry.setDrawRange(0, drawCount)
    points = new Mesh(gl, { geometry, program: pointProgram, mode: gl.POINTS })
    events = built.events
  }

  function resize() {
    vw = innerWidth; vh = innerHeight
    const p = isPortrait(vw)
    renderer.setSize(vw, vh)
    const bw = Math.ceil(vw / cell), bh = Math.ceil(vh / cell)
    if (light) gl.deleteTexture(light.texture.texture)
    light = new RenderTarget(gl, { width: bw, height: bh, depth: false, minFilter: gl.NEAREST, magFilter: gl.NEAREST })
    const newCam = gridCam(vw, vh)
    if (!geometry || p !== portrait || newCam.cols !== cam.cols) {
      if (p !== portrait) dropOffice()
      portrait = p; cam = newCam; buildGeometry()
    } else cam = newCam
    const u = pointProgram.uniforms
    u.uView.value = [bw * cell, bh * cell]
    u.uCam.value = [cam.f, cam.horizon, cam.h, cam.W]
    u.uZ.value = [cam.zNear, cam.zFar]
    u.uPortrait.value = portrait ? 1 : 0
    fieldProgram.uniforms.uBuf.value = [bw, bh]
    compProgram.uniforms.uBuf.value = [bw, bh]
    compProgram.uniforms.uViewH.value = vh
    labelsDirty = true
  }

  // ---- office textures: lazy (≤ 1 screen away), dropped when > 2 screens away (brief-v4.1 §4.3)
  let officeState: 'none' | 'loading' | 'ready' = 'none'
  let officeGen = 0
  // decode() keeps the decode off the frame (WebKit too); the generation counter drops stale loads
  const loadImage = (url: string) => { const img = new Image(); img.decoding = 'async'; img.src = url; return img.decode().then(() => img) }
  function loadOffice() {
    officeState = 'loading'
    const gen = ++officeGen
    const urls = portrait ? [nightPortraitUrl, dayPortraitUrl] : [nightMasterUrl, dayMasterUrl]
    Promise.all(urls.map(loadImage))
      .then(([n, d]) => {
        if (gen !== officeGen || gl.isContextLost()) return
        // flipY false: OGL flips TEXTURE_2D uploads by default, and the composite samples v = 0 at the TOP of
        // the render (the office came out upside down in every engine, owner 09/11)
        const opt = { generateMipmaps: false, flipY: false, minFilter: gl.LINEAR, magFilter: gl.LINEAR, wrapS: gl.CLAMP_TO_EDGE, wrapT: gl.CLAMP_TO_EDGE }
        gl.deleteTexture(tNight.texture); gl.deleteTexture(tDay.texture)
        tNight = new Texture(gl, { ...opt, image: n }); tDay = new Texture(gl, { ...opt, image: d })
        compProgram.uniforms.tNight.value = tNight; compProgram.uniforms.tDay.value = tDay
        officeState = 'ready'
        loadLoops(gen, opt)
        ticker.wake()
      })
      .catch((error: unknown) => {
        if (gen !== officeGen) return
        console.warn('office textures failed; the scene keeps the grid and the DOM layer', error)
        officeState = 'none'
      })
  }
  // the animated loop replaces a still once it can play (the still stays the poster); paused off screen
  // v4.3: a texture upload is ~9 MB at 1600×1384; upload only (a) the loop the composite actually shows (night,
  // day, or both during the cross-fade) and (b) when the video has a NEW frame (24 fps, not every rAF).
  type Vfc = HTMLVideoElement & { requestVideoFrameCallback?: (cb: () => void) => number }
  const videos: { el: HTMLVideoElement; tex: Texture; which: 'night' | 'day'; fresh: boolean }[] = []
  // v4.5: loops still loading. A drop (scroll > 2 screens away, portrait flip) used to orphan them: the stale
  // generation returned early from loadeddata in silence and the element kept downloading; now they are released.
  const pending = new Set<HTMLVideoElement>()
  const probe = new URLSearchParams(location.search).has('probe')
  function loadLoops(gen: number, opt: Record<string, number | boolean>) {
    const set = OFFICE_LOOP[portrait ? 'portrait' : 'master']
    for (const which of ['night', 'day'] as const) {
      const src: LoopSrc | undefined = set[which]
      if (!src) continue
      const el = document.createElement('video')
      el.muted = true; el.loop = true; el.playsInline = true; el.preload = 'auto'; el.setAttribute('aria-hidden', 'true')
      const url = src.webm && el.canPlayType('video/webm; codecs="vp9"') ? src.webm : src.mp4
      if (!url) continue
      pending.add(el)
      el.addEventListener('loadeddata', () => {
        pending.delete(el)
        if (gen !== officeGen || gl.isContextLost()) return
        const tex = new Texture(gl, { ...opt, image: el })
        const v = { el, tex, which, fresh: true }
        videos.push(v)
        const vfc = el as Vfc
        if (vfc.requestVideoFrameCallback) { const onFrame = () => { v.fresh = true; ticker.wake(); if (videos.includes(v)) vfc.requestVideoFrameCallback?.(onFrame) }; vfc.requestVideoFrameCallback(onFrame) }
        if (which === 'night') { gl.deleteTexture(tNight.texture); tNight = tex; compProgram.uniforms.tNight.value = tex }
        else { gl.deleteTexture(tDay.texture); tDay = tex; compProgram.uniforms.tDay.value = tex }
        ticker.wake()
      }, { once: true })
      el.addEventListener('error', () => { pending.delete(el); console.warn('office loop failed; the still stays', url) }, { once: true })
      el.src = url
    }
  }
  let uploads = 0
  const playLoops = (on: boolean, day = 0) => {
    for (const v of videos) {
      const shown = on && (v.which === 'night' ? day < 0.995 : day > 0.005)
      if (shown && v.el.paused) v.el.play().catch((error: unknown) => console.warn('office loop could not play; the still stays', error))
      else if (!shown && !v.el.paused) v.el.pause()
      const hasVfc = !!(v.el as Vfc).requestVideoFrameCallback
      if (shown && v.el.readyState >= 2 && (v.fresh || !hasVfc)) { v.tex.needsUpdate = true; v.fresh = false; uploads++ }
    }
    if (probe) (window as Window & { __loop?: unknown }).__loop = { uploads, pending: pending.size, v: videos.map((v) => [v.which, +v.el.currentTime.toFixed(2), v.el.readyState, v.el.paused, v.el.currentSrc.split('/').pop()]) }
  }
  const onHidden = () => { if (document.hidden) playLoops(false) }
  document.addEventListener('visibilitychange', onHidden)

  function dropOffice() {
    officeGen++
    for (const v of videos.splice(0)) { v.el.pause(); v.el.removeAttribute('src'); v.el.load() }
    for (const el of pending) { el.removeAttribute('src'); el.load() }
    pending.clear()
    if (officeState === 'ready') {
      gl.deleteTexture(tNight.texture); gl.deleteTexture(tDay.texture)
      tNight = blank(); tDay = blank()
      compProgram.uniforms.tNight.value = tNight; compProgram.uniforms.tDay.value = tDay
    }
    officeState = 'none'
  }

  // DOM handles, looked up lazily (React may re-render)
  const q = <T extends Element>(sel: string) => document.querySelector<T>(sel)
  const rect = (el: Element | null): Rect | null => { if (!el) return null; const r = el.getBoundingClientRect(); return { x0: r.left, y0: r.top, x1: r.right, y1: r.bottom } }
  let labelEls: HTMLElement[] = []
  let figEls: HTMLElement[] = []
  let labelsDirty = true
  const crestEl = () => q<HTMLElement>('[data-crest-time]')

  // animated state
  const cam3 = { u: 0.5, v: 0.5, z: 1 } // the office camera window (v4.3)
  const beams = [0, 0, 0, 0, 0]
  let phoneLit = 0
  let gridOn = 0
  let frameNo = 0
  let slowSince = -1
  let avgDt = 16.7
  let idleCleared = false
  let scaled = false
  const dts: number[] = []
  let started = false
  let heroRiseDone = false
  let arwP = -1 // v52: the arrow's progress along its arc (the scroll through approach)
  // v52: the hero's first-gesture rise is MINT (brief-v4.1 §4.10); the owner's rule since v4.5 is "the arrow is white,
  // never green", and the white arrow of the network now is what rises: the mint rise from the vertex stays in the
  // code behind ?herorise=1 for the jury to compare
  const heroRiseOn = new URLSearchParams(location.search).get('herorise') === '1'
  const act = new WeakMap<Element, number>()
  // the pointer, for the form's field of points (owner 09/11 item 4); touch drifts instead of hovering
  const ptr = { x: -999, y: -999, tx: -999, ty: -999, s: 0, at: -1e9 }
  const onPtr = (e: PointerEvent) => { lastInput = performance.now(); ptr.tx = e.clientX; ptr.ty = e.clientY; ptr.at = performance.now(); if (ptr.x < -900) { ptr.x = ptr.tx; ptr.y = ptr.ty } ticker.wake() }
  addEventListener('pointermove', onPtr, { passive: true })
  const t0 = performance.now()
  // brief-v4.3 §9.1: the last input that moves the page (the loop sleeps 1.5 s after it). Dev / ?probe expose the
  // count of frames drawn as window.__frames (the rest probe counts it with the page still).
  let lastInput = t0
  const counting = import.meta.env.DEV || new URLSearchParams(location.search).has('probe')
  const onInput = () => { lastInput = performance.now() }
  addEventListener('scroll', onInput, { passive: true })
  addEventListener('resize', onInput)
  const m = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--m')) || 20
  let margin = 20

  // v55 the intro (proto.html): window.__bu exists only while the intro runs; m = the morph's start (performance.now),
  // null while the logo is still travelling, −1e9 after a skip. The logo's box is read from the DOM, so the grains start
  // exactly on the drawn logo (no second copy of the landing formula here).
  // v55b: late = the logo gave up waiting (700 ms after landing) and left; box = where it was. The engine then starts the
  // morph itself once it has drawn (started) and drops __bu at the end, so the late network grows out of the logo's ghost.
  type Intro = { m: number | null; d: number; late?: boolean; box?: [number, number, number] }
  const intro = () => (window as Window & { __bu?: Intro }).__bu
  const onIntro = () => ticker.wake()
  addEventListener('bu-morph', onIntro)
  let introBox: [number, number, number] | null = null

  const frame = (now: number, dt: number): boolean => {
    if (gl.isContextLost()) return false
    const time = opts.freezeAt ?? (now - t0) / 1000
    const sy = scrollY
    if (labelsDirty) margin = m()

    const hero = rect(q('[data-scene="hero"]'))
    const nightR = rect(q('[data-scene="night"]'))
    const youR = rect(q('[data-scene="you"]'))
    const formR = rect(q('[data-scene="form"]'))
    const officeR = rect(q('[data-scene="office"]'))
    const visible = (r: Rect | null, mg = 0) => !!r && r.y1 > -mg && r.y0 < vh + mg
    let animating = false
    const animBy: number[] = [] // dev / ?probe: the line that asked for frames (window.__why)
    const ask = (line: number) => { animating = true; if (counting) animBy.push(line) }

    // ---- hero network and its fall (E2)
    const f = netFrame(vw, vh)
    const heroTop = hero ? hero.y0 : -sy
    // brief-v4.3 §4.2: the network falls with a 0.6 parallax (it lags the page) over a longer run, so it is still there at y 450
    const fall = smooth(0, vh * 0.95, -heroTop)
    const pu = pointProgram.uniforms
    pu.uTime.value = time
    pu.uNetF.value = [f.cx, heroTop * 0.6 + f.baseY, f.unit]
    pu.uFall.value = fall
    pu.uHot.value = bus.hotAgent
    pu.uNetS.value = 1; pu.uDim.value = 0; pu.uNetI.value = 1
    pu.uThin.value = drawCount > 0 ? Math.sqrt(Math.round(total * (opts.density ?? 1)) / drawCount) : 1

    // ---- v52 (owner, after v4.5: the network back exactly as it was; the one new thing is the logo's WHITE arrow inside
    // it, made of the same light): the arrow lives in the triangle of the wires (net units: centre y .47, height .56) and
    // leaves along an arc with the scroll (brief-v4.5 §5.2: scrub, p = scrollY / (0.6 vh), approach .12; the antecipation
    // to p .08, the tilt ≤ 28° to the right, 3 ghosts that fall to lilac/purple by intensity). Drawn by FIELD_FS in the
    // light buffer, so the composite dithers it like every light (white points, never a flat polygon, never mint).
    {
      const target = clamp01(sy / (0.6 * vh))
      arwP = arwP < 0 ? target : approach(arwP, target, 0.12, dt)
      if (Math.abs(arwP - target) < 0.0008) arwP = target
      else ask(420)
      const ang = fall * 1.35, yU = 0.47, persp = 1 / (1 + yU * Math.sin(ang) * 0.55)
      const hx = f.cx, hy = heroTop * 0.6 + f.baseY - yU * Math.cos(ang) * f.unit * persp
      const hy0 = f.baseY - yU * f.unit // the home at scroll 0: the arc's fixed points are measured from it
      const h = 0.56 * f.unit
      const at = (q: number): [number, number, number] => {
        const lift = -0.06 * h * Math.min(1, Math.max(0, q) / 0.08)
        if (q <= 0.08) return [hx, hy + lift, 0]
        const t = (q - 0.08) / 0.92, e = t * t * (3 - 2 * t), u = 1 - e
        const p1x = hx + 0.04 * vw, p1y = hy0 - 0.55 * vh
        const p2x = portrait ? vw - 30 : Math.min(hx + 0.18 * vw, vw - 48), p2y = -0.25 * vh
        const x = u * u * hx + 2 * u * e * p1x + e * e * p2x, y = u * u * (hy + lift) + 2 * u * e * p1y + e * e * p2y
        const dx = 2 * u * (p1x - hx) + 2 * e * (p2x - p1x), dy = 2 * u * (p1y - hy) + 2 * e * (p2y - p1y)
        return [x, y, Math.max(0, Math.min(0.4887, Math.atan2(dx, -dy)))]
      }
      const arw: number[] = []
      const heroVisible = !!hero && hero.y1 > 0
      ;[[0, 1], [0.035, 0.6], [0.07, 0.35], [0.105, 0.15]].forEach(([d, k], i) => {
        const q = arwP - d
        const on = heroVisible && (i === 0 || (q > 0.08 && arwP < 0.98)) ? k : 0
        const [x, y, tl] = at(q)
        arw.push(x, y, tl, on)
      })
      fieldProgram.uniforms.uArw.value = arw
      fieldProgram.uniforms.uArwH.value = h
      // v55 the intro's morph: the grains leave the logo's triangle (POINT_VS uLogo) and its white arrow grows from the
      // logo's arrow (favicon y 13–30 of 40, centre 1.5 units under the logo's centre) into this one, in place
      const bu = intro()
      let morph = 1
      if (bu) {
        if (bu.late && bu.m === null && started) { bu.m = now; document.documentElement.classList.add('intro-ghost-out') }
        morph = bu.m === null ? 0 : clamp01((now - bu.m) / bu.d)
        const el = morph < 1 ? q('.intro-logo') : null
        if (el) { const r = el.getBoundingClientRect(); if (r.width > 0) introBox = [(r.left + r.right) / 2, (r.top + r.bottom) / 2, r.width] }
        else if (bu.box) introBox = bu.box
        if (morph < 1) ask(345)
        else if (bu.late) {
          (window as Window & { __bu?: Intro }).__bu = undefined
          q('.intro-logo')?.remove()
          document.documentElement.classList.remove('intro-late', 'intro-ghost-out')
        }
      }
      const pl = pointProgram.uniforms
      if (morph < 1 && introBox) {
        const [lx, ly, ls] = introBox
        pl.uLogo.value = [lx, ly, ls, morph]
        // the triangle's area in light texels over the light the drawn points pile on it: ≈ the brand purple
        const area = (ls * 0.75 * ls * 0.7) / 2 / (cell * cell)
        pl.uLogoI.value = Math.min(1, (0.55 * area) / Math.max(1, drawCount * 0.77))
        const e = 1 - Math.pow(1 - smooth(0.08, 0.86, morph), 3)
        arw[0] = mix(lx, arw[0], e); arw[1] = mix(ly + (1.5 * ls) / 40, arw[1], e)
        fieldProgram.uniforms.uArwH.value = mix((17 * ls) / 40, h, e)
      } else pl.uLogo.value = [0, 0, 1, 1]
    }


    // ---- the first yes already in the hero (§4.10): the first scroll gesture sends a rise from the vertex (v52: ?herorise=1)
    if (heroRiseOn && !heroRiseDone && fall > 0.08 && opts.freezeAt === undefined) { heroRiseDone = true; bus.rise = { at: now, src: 'hero' } }

    // ---- the grid: waits under the form (dark), lights with the night, stays as the office floor
    let gridY = 0, crest = -1, conv = 0, target = 0
    const nightNear = !!nightR && nightR.y0 < vh * 0.95
    const officeFloor = !!officeR && officeR.y0 < vh * 0.6 && officeR.y1 > 0
    if (officeFloor && officeR) {
      gridY = Math.max(0, officeR.y0) + vh * 0.34
      crest = 1.2
      target = 0.5 * (officeR.y1 > vh * 0.3 ? 1 : smooth(0, vh * 0.3, officeR.y1))
    } else if (nightNear && nightR) {
      const span = Math.max(1, nightR.y1 - nightR.y0 - vh)
      const prog = clamp01(-nightR.y0 / span)
      gridY = nightR.y0 > 0 ? nightR.y0 : Math.min(0, nightR.y1 - vh)
      crest = -0.08 + (prog / 0.86) * 1.12
      conv = smooth(0.86, 1, prog)
      target = smooth(vh * 0.95, vh * 0.35, nightR.y0) * (nightR.y1 > 0 ? 1 : 0)
    } else target = 0
    // after the fall the points settle behind the form as its ground, until the night takes them
    // after the fall the points settle behind the form as its ground, until the night takes them (v52: back, the owner
    // found the v4.5 form "static, stuck": the field of points that reacts to the pointer returns)
    const formMix = nightR ? smooth(vh * 0.3, vh * 0.95, nightR.y0) : 1
    pu.uFormMix.value = officeFloor ? 0 : formMix
    pu.uForm.value = formR ? [formR.x0, formR.y0, formR.x1 - formR.x0, formR.y1 - formR.y0] : [0, 0, 1, 1]
    const ptrLive = now - ptr.at < 1600
    ptr.x += (ptr.tx - ptr.x) * (1 - Math.pow(0.88, dt / 16.7)); ptr.y += (ptr.ty - ptr.y) * (1 - Math.pow(0.88, dt / 16.7))
    ptr.s = approach(ptr.s, ptrLive ? 1 : 0, 0.06, dt)
    pu.uPtr.value = [ptr.x, ptr.y, ptr.s]
    const formField = fall > 0.3 && formMix > 0.01 && !!formR && formR.y1 > 0 && formR.y0 < vh
    gridOn = opts.freezeAt !== undefined ? target : approach(gridOn, target, 0.25, dt)
    pu.uGridOn.value = gridOn
    pu.uGridY.value = gridY
    pu.uCrest.value = crest
    pu.uConv.value = conv
    const leadEv = events[events.length - 1]
    if (leadEv) { const [lx, ly] = projectGrid(leadEv.gx, leadEv.gz, 0, cam, vw); pu.uLead.value = [lx, ly + gridY] }

    // ---- the night (§4.11): each event = a beam rising from its grid point to its label; the labels
    //      sit on ONE log line under the H2; the crest carries the hour.
    const darks: { r: Rect; f: number }[] = []
    const fu = fieldProgram.uniforms
    const evB = new Array(20).fill(0)
    const nightOn = nightNear && !officeFloor && gridOn > 0.5
    if ((frameNo & 1) === 0 || labelsDirty) {
      if (labelsDirty || !labelEls.length) { labelEls = Array.from(document.querySelectorAll<HTMLElement>('[data-ev]')); labelsDirty = false }
      const maxOn = portrait ? 3 : 5
      const onIdx = events.map((e, i) => ({ i, on: nightOn && crest >= (portrait ? e.gz : e.gx) + 0.012 })).filter((p) => p.on).map((p) => p.i).slice(-maxOn)
      const h2 = rect(q('#night-h'))
      const logY = (h2 ? h2.y1 : vh * 0.3) + (portrait ? 18 : 26)
      const placed: { el: HTMLElement; x: number; y: number; w: number; h: number; ex: number; ey: number }[] = []
      labelEls.forEach((el, i) => {
        const on = onIdx.includes(i)
        if (el.dataset.on !== String(on)) el.dataset.on = String(on)
        const e = events[i]
        if (!e || !on) return
        const [x, y] = projectGrid(e.gx, e.gz, 0, cam, vw)
        const w = el.offsetWidth, h = el.offsetHeight
        placed.push({ el, x: portrait ? margin : x - w / 2, y: logY, w, h, ex: x, ey: y + gridY })
      })
      if (portrait) placed.forEach((p, k) => { p.y = logY + k * (p.h + 6) })
      else {
        // chronological left → right (placed is already in event order): perspective makes the screen x of
        // the events non-monotonic, so sorting by x put 05:05 before 03:40 (owner 09/11)
        for (let k = 0; k < placed.length; k++) {
          const p = placed[k]
          p.x = Math.max(margin, Math.min(p.x, vw - margin - p.w))
          if (k > 0) p.x = Math.max(p.x, placed[k - 1].x + placed[k - 1].w + 10)
        }
        const over = placed.length ? placed[placed.length - 1].x + placed[placed.length - 1].w - (vw - margin) : 0
        if (over > 0) for (const p of placed) p.x -= over
      }
      placed.forEach((p, k) => {
        p.el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`
        if (k < 5) evB.splice(k * 4, 4, p.ex, p.ey, p.y + p.h + 14, 1)
      })
      fu.uEvB.value = evB
      const ce = crestEl()
      if (ce) {
        const show = nightOn && crest > 0 && crest < 1
        ce.dataset.on = String(show)
        if (show) {
          const hours = 18 + clamp01(crest) * 14
          const hh = Math.floor(hours) % 24, mm = Math.floor((hours % 1) * 60)
          ce.textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
          const [cx, cy] = portrait ? projectGrid(0.5, clamp01(crest), 0, cam, vw) : projectGrid(clamp01(crest), 0.15, 0, cam, vw)
          const x = portrait ? margin : Math.max(margin, Math.min(cx - 22, vw - margin - 50))
          ce.style.transform = `translate3d(${x.toFixed(1)}px, ${(cy + gridY + (portrait ? -30 : 16)).toFixed(1)}px, 0)`
        }
      }
    }
    const posterMode = document.documentElement.classList.contains('poster-mode')
    if (!posterMode) {
      for (const el of labelEls) if (el.dataset.on === 'true') { const r = rect(el); if (r) darks.push({ r: { x0: r.x0 - 12, y0: r.y0 - 12, x1: r.x1 + 12, y1: r.y1 + 12 }, f: 6 }) }
      const ce = crestEl()
      if (ce?.dataset.on === 'true') { const r = rect(ce); if (r) darks.push({ r: { x0: r.x0 - 8, y0: r.y0 - 8, x1: r.x1 + 8, y1: r.y1 + 8 }, f: 6 }) }
    }

    // ---- titles and labels stay in the dark (rule 3): box + f px (data-dark="16" for small text)
    for (const el of document.querySelectorAll<HTMLElement>('[data-dark]')) {
      // v4.8: a faded or hidden element keeps its box (the scroll hint at opacity 0, the "you" title after it
      // leaves): its dark box would cut an empty hole in the light. checkVisibility: Safari 17.4+ / Chrome 121+;
      // without it the box stays (the old behaviour).
      if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue
      const r = rect(el)
      const fd = Number(el.dataset.dark) || 48
      if (r && r.y1 > -96 && r.y0 < vh + 96 && r.x1 > r.x0) darks.push({ r: { x0: r.x0 - fd, y0: r.y0 - fd, x1: r.x1 + fd, y1: r.y1 + fd }, f: fd })
    }
    darks.sort((a, b) => b.f - a.f)
    const cu = compProgram.uniforms
    const dark = new Array(64).fill(0)
    const darkF = new Array(16).fill(1)
    const nDark = Math.min(16, darks.length)
    for (let k = 0; k < nDark; k++) { const d = darks[k].r; dark.splice(k * 4, 4, d.x0, d.y0, d.x1, d.y1); darkF[k] = darks[k].f }
    cu.uDark.value = dark; cu.uDarkF.value = darkF
    cu.uDarkN.value = nDark

    // ---- horizon + one beam per valid field; in the final the beams climb to the base of the logo
    fu.uTime.value = time
    let hz: HTMLElement | null = null
    for (const el of document.querySelectorAll<HTMLElement>('[data-horizon]')) { if (visible(rect(el), 40)) { hz = el; break } }
    const logoBox = rect(q('[data-final-logo]'))
    fu.uBeamTo.value = [0, 0, 0, 0]
    if (hz) {
      const r = hz.getBoundingClientRect()
      const state = bus.beams[hz.dataset.horizon ?? ''] ?? []
      const toLogo = hz.dataset.horizon === 'final' && !!logoBox
      const maxH = toLogo && logoBox ? Math.max(40, r.top - logoBox.y1) : Number(hz.dataset.beam ?? 120)
      for (let i = 0; i < 5; i++) {
        const tgt = state[i] ? maxH : 0
        beams[i] = approach(beams[i], tgt, toLogo ? 0.06 : 0.12, dt)
        if (Math.abs(beams[i] - tgt) > 0.5) ask(420)
      }
      // brief-v4.4 §8.1 ground-hz: the line draws from its centre to its ends with the scroll (ign .0–.5); its fringe is
      // gone (the orla takes its place, §9.5). T2: while nightShift carries the form's line down to the night, it hands
      // over to the grid BEFORE it reaches the night title's dark box (v4.9: it landed at 0.3 vh behind the H2's second
      // line and left a slab on the right, after/webkit-1440-night-07)
      const ign = clamp01((vh * 0.98 - r.top) / (vh * 0.36))
      bus.ign[hz.dataset.horizon === 'final' ? 'final-hz' : 'form-hz'] = ign
      let hw = 1
      // …and before the night's desks come up under it (their dark boxes cut it into dashes, v4.9 webkit-1440-night-03):
      // gone by the time the night's top reaches 0.6 vh, i.e. while only the grid is there to take over
      if (hz.style.transform) {
        const nh = rect(q('#night-h'))
        // v54 (proof of the beams, 1440 and 390: with the night's title still BELOW the line, r.top < limit put hw at 0, so
        // the form's line and its beams were never drawn while the night was near, i.e. whenever the form was read): the
        // title coming up from below takes the line away only as it gets close; once above, the old hand-over rule
        if (nh && nh.y0 > r.top) hw = smooth(24, 144, nh.y0 - r.top)
        else if (nh) { const limit = nh.y1 + 56; hw = smooth(limit, limit + 120, r.top) }
        if (nightR) hw = Math.min(hw, smooth(vh * 0.6, vh * 0.95, nightR.y0))
      }
      fu.uHz.value = [r.left, r.right, r.top + r.height / 2, hw]
      fu.uHzX.value = [Math.min(1, ign / 0.5), 0, 0, 0]
      fu.uBeam.value = beams.slice()
      if (toLogo && logoBox) fu.uBeamTo.value = [0, (logoBox.x0 + logoBox.x1) / 2, (logoBox.x1 - logoBox.x0) / 2, 1]
    } else fu.uHz.value = [0, 0, 0, 0]

    // ---- the phone (§4.4): the second network, its vertex at the base of the phone
    const phone = rect(q('[data-phone]'))
    const stage = rect(q('[data-you-stage]'))
    const youOn = visible(youR) && !!phone && !!stage
    // the phone's network leaves with the phone (brief-v4.3 §4.4: it hands over to the FAQ, no triangle over the questions)
    const youGone = youR ? clamp01((vh - youR.y1) / (vh * 0.35)) : 1
    phoneLit = approach(phoneLit, youOn ? (0.35 + 0.65 * bus.phone.lit) * (1 - youGone) : 0, youGone > 0 ? 0.3 : 0.08, dt)
    let phoneF: NetF | null = null
    let travelAt: ((e: number) => Pt) | null = null, travelT = 0
    if (youOn && phone && stage) {
      phoneF = phoneNetFrame(phone, Math.min(stage.y1, vh), vw)
      const tr = bus.sim.travel
      if (tr >= 0 && bus.sim.agent >= 0) {
        const brain = [6, 6, 8, 8, 7, 7][bus.sim.agent]
        const A = netToScreen(NODES[bus.sim.agent], phoneF), B = netToScreen(NODES[brain], phoneF), C = netToScreen(NODES[9], phoneF)
        // brief-v4.4 §3.1: the dot that runs down the wire after a yes is a packet now (phone vertex → brain → agent)
        travelAt = (e) => (e < 0.5 ? [mix(C[0], B[0], e * 2), mix(C[1], B[1], e * 2)] : [mix(B[0], A[0], e * 2 - 1), mix(B[1], A[1], e * 2 - 1)])
        travelT = 1 - clamp01(tr)
      }
      // brief-v4.5 §9.2: the six names under their nodes (1440); at 390 only the one whose turn it is, centred under the base
      const names = q<HTMLElement>('[data-net-names]')
      if (names) {
        const kids = names.children
        for (let i = 0; i < kids.length && i < 6; i++) {
          const [ax, ay] = netToScreen(NODES[i], phoneF)
          const x = portrait ? phoneF.cx : ax
          const kid = kids[i] as HTMLElement
          kid.style.transform = `translate3d(${(x - stage.x0).toFixed(1)}px, ${(ay - stage.y0 + 14).toFixed(1)}px, 0) translateX(-50%)`
          // v54 (jury v53, 390 s07: "Your follow-up / Asking you" ran across the card's text while the stage came in,
          // because the network's base follows min(stage foot, screen foot)): a name whose top is not below the phone hides
          const clash = String(ay + 14 < phone.y1 + 8)
          if (kid.dataset.clash !== clash) kid.dataset.clash = clash
        }
      }
    }

    // ---- the rise (one at a time): from the phone after a yes, from the hero vertex on the first scroll
    const riseT = bus.rise.at < 0 ? -1 : (now - bus.rise.at) / 850
    if (riseT >= 0 && riseT <= 1) {
      ask(472)
      let rx = 0, ry = 0
      if (bus.rise.src === 'phone' && phone) { rx = (phone.x0 + phone.x1) / 2; ry = phone.y0 }
      else {
        const ang = fall * 1.35, persp = 1 / (1 + 1.55 * Math.sin(ang) * 0.55)
        rx = f.cx; ry = heroTop * 0.6 + f.baseY - 1.55 * Math.cos(ang) * f.unit * persp
      }
      fu.uRise.value = [rx, ry, 1 - Math.pow(1 - riseT, 2), 1]
    } else fu.uRise.value = [0, 0, 0, 0]

    // ---- T3 "the dawn" (brief-v4.2 §5.3): the seam between the night and the office, by scroll
    const seam = officeR ? clamp01((vh - officeR.y0) / (vh * 1.22)) : 0
    const landK = OFFICE_DESKS.map((_, k) => { const i = DESK_OF_FIG.indexOf(k); return smooth(flyEnd(i) - 0.04, flyEnd(i) + 0.08, seam) })
    // the horizon at the back of the night's grid lights again, hot → core (the sunset of T2 coming back), and
    // leaves with the night; only while no DOM horizon is on screen (?dawn=0: off, the owner judges by seeing)
    if (!hz && nightR && officeR && !dawnOff) {
      const np = clamp01(-nightR.y0 / Math.max(1, nightR.y1 - nightR.y0 - vh))
      const dawn = smooth(0.8, 0.97, np) * (1 - smooth(0.2, 0.62, seam))
      if (dawn > 0.002) {
        // v4.9: the office's top edge = the night's floor; it opens from the centre (never on in one frame)
        fu.uHz.value = [-200, vw + 200, officeR.y0 - 1, Math.min(1, dawn * 3)]
        fu.uHzX.value = [Math.min(1, dawn * 2), 0, 0, 0]
        fu.uBeam.value = [0, 0, 0, 0, 0]
      }
    }

    // ---- the office (§4.3): the render drawn by the engine, no frame; desks light by day
    const office = bus.office
    const quadEl = q('[data-office-quad]')
    const oq = rect(quadEl)
    const nearOffice = !!officeR && officeR.y0 < vh * 2 && officeR.y1 > -vh
    if (nearOffice && officeState === 'none') loadOffice()
    else if (!nearOffice && officeR && (officeR.y0 > vh * 3 || officeR.y1 < -vh * 2) && officeState !== 'none') dropOffice()
    const pools = new Array(24).fill(0)
    if (officeState === 'ready' && oq && office.on > 0 && visible(oq)) {
      const img = portrait ? OFFICE_IMG.portrait : OFFICE_IMG.master
      // v4.3 camera: while the desks go live (p .05 → .76) it moves in (2× at 1440, 2.2× on a phone: about one
      // video pixel per screen pixel, so the figures read and move) and pans to the desk that lit last; it pulls
      // back for the three exchanges, whose two desks can sit far apart. The still/loop is never upscaled > ~1:1.
      const R = oq
      // v4.6: a little less zoom (1.7 / 1.9): two or three working desks share the window instead of one lit desk
      const zMax = portrait ? 1.9 : 1.7
      const p = office.dolly
      const inward = smooth(0.05, 0.2, p) * (1 - smooth(0.7, 0.78, p))
      // v4.6 (owner: "one lit desk in a murky block"): the camera frames ALL the working desks, not the last one: it
      // centres on their bounding box and zooms only as far as keeps every one of them inside the window (a margin
      // of .2 uv), so one desk = the close-up, three desks = three figures moving side by side
      const base = coverMap(R.x1 - R.x0, R.y1 - R.y0, img.w, img.h)
      // brief-v4.3 §7.1: the camera frames only the lit desks the picture can show inside its oval (≥ 10 % margin at
      // the cover framing): Ad manager, Social and Analyst sit on or past the render's right edge, and chasing them
      // dragged the window to the edge where the oval dissolves
      const inPic = (d: (typeof OFFICE_DESKS)[number]) => { const [x, y] = portrait ? d.portrait : d.master; return inOval((x / img.w - base.ou) / base.su, (y / img.h - base.ov) / base.sv, OVAL_IN) }
      const litUV = OFFICE_DESKS.filter((d, k) => office.litAt[k] >= 0 && inPic(d)).map((d) => { const [x, y] = portrait ? d.portrait : d.master; return [x / img.w, y / img.h] })
      let fu0 = 0.5, fv0 = 0.5, zFit = zMax
      if (litUV.length) {
        const us = litUV.map((c) => c[0]), vs = litUV.map((c) => c[1])
        const u0 = Math.min(...us), u1 = Math.max(...us), v0 = Math.min(...vs), v1 = Math.max(...vs)
        fu0 = (u0 + u1) / 2; fv0 = (v0 + v1) / 2
        zFit = Math.max(1, Math.min(zMax, base.su / (u1 - u0 + 0.35), base.sv / (v1 - v0 + 0.35))) // v5.0: margin .35 keeps the framed desks out of the grain edge
      }
      const zT = 1 + (zFit - 1) * inward
      cam3.u = approach(cam3.u, fu0, 0.05, dt); cam3.v = approach(cam3.v, fv0, 0.05, dt)
      cam3.z = approach(cam3.z, zT, 0.06, dt)
      if (Math.abs(cam3.z - zT) > 0.002 || Math.abs(cam3.u - fu0) > 0.001 || Math.abs(cam3.v - fv0) > 0.001) ask(535)
      const cm = zoomMap(base, cam3.z, cam3.u, cam3.v)
      office.cm = cm
      cu.uOffR.value = [R.x0, R.y0, R.x1, R.y1]
      cu.uOffM.value = [cm.ou, cm.ov, cm.su, cm.sv]
      cu.uOffOn.value = office.offOn
      cu.uDayP.value = office.day
      cu.uDeskK.value = (img.h / img.w) * 1.6
      // v4.6: a wider reveal (the owner could not see the figures move): ~1.3× the v4.5 radius
      const radius = (portrait ? 0.2 : 0.11) / Math.sqrt(cam3.z)
      const desk = new Array(18).fill(0)
      OFFICE_DESKS.forEach((d, k) => {
        const at = office.litAt[k]
        const rv = at < 0 ? 0 : easeOut((now - at) / 500)
        if (at >= 0 && now - at < 520) ask(549)
        const [ix, iy] = portrait ? d.portrait : d.master
        const u = ix / img.w, v = iy / img.h
        // T3: the desk where a figure's dots landed already glows (an ember, 42 % of the reveal) until its day
        desk.splice(k * 3, 3, u, v, Math.max(rv, 0.42 * landK[k]) * radius)
        const lu = (u - cm.ou) / cm.su, lv = (v - cm.ov) / cm.sv
        const sx = R.x0 + lu * (R.x1 - R.x0), syy = R.y0 + lv * (R.y1 - R.y0)
        // brief-v4.3 §7.1 (verified 09/11): the orphan halos were THESE pools, not the uDesk reveal. The composite
        // already draws the model (and the reveal) only inside the oval (edge × uOffOn > Bayer), but the pool lives
        // in the light buffer and was cut by the camera RECTANGLE, whose corners are outside the oval. Now a desk
        // outside the oval has no pool and no reveal (radius 0) at all.
        const inside = inOval(lu, lv, OVAL_IN)
        if (!inside) desk[k * 3 + 2] = 0
        if (rv > 0 && inside) {
          // v5.0: the desks now light up to OVAL_IN; near the oval's edge the pool shrinks (to 35 %) so its light
          // never spills onto the bare ground outside the model (the orphan halo of brief-v4.3 §7.1)
          const se = Math.pow(Math.pow(Math.abs(lu - 0.5) * 2, 3.2) + Math.pow(Math.abs(lv - 0.5) * 2, 3.2), 1 / 3.2)
          const near = 1 - 0.65 * smooth(0.45, OVAL_IN, se)
          pools.splice(k * 4, 4, sx, syy, (portrait ? 70 : 150) * rv * near, 1 - office.day * 0.6)
        }
      })
      cu.uDesk.value = desk
    } else { cu.uOffOn.value = 0; office.cm = null }
    playLoops((cu.uOffOn.value as number) > 0 && !document.hidden, cu.uDayP.value as number)
    fu.uPool.value = pools

    // the screen point of an office desk under the current camera window (the engine's, or the plain cover map
    // before the model is drawn, i.e. the same picture the model will fade in with)
    const deskAt = (k: number, R: Rect): [number, number] => {
      const img = portrait ? OFFICE_IMG.portrait : OFFICE_IMG.master
      const cm = office.cm ?? zoomMap(coverMap(R.x1 - R.x0, R.y1 - R.y0, img.w, img.h), cam3.z, cam3.u, cam3.v)
      const [ix, iy] = portrait ? OFFICE_DESKS[k].portrait : OFFICE_DESKS[k].master
      return [R.x0 + ((ix / img.w - cm.ou) / cm.su) * (R.x1 - R.x0), R.y0 + ((iy / img.h - cm.ov) / cm.sv) * (R.y1 - R.y0)]
    }
    // T3: the figures come apart (nightShift fades them) and their dots fly to the desks, scrubbed by the scroll:
    // early on they still ride with the figures, then leave them for the desks, arcing upward on the way
    const fly = new Array(96).fill(0)
    if (seam > 0 && seam < 1 && oq && nightR && nightR.y1 > -vh) {
      if (labelsDirty || figEls.length !== 6) figEls = Array.from(document.querySelectorAll<HTMLElement>('[data-desk] .fig'))
      figEls.forEach((el, i) => {
        if (i > 5) return
        const fr = el.getBoundingClientRect()
        const [dx, dy] = deskAt(DESK_OF_FIG[i], oq)
        FIG_DOTS.forEach(([fx, fy], j) => {
          const t = clamp01((seam - (FLY_A + i * FLY_STEP + j * FLY_DOT)) / FLY_LEN)
          if (t <= 0) return
          const e = t * t * (3 - 2 * t)
          const x = mix(fr.left + fx * fr.width, dx + (j - 1.5) * 4, e)
          const y = mix(fr.top + fy * fr.height, dy + (j & 1) * 3, e) - Math.sin(Math.PI * e) * vh * 0.1
          fly.splice((i * 4 + j) * 4, 4, x, y, 8 + 16 * Math.sin(Math.PI * e), 1.15 * (1 - smooth(0.86, 1, seam)))
        })
      })
    }
    fu.uFly.value = fly
    const flyOn = fly.some((v, i) => (i & 3) === 3 && v > 0)
    fu.uFlyOn.value = flyOn ? 1 : 0
    // ---- brief-v4.4 §3: the packets (uPkt, channel G) and the fragments in flight (uFrag), one path for all. The T4 of
    // v4.2 (a dot that left through the top while another came back from below) is gone: the order is ONE packet,
    // always on screen (§5).
    const pkt = new Array(48).fill(0), frag = new Array(96).fill(0)
    const pr = portrait ? 5 : 7
    const inView = (p: Pt): Pt => [Math.min(vw - 8, Math.max(8, p[0])), Math.min(vh - 8, Math.max(8, p[1]))]
    let slot = 0
    if (travelAt) writePacket(pkt, slot++, travelAt, travelT, pr, 1)
    const screenEl = q<HTMLElement>('[data-phone] .screen')
    const s4 = bus.c4
    if (s4 > 0 && s4 < 1 && oq && screenEl) {
      // C4 (§5.3): P0 the follow-up desk (rides up with the model), P1 fixed on the screen, P2 the top of the phone's
      // screen (rides up with the yes): the packet hangs in the dark and runs down; it is absorbed as the screen lights
      const sc = screenEl.getBoundingClientRect()
      const [dx, dy] = deskAt(1, oq)
      const P0: Pt = [dx, dy - 6], P1: Pt = portrait ? [vw * 0.72, vh * 0.5] : [vw * 0.62, vh * 0.52], P2: Pt = [(sc.left + sc.right) / 2, sc.top + 2]
      const at = (e: number) => inView(bez(P0, P1, P2, e))
      writePacket(pkt, slot++, at, (s4 - 0.1) / 0.7, pr, smooth(0, 0.03, s4) * (1 - smooth(0.8, 0.92, s4)))
      if (pullOn && s4 > 0.1 && s4 < 0.4) {
        const pc = at(ease(0.1 / 0.7)) // where it crosses the model's edge
        for (let i = 0; i < 7; i++) {
          const born = 0.12 + i * 0.012
          if (s4 < born) continue
          const k = clamp01((s4 - born) / 0.08) // they follow the packet for .08 of s…
          const head = at(ease((Math.min(s4, born + 0.08) - 0.1) / 0.7 - 0.025 * (i + 1)))
          const fall = Math.max(0, s4 - born - 0.08) // …then fall, going out in 3 levels
          const jx = Math.sin(i * 2.4) * 10, jy = Math.cos(i * 1.7) * 6
          const steps = Math.min(3, Math.floor(fall / 0.035))
          frag.splice(i * 4, 4, mix(pc[0] + jx, head[0] + jx * 0.6, k), mix(pc[1] + jy, head[1] + jy, k) + fall * vh * 2.2, 3, steps >= 3 ? 0 : 0.9 * (1 - steps / 3))
        }
      }
    }
    // brief-v4.6 §4.1 / §4.6: the testimonials. The voice comes down from the FAQ's orla (the mean of its mint fragments
    // 11 and 12) to the 1st node, P1 on the wire's line (it falls and turns into the wire); at 390 the rail's gesture
    const tb = bus.testi
    if (tb.n1 && tb.b > tb.a) {
      const te = (sy - tb.a) / (tb.b - tb.a)
      const o = te > 0 && te < 1 ? orlaTargets('faq') : null
      if (o) {
        const P0: Pt = [(o[11][0] + o[12][0]) / 2, (o[11][1] + o[12][1]) / 2], P2: Pt = [tb.n1[0], tb.n1[1] - sy]
        const P1: Pt = [P2[0], (P0[1] + P2[1]) / 2] // the last stretch runs down the wire's line: it enters the wire
        writePacket(pkt, slot++, (e) => bez(P0, P1, P2, e), te, pr, 1)
      }
    }
    if (tb.rail) {
      const { a, b, t } = tb.rail
      writePacket(pkt, slot++, (e) => [a[0] + (b[0] - a[0]) * e, a[1] - sy + (b[1] - a[1]) * e], t, pr, 1)
    }
    slot = transit.write(pkt, now, slot) // the night: desks → the bed (timed, §4.3); the testimonials' node → node
    const c5 = bus.c5
    if (c5 > 0 && c5 < 1 && screenEl) {
      // C5 (§6.2): the phone comes apart where it stands; 24 fragments of its screen fan out downward to the FAQ's orla
      const targets = orlaTargets('faq')
      if (targets) {
        const sc = screenEl.getBoundingClientRect()
        const pcx = (sc.left + sc.right) / 2
        const release = smooth(0, 0.35, c5)
        for (let i = 0; i < 24; i++) {
          // a 4 × 6 grid over the screen, each point shaken inside its cell (a dot matrix would read as a pattern)
          const P0: Pt = [sc.left + ((i % 4) + 0.5 + Math.sin(i * 12.9898) * 0.3) * sc.width / 4, sc.top + (Math.floor(i / 4) + 0.5 + Math.cos(i * 78.233) * 0.3) * sc.height / 6]
          const P2: Pt = [targets[i][0], Math.min(targets[i][1], vh - 14)] // v5.0: never lands under the fold
          const P1: Pt = [(P0[0] + P2[0]) / 2 + (Math.sign(P0[0] - pcx) || 1) * vh * 0.1, (P0[1] + P2[1]) / 2]
          const t = (c5 - (0.2 + 0.2 * (i / 23))) / 0.35
          const [x, y] = bez(P0, P1, P2, ease(t))
          const energy = i === 11 || i === 12 // the last dose of the yes: the two that rhyme with the mountain's foot
          const w = t >= 1 ? 0 : (energy ? -1 : (i * 7) % 3 === 0 ? 1.05 : 0.75) * release
          frag.splice(i * 4, 4, x, y, portrait ? 3 : 4, w)
        }
      }
    }
    const pktOn = pkt.some((v, i) => (i & 3) === 3 && v > 0)
    const fragOn = frag.some((v, i) => (i & 3) === 3 && v !== 0)
    fu.uPkt.value = pkt; fu.uPktOn.value = pktOn ? 1 : 0
    fu.uFrag.value = frag; fu.uFragOn.value = fragOn ? 1 : 0
    if (transit.busy()) ask(659)
    if (counting) {
      const wx = window as Window & { __pkts?: number; __c4?: number[] | null }
      wx.__pkts = [0, 1, 2].filter((k) => pkt[k * 16 + 3] > 0).length
      // the C4 head (slot 0 or 1, after a travel): the probe proves it is on screen in every frame of the seam
      // v5.0: the C5 fragments still alive (x, y, w) so the probe proves they land inside the screen
      ;(wx as Window & { __frag?: number[][] }).__frag = c5 > 0 && c5 < 1 ? Array.from({ length: 24 }, (_, i) => frag.slice(i * 4, i * 4 + 4)).filter((f) => f[3] !== 0).map((f) => [Math.round(f[0]), Math.round(f[1])]) : []
      ;(wx as Window & { __busc5?: number }).__busc5 = c5
      wx.__c4 = s4 > 0 && s4 < 1 ? pkt.slice((travelAt ? 1 : 0) * 16, (travelAt ? 1 : 0) * 16 + 4).map((v) => Math.round(v)) : null
    }

    // ---- ?btn=field: the light gathers around the action and answers it (owner, 09/11)
    const actR = new Array(8).fill(0), actP = new Array(8).fill(0)
    fu.uActG.value = 1
    {
      let k = 0
      for (const el of document.querySelectorAll<HTMLElement>('[data-act]')) {
        if (k >= 2) break
        const r = rect(el)
        if (!r || !visible(r, -20) || r.x1 - r.x0 < 4) continue
        // v4.9: a hidden action (the phone of the yes after it comes apart) keeps its box: no light around nothing
        if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue
        const hot = el.matches(':hover, :focus-visible')
        const ready = el.dataset.actReady === 'true'
        const fill = el.dataset.act === 'approve' ? bus.sim.fill : 0
        const tgt = hot ? 1 : ready ? 0.85 : el.dataset.act === 'approve' ? 0.25 + 0.75 * fill : 0.55
        const cur = approach(act.get(el) ?? 0, tgt, 0.05, dt)
        act.set(el, cur)
        if (Math.abs(cur - tgt) > 0.01) ask(684)
        const reach = portrait ? 4 : el.dataset.act === 'approve' ? 70 - 34 * fill : 40 + 34 * cur
        actR.splice(k * 4, 4, r.x0, r.y0, r.x1, r.y1)
        actP.splice(k * 4, 4, reach, cur, hot ? 1.8 : ready ? 1.3 : 0.6, 1)
        k++
      }
    }
    fu.uAct.value = actR; fu.uActP.value = actP

    // ---- run only while a light scene is on screen
    const heroOn = !!hero && hero.y1 > 0 && fall < 1
    const gridVisible = gridOn > 0.01
    const active = flyOn || pktOn || fragOn || heroOn || formField || gridVisible || !!hz || (youOn && phoneLit > 0.01) || animating || (cu.uOffOn.value as number) > 0
    if (!active) {
      if (!idleCleared) { renderer.bindFramebuffer(); gl.clear(gl.COLOR_BUFFER_BIT); idleCleared = true }
      // nothing of the engine on screen (the hero is DOM since v4.5): a clear canvas is already the right picture
      if (!started) { started = true; document.documentElement.classList.add('gl-on') }
      return false
    }
    idleCleared = false

    // v51 (reload probe, webkit 390: one EMPTY frame at ~1.2 s = the 60th drawn frame): the scale step resizes the
    // canvas, and a resize clears it; done after the draw, the browser composited a blank canvas. It runs BEFORE the draw now.
    // brief-v4.3 §9.2: p95 of the frame time over 60 consecutive drawn frames > 24 ms → the render scale drops one
    // step (× .75), once, never back (a weak GPU, SwiftShader). Frames after a pause (dt ≥ 100) do not count.
    if (!scaled && dt < 99) {
      dts.push(dt)
      if (dts.length >= 60) {
        const sorted = dts.slice().sort((a, b) => a - b)
        if (sorted[Math.floor(sorted.length * 0.95)] > 24) {
          scaled = true
          renderer.dpr = dpr * 0.75
          compProgram.uniforms.uDpr.value = renderer.dpr
          // the same step coarsens the light buffer (2 → 3 px cells): measured in SwiftShader at 1440, the light pass
          // is the cost (cell 4 doubled the hero's fps; the canvas scale alone did not move it)
          if (opts.cell === undefined) { cell = 3; pointProgram.uniforms.uCell.value = cell; fieldProgram.uniforms.uCell.value = cell; compProgram.uniforms.uCell.value = cell }
          resize()
          document.documentElement.dataset.glScale = '0.75'
        }
        dts.length = 0
      }
    }
    renderer.render({ scene: fieldMesh, target: light, clear: true })
    renderer.render({ scene: points, target: light, clear: false })
    if (phoneF && phoneLit > 0.01) {
      pu.uNetF.value = [phoneF.cx, phoneF.baseY, phoneF.unit]
      pu.uNetS.value = phoneF.sx ?? 1
      pu.uFall.value = 0; pu.uGridOn.value = 0
      pu.uHot.value = bus.sim.agent; pu.uDim.value = 1; pu.uNetI.value = phoneLit
      renderer.render({ scene: points, target: light, clear: false })
    }
    compProgram.uniforms.tLight.value = light.texture
    renderer.render({ scene: compMesh, clear: true })
    frameNo++

    // automatic quality drop: average frame > 20 ms for 1 s → 60 % of the points, ONCE (v54: it used to halve twice, to
    // 25 %). The buffer is in random order (layout.ts buildPoints), so the drop thins every wire and node evenly; the
    // light of each point is raised by √(total / drawn) so the network keeps its weight (uThin)
    avgDt = avgDt * 0.95 + dt * 0.05
    if (avgDt > 20 && drawCount > total * 0.75) {
      if (slowSince < 0) slowSince = now
      else if (now - slowSince > 1000) { drawCount = Math.round(drawCount * 0.6); geometry.setDrawRange(0, drawCount); slowSince = -1; document.documentElement.dataset.glQuality = 'low' }
    } else slowSince = -1

    // brief-v4.5 §4.4: gl-on after 2 drawn frames (main.tsx reveals the canvas only then, in one frame)
    if (!started && frameNo >= 2) { started = true; document.documentElement.classList.add('gl-on') }
    // a scene that keeps moving on its own (breathing vertex, flowing wires) asks for frames
    // office, FAQ and final also breathe while the page is still (owner 09/11: everything alive)
    if (counting) (window as Window & { __frames?: number }).__frames = frameNo
    // dev / ?probe: which scene keeps the loop drawing (the rest probe names the culprit instead of guessing)
    if (counting) (window as Window & { __why?: string }).__why = Object.entries({ hz: !!hz, formField, you: youOn && phoneLit > 0.01, grid: gridVisible, office: (cu.uOffOn.value as number) > 0, animating, hero: heroOn, fly: flyOn, pkt: pktOn, frag: fragOn, floor: officeFloor }).filter(([, v]) => v).map(([k]) => k).join(',') + (animBy.length ? ` @${animBy.join('/')}` : '')
    // brief-v4.3 §9.1: the page at rest does not draw. A scene on screen keeps the loop only for 1.5 s after the
    // last scroll / resize / pointer move; after that only a deadline (a transition, a reveal, a lerp still
    // settling) asks for frames. The office loop wakes the ticker itself on each NEW video frame (rVFC), so the
    // model keeps playing at the video's rate (24 fps) while it is on screen, and nothing else is drawn.
    const live = heroOn || formField || (youOn && phoneLit > 0.01) || gridVisible || (cu.uOffOn.value as number) > 0 || officeFloor
    return opts.freezeAt === undefined && (animating || (live && now - lastInput < 1500))
  }

  const onLost = (e: Event) => {
    e.preventDefault()
    document.documentElement.classList.remove('gl-on', 'gl-show')
    ticker.remove(frame)
  }
  const onRestored = () => { // one retry: rebuild the GPU objects on the new context
    officeState = 'none'; officeGen++
    resize(); started = false; ticker.add(frame)
  }
  canvas.addEventListener('webglcontextlost', onLost)
  canvas.addEventListener('webglcontextrestored', onRestored, { once: true })
  const onResize = () => resize()
  addEventListener('resize', onResize)

  resize()
  ticker.add(frame)

  return () => {
    ticker.remove(frame)
    removeEventListener('resize', onResize)
    removeEventListener('pointermove', onPtr)
    removeEventListener('bu-morph', onIntro)
    removeEventListener('scroll', onInput)
    removeEventListener('resize', onInput)
    document.removeEventListener('visibilitychange', onHidden)
    canvas.removeEventListener('webglcontextlost', onLost)
    canvas.removeEventListener('webglcontextrestored', onRestored)
    dropOffice()
    geometry?.remove()
    pointProgram.remove(); fieldProgram.remove(); compProgram.remove(); quad.remove()
    document.documentElement.classList.remove('gl-on', 'gl-show')
  }
}
