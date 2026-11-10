import { bus } from './bus'
import { days } from './content'
import { C5_AT, CLEAR_IN_MS, CLEAR_READ_MS, CLEAR_READ_SCREENS, OFFICE_DESKS, OFFICE_IMG, OVAL_IN, YOU_HOLD, coverMap, inOval, isPortrait } from './layout'
import { orlaTargets } from './orla'
import { ticker, type Task } from './ticker'

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (a: number, b: number, v: number) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t) }
const setAttr = (el: HTMLElement, k: string, v: string) => { if (el.dataset[k] !== v) el.dataset[k] = v }

/** Scroll-driven DOM pieces that must work without WebGL too (brief-v4.1): K1 lines, K3 night title,
 *  the office scene (K2, the 90-day line, desk tags, exchanges), the FAQ reading cursor and K5.
 *  Runs once per scroll frame on the shared ticker; never continuously on its own. */
export function initDomScenes(reduced: boolean) {
  const root = document.documentElement
  if (reduced) return () => undefined
  // ---- brief-v4.4 §8.2 the voice: ONE IntersectionObserver for the page. A section with [data-in] nodes fires once at
  // 20 % visible: its voice-h2 (the K1 mechanism, unchanged) and its voice-body nodes (≤ 6 in a 60-ms ladder, 120 ms
  // after the title). voice-control waits for its orla (orla.ts); a 4-s fallback here. The rules live
  // in the CSS behind .scenes (no JS = no hiding); the voice never leaves again.
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]')).filter((g) => g.querySelector('[data-in]'))
  const timers: number[] = []
  const fire = (g: HTMLElement) => {
    let k = 0
    for (const el of g.querySelectorAll<HTMLElement>('[data-in]')) {
      if (el.dataset.in === 'voice-q') continue // brief-v4.5 §10.1: each question enters on its own IO (below)
      // v55e: the first form has no orla any more: its controls come in after the body's ladder (≈ 120 + 2 × 60 ms + the
      // 480-ms rise), the same 240-ms fade; with an orla they still wait for it (4-s fallback)
      if (el.dataset.in === 'voice-control') {
        const orla = el.querySelector(':scope > .orla')
        timers.push(window.setTimeout(() => { el.dataset.inState = 'on' }, orla ? 4000 : 360))
        continue
      }
      if (el.dataset.in === 'voice-body') el.style.setProperty('--k', String(Math.min(5, k++)))
      el.dataset.inState = 'on'
    }
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      const g = e.target as HTMLElement
      io.unobserve(g)
      // v4.9 (measured): the brief asks the FAQ's voice to wait for its orla (≥ 40 %), but the orla is lit where the
      // phone's fragments land, BELOW the fold when the title enters (1440 and 390): waiting left frames at 0 % lit
      // between the phone and the FAQ (proto-v49/c5). The voice enters at 20 % visible, like every section.
      fire(g)
    }
  }, { threshold: 0.2 })
  groups.forEach((g) => io.observe(g))
  // brief-v4.5 §10.1 voice-q: each FAQ item enters when IT is 15 % visible (the cascade follows the scroll); the ones
  // that enter together form a ladder of 70 ms (≤ 6)
  const ioQ = new IntersectionObserver((entries) => {
    let k = 0
    for (const e of entries) {
      if (!e.isIntersecting) continue
      const el = e.target as HTMLElement
      ioQ.unobserve(el)
      el.style.setProperty('--q', String(Math.min(5, k++)))
      el.dataset.inState = 'on'
    }
  }, { threshold: 0.15 })
  document.querySelectorAll<HTMLElement>('[data-in="voice-q"]').forEach((el) => ioQ.observe(el))
  root.classList.add('scenes')
  // brief-v4.4 §6.2: the silk comes apart in 4 Bayer steps (a CSS mask per step, built once: no asset)
  const B4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]
  for (const [n, keep] of [[1, 12], [2, 8], [3, 4]] as const) {
    const c = document.createElement('canvas'); c.width = 8; c.height = 8
    const g = c.getContext('2d')
    if (!g) break
    g.fillStyle = '#000'
    for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) if (B4[i + j * 4] < keep) g.fillRect(i * 2, j * 2, 2, 2)
    root.style.setProperty(`--dis${n}`, `url("${c.toDataURL()}")`)
  }
  const youSec = document.querySelector<HTMLElement>('[data-scene="you"]')
  const youStage = document.querySelector<HTMLElement>('[data-you-stage]')
  const faqList = document.querySelector<HTMLElement>('.faq-list')
  const orderTag = document.querySelector<HTMLElement>('[data-order-tag]')
  const docTop = (el: HTMLElement) => el.getBoundingClientRect().top + scrollY

  const nightSec = document.querySelector<HTMLElement>('[data-scene="night"]')
  const k3 = Array.from(document.querySelectorAll<HTMLElement>('.k3-w'))

  const officeSec = document.querySelector<HTMLElement>('[data-scene="office"]')
  const k2Wrap = document.querySelector<HTMLElement>('[data-k2-wrap]')
  const k2Lines = Array.from(document.querySelectorAll<HTMLElement>('[data-k2-line]'))
  const quad = document.querySelector<HTMLElement>('[data-office-quad]')
  const tags = Array.from(document.querySelectorAll<HTMLElement>('[data-desk-tag]'))
  const balloons = Array.from(document.querySelectorAll<HTMLElement>('[data-balloon]'))
  const talk = Array.from(document.querySelectorAll<HTMLElement>('[data-talk]'))
  const dayNum = document.querySelector<HTMLElement>('[data-day-number]')
  const dayMark = document.querySelector<HTMLElement>('[data-dayline-mark]')
  const dayLit = document.querySelector<HTMLElement>('[data-dayline-lit]')
  const deskDay = OFFICE_DESKS.map((d) => days.desks.find((x) => x.name.toLowerCase().replace(/[^a-z]/g, '').startsWith(d.id.slice(0, 4)))?.day ?? 90)
  // the widths of "Sometimes" and "Never" for the FLIP swap (measured once per resize; only transforms animate)
  const measureK2 = () => k2Lines.forEach((l) => {
    const sw = l.querySelector<HTMLElement>('.k2-swap')
    const o = l.querySelector<HTMLElement>('.k2-old'), n = l.querySelector<HTMLElement>('.k2-new')
    if (sw && o && n) { sw.style.setProperty('--w-new', `${n.offsetWidth}px`); l.style.setProperty('--k2-d', `${o.offsetWidth - n.offsetWidth}px`) }
  })
  measureK2()
  document.fonts?.ready.then(measureK2).catch((error: unknown) => console.warn('fonts.ready failed', error))
  addEventListener('resize', measureK2)

  const faqItems = Array.from(document.querySelectorAll<HTMLElement>('[data-faq]'))
  const faqSec = document.querySelector<HTMLElement>('[data-scene="faq"]')
  if (faqSec) faqSec.dataset.cursor = 'on'
  // brief-v4.5 §10.2: the cursor read getBoundingClientRect of every item on every frame. The document tops are cached
  // (ResizeObserver + resize) and the current item comes from scrollY: 0 layout reads per frame
  let faqBox: [number, number][] = [], faqSecBox: [number, number] = [0, 0]
  const measureFaq = () => {
    const sy = scrollY
    faqBox = faqItems.map((el) => { const b = el.getBoundingClientRect(); return [b.top + sy, b.bottom + sy] })
    if (faqSec) { const b = faqSec.getBoundingClientRect(); faqSecBox = [b.top + sy, b.bottom + sy] }
  }
  const faqRo = new ResizeObserver(measureFaq)
  if (faqSec) faqRo.observe(faqSec)
  faqRo.observe(document.body)
  let faqCurrent = -2

  const dotsBox = document.querySelector<HTMLElement>('[data-final-dots]')
  const fdots = Array.from(document.querySelectorAll<HTMLElement>('[data-fd]'))
  const k5 = document.querySelector<HTMLElement>('.k5')
  const k5w = Array.from(document.querySelectorAll<HTMLElement>('.k5-w'))

  let lastDay = -1
  let clearInY = -1 // the scroll y where the text of "All clear" was fully in
  let c5Gate = -1 // the scroll y where C5 starts (≥ a): set once "All clear" has been read
  let lastTalk = -2

  const task: Task = (now) => {
    const vh = innerHeight, vw = innerWidth
    const portrait = isPortrait(vw)
    const sy = scrollY

    // ---- brief-v4.4 §5.3 C4 (scrub): from the office's stage leaving (its bottom at 1.0 vh; v4.9: at 1.25 vh the last
    // balloon had not even entered) to the top of the phone of the yes crossing 70 % of the screen. Document positions,
    // so a pinned stage never stretches the seam.
    const phone = document.querySelector<HTMLElement>('[data-phone]')
    let s4 = 0
    if (officeSec && youSec && youStage && phone) {
      const a = docTop(officeSec) + officeSec.offsetHeight - vh
      const b = docTop(youSec) + youStage.offsetTop + phone.offsetTop - vh * 0.7
      s4 = b > a ? clamp01((sy - a) / (b - a)) : 0
    }
    bus.c4 = s4
    // the screen lights from the point where the packet arrives (the top centre): a circle that grows over s .80–1
    const screen = phone?.querySelector<HTMLElement>('.screen')
    if (phone && screen) {
      const rv = s4 < 1
      setAttr(phone, 'reveal', rv ? 'on' : 'off')
      if (rv) phone.style.setProperty('--rv', `${(smooth(0.8, 1, s4) * Math.hypot(screen.offsetWidth / 2, screen.offsetHeight) + (s4 >= 0.8 ? 2 : 0)).toFixed(1)}px`)
    }
    // ---- §6.2 C5 (scrub): from p C5_AT of the yes (v5.0: after the hold band of "All clear") to the top of the FAQ
    // list at 60 % of the screen. v5.0 (390: the fragments fell below the fold, the list's base was still under it):
    // the seam also lasts until the orla's lowest landing point is inside the screen (16 px up) by c .75, the last
    // landing, so every fragment lands where it can be seen; the fragments follow their target as the page scrolls.
    let c5 = 0
    if (youSec && faqList) {
      const a = docTop(youSec) + (C5_AT / (1 + YOU_HOLD)) * (youSec.offsetHeight - vh)
      let b = docTop(faqList) - vh * 0.6
      const land = orlaTargets('faq')
      if (land) {
        const low = Math.max(...land.map((q) => q[1])) + sy
        b = Math.max(b, a + (low - (vh - 16) - a) / 0.75)
      }
      // v5.0: "All clear" must be READ. yIn = the scroll where its text was fully in (1st scroll frame after it); the
      // seam begins at the latest of: C5_AT, yIn + CLEAR_READ_SCREENS, and CLEAR_READ_MS after the clear (then from
      // wherever the scroll is: it never jumps). Passed the stage without the clear (an anchor, a jump): the plain
      // scrub, so the FAQ's orla still lights. Scrolling back above the start recomposes the phone (scrub).
      const ca = bus.phone.clearAt
      if (ca < 0) clearInY = -1
      else if (clearInY < 0 && now - ca >= CLEAR_IN_MS) clearInY = sy
      const read = ca >= 0 && now - ca >= CLEAR_READ_MS && clearInY >= 0
      const passed = youSec.getBoundingClientRect().bottom < vh * 0.25
      const start = passed ? a : read ? Math.max(a, clearInY + CLEAR_READ_SCREENS * vh) : Infinity
      if (sy < start) c5Gate = -1
      else if (c5Gate < 0) c5Gate = passed && !read ? a : Math.max(start, sy)
      c5 = c5Gate >= 0 && b > a ? clamp01((sy - c5Gate) / (b - a)) : 0
    }
    bus.c5 = c5
    if (phone) setAttr(phone, 'dis', String(c5 <= 0 ? 0 : Math.min(4, Math.ceil((c5 / 0.35) * 4))))

    // ---- K3: the crest lights the night title word by word (same crest as the engine)
    if (nightSec && k3.length) {
      const r = nightSec.getBoundingClientRect()
      if (r.bottom > 0 && r.top < vh) {
        const prog = clamp01(-r.top / Math.max(1, r.height - vh))
        const crest = -0.08 + (prog / 0.86) * 1.12
        k3.forEach((w, i) => {
          let lit: number
          if (portrait) lit = clamp01((prog * 1.25 - i / k3.length) * 4)
          else { const b = w.getBoundingClientRect(); lit = clamp01((crest * vw - (b.left + b.width / 2)) / 90 + 0.5) }
          w.style.setProperty('--lit', lit.toFixed(3))
        })
      }
    }

    // ---- the office scene
    if (officeSec && quad) {
      const r = officeSec.getBoundingClientRect()
      const on = r.bottom > 0 && r.top < vh
      bus.office.on = on ? 1 : 0
      if (on) {
        const p = clamp01(-r.top / Math.max(1, r.height - vh))
        k2Lines.forEach((l, i) => {
          const at = i === 0 ? 0.1 : 0.2
          const cur = l.dataset.swapped === 'true'
          const sw = p >= at + (cur ? -0.01 : 0.01)
          setAttr(l, 'swapped', String(sw))
        })
        // the phrase settles: rises 12vh and shrinks (scale, no reflow) to open the room
        const settle = smooth(0.24, 0.3, p)
        if (k2Wrap) k2Wrap.style.transform = portrait ? `translate3d(0, ${(-settle * 4).toFixed(2)}vh, 0)` : `translate3d(0, ${(-settle * 12).toFixed(2)}vh, 0) scale(${(1 - settle * 0.42).toFixed(4)})`
        quad.style.transform = `translate3d(0, ${((1 - smooth(0.22, 0.32, p)) * (portrait ? 6 : 18)).toFixed(2)}vh, 0)`
        // brief-v4.3 §4.2: the model comes up while the office enters (it was black under 'Sometimes late.' until the pin)
        bus.office.offOn = Math.max(smooth(0.0, 0.1, p), 0.85 * smooth(vh * 0.55, vh * 0.05, r.top))
        bus.office.dolly = p
        // 90 days along the line
        const dp = clamp01((p - 0.3) / 0.45)
        const day = Math.round(dp * 90)
        if (day !== lastDay) {
          lastDay = day
          if (dayNum) dayNum.textContent = String(day)
          deskDay.forEach((d, k) => {
            const lit = day >= d && p > 0.3
            if (lit && bus.office.litAt[k] < 0) bus.office.litAt[k] = now
            if (!lit) bus.office.litAt[k] = -1
          })
        }
        if (dayMark) dayMark.style.transform = `translate3d(calc(${(dp * 100).toFixed(2)}cqw - 50%), 0, 0)`
        if (dayLit) dayLit.style.clipPath = `inset(0 ${(100 - dp * 100).toFixed(2)}% 0 0)`
        quad.dataset.days = p > 0.28 ? 'on' : 'off'
        bus.office.day = smooth(0.75, 0.86, p)
        // desk tags at their monitors: ≤ 5 lit at 1440, only the last lit on a phone
        const qw = quad.clientWidth, qh = quad.clientHeight
        const img = portrait ? OFFICE_IMG.portrait : OFFICE_IMG.master
        const cm = bus.office.cm ?? coverMap(qw, qh, img.w, img.h) // the engine's camera window (zoom), if it is drawing
        const pos = (k: number) => {
          const [ix, iy] = portrait ? OFFICE_DESKS[k].portrait : OFFICE_DESKS[k].master
          return [((ix / img.w - cm.ou) / cm.su) * qw, ((iy / img.h - cm.ov) / cm.sv) * qh]
        }
        const litIdx = OFFICE_DESKS.map((_, k) => k).filter((k) => bus.office.litAt[k] >= 0).sort((a, b) => deskDay[a] - deskDay[b])
        const showTags = p < 0.76 ? litIdx.slice(portrait ? -1 : -5) : []
        tags.forEach((t, k) => {
          // with the v4.3 camera a desk can sit outside the window: its tag hides instead of floating off the model
          const show = showTags.includes(k) && (() => { const [x, y] = pos(k); return inOval(x / qw, y / qh, OVAL_IN) })() // brief-v4.3 §7.1: never over the bare ground
          setAttr(t, 'on', String(show))
          if (show) { const [x, y] = pos(k); t.style.transform = `translate3d(${Math.max(8, Math.min(qw - t.offsetWidth - 8, x - t.offsetWidth / 2)).toFixed(1)}px, ${(y - 44).toFixed(1)}px, 0)` }
        })
        // the three exchanges, with the scroll: question at .78/.86/.94, answer 4% later; one at a time
        const marks = [0.76, 0.8, 0.84, 0.88, 0.92, 0.96] // v4.9: 2 % earlier, the last balloon reads before C4 takes it
        let ti = -1
        marks.forEach((m, i) => { if (p >= m) ti = i })
        // brief-v4.4 §5.3: as the order leaves (C4 s > .05) the last balloon goes, the follow-up desk says it is for you
        if (ti === 5 && s4 > 0.05) ti = 6
        if (orderTag) {
          const show = s4 > 0 && s4 < 0.4
          setAttr(orderTag, 'on', String(show))
          if (show) { const [x, y] = pos(1); orderTag.style.transform = `translate3d(${Math.max(8, Math.min(qw - orderTag.offsetWidth - 8, x - orderTag.offsetWidth / 2)).toFixed(1)}px, ${(y - 44).toFixed(1)}px, 0)` }
        }
        if (ti !== lastTalk) {
          lastTalk = ti
          balloons.forEach((b, i) => {
            const show = i === ti && !portrait
            setAttr(b, 'on', String(show))
            if (show) {
              const id = b.dataset.desk ?? ''
              const k = OFFICE_DESKS.findIndex((d) => d.id === id)
              const [x, y] = pos(Math.max(0, k))
              b.style.left = `${Math.max(120, Math.min(qw - 120, x)).toFixed(1)}px`; b.style.top = `${y.toFixed(1)}px`
            }
          })
          talk.forEach((t, i) => setAttr(t, 'on', String(i === Math.min(5, Math.max(0, ti)))))
        }
      }
    }

    // ---- FAQ: the reading cursor (brief-v4.3 §5.2): the question at reading height goes to full ink, the rest
    //      stay at 82 %; every answer stays open and lit
    if (faqSec && faqItems.length) {
      const sy = scrollY
      if (faqSecBox[1] - sy > 0 && faqSecBox[0] - sy < vh) {
        let cur = -1
        faqBox.forEach(([t, b], i) => { if (t - sy < vh * 0.6 && b - sy > vh * 0.2) cur = cur < 0 ? i : cur })
        if (cur !== faqCurrent) { faqCurrent = cur; faqItems.forEach((el, i) => setAttr(el, 'state', i === cur ? 'current' : 'other')) }
      }
    }

    // ---- K5 (brief-v4.3 §5.3): one word, one agent: the six dots of the hero's base light left → right as the
    //      question forms; the sixth lights with the "?"
    if (dotsBox && k5) {
      const b = dotsBox.getBoundingClientRect()
      const morph = smooth(vh * 1.0, vh * 0.35, b.top)
      k5w.forEach((w, i) => w.style.setProperty('--on', clamp01((morph - i * 0.14) / 0.12).toFixed(3)))
      fdots.forEach((d, i) => setAttr(d, 'on', String(morph >= i * 0.14 + 0.06)))
      setAttr(k5, 'q', String(morph >= 0.98))
    }
    return false
  }
  ticker.add(task)
  return () => {
    ticker.remove(task); io.disconnect(); ioQ.disconnect(); faqRo.disconnect(); timers.forEach(clearTimeout)
    removeEventListener('resize', measureK2)
    root.classList.remove('scenes')
  }
}
