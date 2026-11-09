import { bus } from './bus'
import { days } from './content'
import { OFFICE_DESKS, OFFICE_IMG, coverMap, isPortrait } from './layout'
import { ticker, type Task } from './ticker'

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (a: number, b: number, v: number) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t) }
const setAttr = (el: HTMLElement, k: string, v: string) => { if (el.dataset[k] !== v) el.dataset[k] = v }

/** Scroll-driven DOM pieces that must work without WebGL too (brief-v4.1): K1 lines, K3 night title,
 *  the office scene (K2, the 90-day line, desk tags, exchanges), the FAQ reading cursor and K5.
 *  Runs once per scroll frame on the shared ticker; never continuously on its own. */
export function initDomScenes(reduced: boolean) {
  const root = document.documentElement
  // K1: lines rise once when the title enters (IO at 15%)
  const k1 = Array.from(document.querySelectorAll<HTMLElement>('.k1'))
  let io: IntersectionObserver | null = null
  if (!reduced) {
    k1.forEach((el) => { el.dataset.in = 'false' })
    io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { (e.target as HTMLElement).dataset.in = 'true'; io?.unobserve(e.target) }
    }, { threshold: 0.15 })
    k1.forEach((el) => io!.observe(el))
  }
  if (reduced) return () => io?.disconnect()
  root.classList.add('scenes')

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
  faqItems.forEach((el) => { el.dataset.state = 'ahead'; el.querySelector('button')?.setAttribute('aria-expanded', 'false') })
  let faqCurrent = -1
  const onFaqClick = (e: Event) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-faq-q]')
    if (b) b.closest('li')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }
  faqSec?.addEventListener('click', onFaqClick)

  const logoBox = document.querySelector<HTMLElement>('[data-final-logo]')
  const k5 = document.querySelector<HTMLElement>('.k5')
  const k5w = Array.from(document.querySelectorAll<HTMLElement>('.k5-w'))

  let lastDay = -1
  let lastTalk = -2

  const task: Task = (now) => {
    const vh = innerHeight, vw = innerWidth
    const portrait = isPortrait(vw)

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
        bus.office.offOn = smooth(0.0, 0.1, p)
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
          const show = showTags.includes(k) && (() => { const [x, y] = pos(k); return x > 0 && x < qw && y > 0 && y < qh })()
          setAttr(t, 'on', String(show))
          if (show) { const [x, y] = pos(k); t.style.transform = `translate3d(${Math.max(8, Math.min(qw - t.offsetWidth - 8, x - t.offsetWidth / 2)).toFixed(1)}px, ${(y - 44).toFixed(1)}px, 0)` }
        })
        // the three exchanges, with the scroll: question at .78/.86/.94, answer 4% later; one at a time
        const marks = [0.78, 0.82, 0.86, 0.9, 0.94, 0.98]
        let ti = -1
        marks.forEach((m, i) => { if (p >= m) ti = i })
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
          talk.forEach((t, i) => setAttr(t, 'on', String(i === Math.max(0, ti))))
        }
      }
    }

    // ---- FAQ: the reading cursor (the question whose anchor crosses 55% of the screen)
    if (faqSec && faqItems.length) {
      const r = faqSec.getBoundingClientRect()
      if (r.bottom > -vh && r.top < vh) {
        let cur = -1
        faqItems.forEach((el, i) => { const b = el.querySelector('.faq-q')!.getBoundingClientRect(); if (b.top + b.height / 2 < vh * 0.55) cur = i })
        if (cur > faqCurrent) {
          // newly passed: each sends its dot up, staggered if the scroll skipped several
          let k = 0
          for (let i = faqCurrent + 1; i <= cur; i++) if (bus.faq.riseAt[i] < 0) { bus.faq.riseAt[i] = now + k * 120; bus.faq.anchorY[i] = vh * 0.55; k++ }
        }
        if (cur !== faqCurrent) {
          faqCurrent = cur
          faqItems.forEach((el, i) => {
            const st = i === cur ? 'current' : bus.faq.riseAt[i] >= 0 ? 'done' : 'ahead'
            setAttr(el, 'state', st)
            el.querySelector('button')?.setAttribute('aria-expanded', String(st !== 'ahead'))
          })
        }
        bus.faq.current = cur
      }
      bus.faq.answered = bus.faq.riseAt.filter((a) => a >= 0 && now - a >= 700).length
    }

    // ---- K5: the question forms with the logo (word by word, the "?" with the arrow)
    if (logoBox && k5) {
      const b = logoBox.getBoundingClientRect()
      const morph = smooth(vh * 1.15, vh * 0.5, b.top)
      k5w.forEach((w, i) => w.style.setProperty('--on', clamp01((morph - 0.5 - i * 0.08) / 0.08).toFixed(3)))
      setAttr(k5, 'q', String(morph >= 0.98))
    }
    return bus.faq.riseAt.some((a) => a >= 0 && now - a < 800)
  }
  ticker.add(task)
  return () => {
    ticker.remove(task); io?.disconnect()
    removeEventListener('resize', measureK2)
    faqSec?.removeEventListener('click', onFaqClick)
    root.classList.remove('scenes')
  }
}
