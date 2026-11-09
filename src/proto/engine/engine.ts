import { Geometry, Mesh, Program, RenderTarget, Renderer, Texture, Triangle } from 'ogl'
import { bus } from '../bus'
import { night } from '../content'
import {
  NODES, OFFICE_DESKS, OFFICE_IMG, buildPoints, coverMap, zoomMap, gridCam, isPortrait, netFrame, netToScreen,
  phoneNetFrame, projectGrid, type GridCam, type NetF,
} from '../layout'
import { ticker } from '../ticker'
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
const dawnOff = typeof location !== 'undefined' && new URLSearchParams(location.search).get('dawn') === '0'

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
  gl.clearColor(0, 0, 0, 0)
  const cell = opts.cell ?? 2

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
      uNetS: { value: 1 }, uDim: { value: 0 }, uNetI: { value: 1 }, uForm: { value: [0, 0, 1, 1] }, uFormMix: { value: 0 }, uPtr: { value: [-999, -999, 0] },
    },
  })
  pointProgram.setBlendFunc(gl.ONE, gl.ONE)

  const fieldProgram = new Program(gl, {
    vertex: QUAD_VS, fragment: FIELD_FS, depthTest: false, depthWrite: false,
    uniforms: {
      uBuf: { value: [1, 1] }, uCell: { value: cell }, uTime: { value: 0 }, uHz: { value: [0, 0, 0, 0] }, uBeam: { value: [0, 0, 0, 0, 0] },
      uBeamTo: { value: [0, 0, 0, 0] }, uRise: { value: [0, 0, 0, 0] }, uTri: { value: [0, 0, 0, 0] }, uTriL: { value: [0, 0, 0, 0] },
      uFDot: { value: new Array(15).fill(0) }, uAct: { value: new Array(8).fill(0) }, uActP: { value: new Array(8).fill(0) },
      uActG: { value: 1 }, uTrav: { value: [0, 0, 0] }, uEvB: { value: new Array(20).fill(0) }, uPool: { value: new Array(24).fill(0) },
      uFly: { value: new Array(96).fill(0) }, uFlyOn: { value: 0 },
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
      uOffLum: { value: 0.52 }, uDesk: { value: new Array(18).fill(0) }, uDeskK: { value: 1.4 }, uDayP: { value: 0 },
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
  let started = false
  let heroRiseDone = false
  const act = new WeakMap<Element, number>()
  // the pointer, for the form's field of points (owner 09/11 item 4); touch drifts instead of hovering
  const ptr = { x: -999, y: -999, tx: -999, ty: -999, s: 0, at: -1e9 }
  const onPtr = (e: PointerEvent) => { ptr.tx = e.clientX; ptr.ty = e.clientY; ptr.at = performance.now(); if (ptr.x < -900) { ptr.x = ptr.tx; ptr.y = ptr.ty } ticker.wake() }
  addEventListener('pointermove', onPtr, { passive: true })
  const t0 = performance.now()
  const m = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--m')) || 20
  let margin = 20

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
    const faqR = rect(q('[data-scene="faq"]'))
    const visible = (r: Rect | null, mg = 0) => !!r && r.y1 > -mg && r.y0 < vh + mg
    let animating = false

    // ---- hero network and its fall (E2)
    const f = netFrame(vw, vh)
    const heroTop = hero ? hero.y0 : -sy
    const fall = smooth(0, vh * 0.7, -heroTop)
    const pu = pointProgram.uniforms
    pu.uTime.value = time
    pu.uNetF.value = [f.cx, heroTop + f.baseY, f.unit]
    pu.uFall.value = fall
    pu.uHot.value = bus.hotAgent
    pu.uNetS.value = 1; pu.uDim.value = 0; pu.uNetI.value = 1

    // ---- the first yes already in the hero (§4.10): the first scroll gesture sends a rise from the vertex
    if (!heroRiseDone && fall > 0.08 && opts.freezeAt === undefined) { heroRiseDone = true; bus.rise = { at: now, src: 'hero' } }

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
        if (Math.abs(beams[i] - tgt) > 0.5) animating = true
      }
      fu.uHz.value = [r.left, r.right, r.top + r.height / 2, 1]
      fu.uBeam.value = beams.slice()
      if (toLogo && logoBox) fu.uBeamTo.value = [0, (logoBox.x0 + logoBox.x1) / 2, (logoBox.x1 - logoBox.x0) / 2, 1]
    } else fu.uHz.value = [0, 0, 0, 0]

    // ---- the phone (§4.4): the second network, its vertex at the base of the phone
    const phone = rect(q('[data-phone]'))
    const stage = rect(q('[data-you-stage]'))
    const youOn = visible(youR) && !!phone && !!stage
    phoneLit = approach(phoneLit, youOn ? 0.35 + 0.65 * bus.phone.lit : 0, 0.08, dt)
    let phoneF: NetF | null = null
    if (youOn && phone && stage) {
      phoneF = phoneNetFrame(phone, Math.min(stage.y1, vh), vw)
      const tr = bus.sim.travel
      if (tr >= 0 && bus.sim.agent >= 0) {
        const brain = [6, 6, 8, 8, 7, 7][bus.sim.agent]
        const A = netToScreen(NODES[bus.sim.agent], phoneF), B = netToScreen(NODES[brain], phoneF), C = netToScreen(NODES[9], phoneF)
        const t = clamp01(tr)
        const [x, y] = t < 0.5 ? [mix(A[0], B[0], t * 2), mix(A[1], B[1], t * 2)] : [mix(B[0], C[0], t * 2 - 1), mix(B[1], C[1], t * 2 - 1)]
        fu.uTrav.value = [x, y, 1]
      } else fu.uTrav.value = [0, 0, 0]
      // the hot agent's name on its node (DOM)
      const tag = q<HTMLElement>('[data-net-tag]')
      if (tag && bus.sim.agent >= 0) {
        const [ax, ay] = netToScreen(NODES[bus.sim.agent], phoneF)
        tag.style.transform = `translate3d(${(ax - (stage.x0)).toFixed(1)}px, ${(ay - stage.y0 - 34).toFixed(1)}px, 0) translateX(-50%)`
      }
    } else fu.uTrav.value = [0, 0, 0]

    // ---- the rise (one at a time): from the phone after a yes, from the hero vertex on the first scroll
    const riseT = bus.rise.at < 0 ? -1 : (now - bus.rise.at) / 850
    if (riseT >= 0 && riseT <= 1) {
      animating = true
      let rx = 0, ry = 0
      if (bus.rise.src === 'phone' && phone) { rx = (phone.x0 + phone.x1) / 2; ry = phone.y0 }
      else {
        const ang = fall * 1.35, persp = 1 / (1 + 1.55 * Math.sin(ang) * 0.55)
        rx = f.cx; ry = heroTop + f.baseY - 1.55 * Math.cos(ang) * f.unit * persp
      }
      fu.uRise.value = [rx, ry, 1 - Math.pow(1 - riseT, 2), 1]
    } else fu.uRise.value = [0, 0, 0, 0]

    // ---- T3 "the dawn" (brief-v4.2 §5.3): the seam between the night and the office, by scroll
    const seam = officeR ? clamp01((vh - officeR.y0) / (vh * 1.22)) : 0
    const landK = OFFICE_DESKS.map((_, k) => { const i = DESK_OF_FIG.indexOf(k); return smooth(flyEnd(i) - 0.04, flyEnd(i) + 0.08, seam) })
    // the horizon at the back of the night's grid lights again, hot → core (the sunset of T2 coming back), and
    // leaves with the night; only while no DOM horizon is on screen (?dawn=0: off, the owner judges by seeing)
    if (!hz && nightR && !dawnOff) {
      const np = clamp01(-nightR.y0 / Math.max(1, nightR.y1 - nightR.y0 - vh))
      const dawn = smooth(0.8, 0.97, np) * (1 - smooth(0.2, 0.62, seam))
      if (dawn > 0.002) {
        const hy = cam.horizon + Math.min(0, nightR.y1 - vh) // T2 landed the form's horizon on this same line (0.3 vh)
        fu.uHz.value = [-200, vw + 200, hy, Math.min(1, dawn * 12) * (0.55 + 0.45 * dawn)]
        animating = true
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
      const litUV = OFFICE_DESKS.filter((_, k) => office.litAt[k] >= 0).map((d) => { const [x, y] = portrait ? d.portrait : d.master; return [x / img.w, y / img.h] })
      let fu0 = 0.5, fv0 = 0.5, zFit = zMax
      if (litUV.length) {
        const us = litUV.map((c) => c[0]), vs = litUV.map((c) => c[1])
        const u0 = Math.min(...us), u1 = Math.max(...us), v0 = Math.min(...vs), v1 = Math.max(...vs)
        fu0 = (u0 + u1) / 2; fv0 = (v0 + v1) / 2
        zFit = Math.max(1, Math.min(zMax, base.su / (u1 - u0 + 0.2), base.sv / (v1 - v0 + 0.2)))
      }
      const zT = 1 + (zFit - 1) * inward
      cam3.u = approach(cam3.u, fu0, 0.05, dt); cam3.v = approach(cam3.v, fv0, 0.05, dt)
      cam3.z = approach(cam3.z, zT, 0.06, dt)
      if (Math.abs(cam3.z - zT) > 0.002 || Math.abs(cam3.u - fu0) > 0.001 || Math.abs(cam3.v - fv0) > 0.001) animating = true
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
        if (at >= 0 && now - at < 520) animating = true
        const [ix, iy] = portrait ? d.portrait : d.master
        const u = ix / img.w, v = iy / img.h
        // T3: the desk where a figure's dots landed already glows (an ember, 42 % of the reveal) until its day
        desk.splice(k * 3, 3, u, v, Math.max(rv, 0.42 * landK[k]) * radius)
        const sx = R.x0 + ((u - cm.ou) / cm.su) * (R.x1 - R.x0), syy = R.y0 + ((v - cm.ov) / cm.sv) * (R.y1 - R.y0)
        // v4.6: a desk outside the camera window has no pool (it floated as a purple blob over the empty ground)
        if (rv > 0 && sx > R.x0 && sx < R.x1 && syy > R.y0 && syy < R.y1) {
          pools.splice(k * 4, 4, sx, syy, (portrait ? 70 : 150) * rv, 1 - office.day * 0.6)
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
      animating = true
    }
    fu.uFly.value = fly
    const flyOn = fly.some((v, i) => (i & 3) === 3 && v > 0)
    fu.uFlyOn.value = flyOn ? 1 : 0
    // T4 (brief-v4.2 §5.3): in the day phase the follow-up desk lets go of one dot (the order), which rises and leaves
    // through the top of the screen; the you stage brings it back in from below along the follow-up wire (uTrav there)
    // one light only: while it leaves, it takes the slot; the you stage's dot (parked on the follow-up node at the
    // screen's foot while that stage comes up) shows once this one is gone through the top
    if (officeR && oq && office.day > 0.5) {
      const dep = clamp01((vh * 1.25 - officeR.y1) / (vh * 0.75))
      if (dep > 0 && dep < 1) {
        const [dx, dy] = deskAt(1, oq)
        fu.uTrav.value = [dx + Math.sin(dep * 7) * 5, mix(dy - 6, -40, dep * dep), 1]
      }
    }

    // ---- FAQ field → the final logo (§4.8 / §4.7): the triangle of dots, the dots that rise to its apex
    const fq = bus.faq
    const fdots = new Array(15).fill(0)
    fu.uTri.value = [0, 0, 0, 0]; fu.uTriL.value = [0, 0, 0, 0]
    const list = rect(q('.faq-list'))
    const faqOn = !!faqR && faqR.y0 < vh * 0.9 && (faqR.y1 > 0 || !!logoBox && logoBox.y1 > 0)
    if (faqOn && faqR) {
      const appear = smooth(vh * 0.9, vh * 0.4, faqR.y0)
      const morph = logoBox ? smooth(vh * 1.15, vh * 0.5, logoBox.y0) : 0
      const lit = fq.answered / 5
      let F = portrait
        ? { cx: margin + 4, apex: Math.max(faqR.y0 + 90, vh * 0.1), h: Math.min(faqR.y1, vh * 0.92) - Math.max(faqR.y0 + 90, vh * 0.1) }
        : { cx: list ? (list.x0 + list.x1) / 2 : vw * 0.66, apex: vh * 0.1, h: vh * 0.76 }
      let column = portrait && morph < 0.02
      if (portrait && !column) F = { cx: margin + 44, apex: vh * 0.08, h: 80 }
      if (logoBox && morph > 0) {
        const L = { cx: (logoBox.x0 + logoBox.x1) / 2, apex: logoBox.y0, h: logoBox.y1 - logoBox.y0 }
        F = { cx: mix(F.cx, L.cx, morph), apex: mix(F.apex, L.apex, morph), h: mix(F.h, L.h, morph) }
        column = false
      }
      const arrow = clamp01((morph - 0.9) / 0.1)
      fu.uTri.value = [F.cx, F.apex, Math.max(F.h, 1), Math.max(appear, morph) * (faqR.y1 > 0 || morph > 0 ? 1 : 0)]
      fu.uTriL.value = [mix(lit, 1, morph), arrow, 0, column ? 1 : 0]
      fq.riseAt.forEach((at, k) => {
        if (at < 0) return
        const t = (now - at) / 700
        if (t < 0 || t > 1) return
        animating = true
        const e = easeOut(t)
        fdots.splice(k * 3, 3, F.cx, mix(fq.anchorY[k], F.apex + 4, e), 1)
      })
      document.documentElement.dataset.logo = arrow >= 1 ? 'lit' : 'off'
    }
    fu.uFDot.value = fdots

    // ---- ?btn=field: the light gathers around the action and answers it (owner, 09/11)
    const actR = new Array(8).fill(0), actP = new Array(8).fill(0)
    fu.uActG.value = 1
    {
      let k = 0
      for (const el of document.querySelectorAll<HTMLElement>('[data-act]')) {
        if (k >= 2) break
        const r = rect(el)
        if (!r || !visible(r, -20) || r.x1 - r.x0 < 4) continue
        const hot = el.matches(':hover, :focus-visible')
        const ready = el.dataset.actReady === 'true'
        const fill = el.dataset.act === 'approve' ? bus.sim.fill : 0
        const tgt = hot ? 1 : ready ? 0.85 : el.dataset.act === 'approve' ? 0.25 + 0.75 * fill : 0.55
        const cur = approach(act.get(el) ?? 0, tgt, 0.05, dt)
        act.set(el, cur)
        if (Math.abs(cur - tgt) > 0.01) animating = true
        const reach = el.dataset.act === 'approve' ? 70 - 34 * fill : 40 + 34 * cur
        actR.splice(k * 4, 4, r.x0, r.y0, r.x1, r.y1)
        actP.splice(k * 4, 4, reach, cur, hot ? 1.8 : ready ? 1.3 : 0.6, 1)
        k++
      }
      if (k > 0) animating = true
    }
    fu.uAct.value = actR; fu.uActP.value = actP

    // ---- run only while a light scene is on screen
    const heroOn = !!hero && hero.y1 > 0 && fall < 1
    const gridVisible = gridOn > 0.01
    const triOn = (fu.uTri.value as number[])[3] > 0
    const active = flyOn || heroOn || formField || gridVisible || !!hz || (youOn && phoneLit > 0.01) || triOn || animating || (cu.uOffOn.value as number) > 0
    if (!active) {
      if (!idleCleared) { renderer.bindFramebuffer(); gl.clear(gl.COLOR_BUFFER_BIT); idleCleared = true }
      return false
    }
    idleCleared = false

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

    // automatic quality drop: average frame > 20 ms for 1 s → half the points
    avgDt = avgDt * 0.95 + dt * 0.05
    if (avgDt > 20 && drawCount > total * 0.4) {
      if (slowSince < 0) slowSince = now
      else if (now - slowSince > 1000) { drawCount = Math.round(drawCount * 0.5); geometry.setDrawRange(0, drawCount); slowSince = -1; document.documentElement.dataset.glQuality = 'low' }
    } else slowSince = -1

    if (!started) { started = true; document.documentElement.classList.add('gl-on') }
    // a scene that keeps moving on its own (breathing vertex, flowing wires) asks for frames
    // office, FAQ and final also breathe while the page is still (owner 09/11: everything alive)
    return opts.freezeAt === undefined && (heroOn || formField || animating || (youOn && phoneLit > 0.01) || gridVisible || triOn || (cu.uOffOn.value as number) > 0 || officeFloor)
  }

  const onLost = (e: Event) => {
    e.preventDefault()
    document.documentElement.classList.remove('gl-on')
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
    document.removeEventListener('visibilitychange', onHidden)
    canvas.removeEventListener('webglcontextlost', onLost)
    canvas.removeEventListener('webglcontextrestored', onRestored)
    dropOffice()
    geometry?.remove()
    pointProgram.remove(); fieldProgram.remove(); compProgram.remove(); quad.remove()
    document.documentElement.classList.remove('gl-on')
  }
}
