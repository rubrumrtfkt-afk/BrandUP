import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { bus } from './bus'
import { agents, days, faq, fields, final, footer, form, hero, night, office, revenue, you, type FieldKey } from './content'
import { initDomScenes } from './domScenes'
import { initGround } from './ground'
import { initFootPeak } from './footPeak'
import { initSmoothScroll } from './smoothScroll'
import { POSTER_T, deskLines, initNightShift } from './nightShift'
import { NODES, netFrame, netToScreen } from './layout'
import { ticker } from './ticker'
import officeDay1440 from './assets/office-day-1440.webp?url'
import officeDayP780 from './assets/office-day-p780.webp?url'
import posterHero1440 from './assets/poster-hero-1440.webp?url'
import posterHero390 from './assets/poster-hero-390.webp?url'

const hasWindow = typeof window !== 'undefined'
const reduced = hasWindow && matchMedia('(prefers-reduced-motion: reduce)').matches

export function Proto() {
  useEffect(() => initDomScenes(reduced), [])
  useEffect(() => (reduced ? undefined : initSmoothScroll()), [])
  useEffect(() => initNightShift(reduced), [])
  useEffect(() => (reduced ? undefined : initGround()), [])
  // Instagram's in-app browser changes svh while scrolling: freeze the stage height at the first touch.
  useEffect(() => {
    const freeze = () => document.documentElement.style.setProperty('--tela', `${innerHeight}px`)
    let w = innerWidth
    const onResize = () => { if (innerWidth !== w) { w = innerWidth; freeze() } }
    addEventListener('touchstart', freeze, { once: true, passive: true })
    addEventListener('resize', onResize)
    return () => { removeEventListener('touchstart', freeze); removeEventListener('resize', onResize) }
  }, [])
  return (
    <>
      <PatternDefs />
      <header className="bar">
        <a className="brand" href="#top" aria-label="BrandUp"><Logo /><span aria-hidden="true">BrandUp</span></a>
        <a className="bar-link" href="#diagnostic">Diagnosis</a>
      </header>
      <main id="top">
        <Hero />
        <section className="sec form-sec" data-scene="form" aria-labelledby="form-h">
          <div className="form-copy">
            <Lines id="form-h" lines={form.h2} />
            <p className="lede" data-dark="16">{form.lede}</p>
          </div>
          <LeadForm id="diagnostic" />
          <div className="horizon" data-horizon="diagnostic" data-beam="96" aria-hidden="true" />
        </section>
        <Night />
        <Office />
        <You />
        <Faq />
        <section className="sec final" data-scene="final" aria-labelledby="final-h">
          <div className="final-logo" data-final-logo aria-hidden="true">
            <svg className="final-tri-fallback" viewBox="5 5 30 28"><LogoShapes body="url(#dot-body)" arrow="url(#dot-core)" /></svg>
          </div>
          <h2 id="final-h" className="k5" data-dark aria-label={final.h2}>
            {final.h2.split(' ').map((w, i, all) => {
              const last = i === all.length - 1 && w.endsWith('?')
              return (
                <span key={i} className="k5-w" aria-hidden="true" style={{ ['--i' as string]: i }}>
                  {last ? <>{w.slice(0, -1)}<span className="k5-q">?</span></> : w}{i < all.length - 1 ? ' ' : ''}
                </span>
              )
            })}
          </h2>
          <LeadForm id="final-form" compact />
          <div className="horizon" data-horizon="final" data-beam="72" aria-hidden="true" />
        </section>
      </main>
      <Footer />
    </>
  )
}

/** K1 (brief-v4.1 §4.1): each line rises into place once, in a clipped window. Final text in the HTML. */
function Lines({ id, lines }: { id: string; lines: string[] }) {
  return (
    <h2 id={id} className="k1" data-dark aria-label={lines.join(' ')}>
      {lines.map((l, i) => <span key={l} className="k1-line" aria-hidden="true"><span style={{ ['--i' as string]: i }}>{l}</span></span>)}
    </h2>
  )
}

/** The action button ("field", the owner's pick 09/11): the silk material, the light gathers around it in the engine. */
function BtnBody({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="btn-label">{children}</span>
      <svg className="btn-arrow" viewBox="12 11 16 21" aria-hidden="true"><path d="M20 13 L26 22 L14 22 Z" /><rect x="17.5" y="21" width="5" height="9" rx="2.5" /></svg>
    </>
  )
}

function Logo() {
  return <svg className="logo" viewBox="0 0 40 40" aria-hidden="true"><LogoShapes body="#9232EA" arrow="#FFFFFF" /></svg>
}
function LogoShapes({ body, arrow }: { body: string; arrow: string }) {
  return (
    <>
      <path d="M20 5 L35 33 L5 33 Z" fill={body} stroke={body === '#9232EA' ? body : 'none'} strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 13 L26 22 L14 22 Z" fill={arrow} />
      <rect x="17.5" y="21" width="5" height="9" rx="2.5" fill={arrow} />
    </>
  )
}
/** Ordered-dot fills for the DOM pieces that show light without WebGL (fallback triangle). */
function PatternDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="dot-body" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="scale(0.12)">
          <rect width="4" height="4" fill="#1A0B33" /><rect width="2" height="2" fill="#9232EA" /><rect x="2" y="2" width="2" height="2" fill="#9232EA" />
        </pattern>
        <pattern id="dot-core" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="scale(0.12)">
          <rect width="4" height="4" fill="#C9A2FF" /><rect width="2" height="2" fill="#FBF7FF" /><rect x="2" y="2" width="2" height="2" fill="#FBF7FF" />
        </pattern>
        {/* brief-v4.2 §5.2: the night figures (ink 35 % as a checker of 1-unit = 2 px squares) and the moon */}
        <pattern id="dot-ink" width="2" height="2" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill="#F4F1F8" fillOpacity=".2" /><rect width="1" height="1" fill="#F4F1F8" fillOpacity=".5" /><rect x="1" y="1" width="1" height="1" fill="#F4F1F8" fillOpacity=".5" />
        </pattern>
        <pattern id="dot-moon" width="2" height="2" patternUnits="userSpaceOnUse">
          <rect width="2" height="2" fill="#C9A2FF" /><rect width="1" height="1" fill="#FBF7FF" /><rect x="1" y="1" width="1" height="1" fill="#FBF7FF" />
        </pattern>
      </defs>
    </svg>
  )
}

/** Decorative poster drawn into a 2D canvas: it bridges the gap until the WebGL canvas takes over and
 *  stays as the fallback. A canvas is not an LCP candidate, so the H1 text stays the LCP. */
function PosterCanvas({ desktop, mobile, className }: { desktop: string; mobile: string; className: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let cancelled = false
    const draw = () => {
      const img = new Image()
      img.decoding = 'async'
      img.src = innerWidth < 768 ? mobile : desktop
      img.decode().then(() => {
        if (cancelled) return
        const r = canvas.getBoundingClientRect()
        const d = Math.min(devicePixelRatio || 1, 2)
        canvas.width = Math.round(r.width * d); canvas.height = Math.round(r.height * d)
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(img, (canvas.width - img.naturalWidth * s) / 2, 0, img.naturalWidth * s, img.naturalHeight * s)
        canvas.dataset.painted = 'true'
      }).catch((error: unknown) => console.warn('poster failed to decode', error))
    }
    if (document.documentElement.classList.contains('posters')) draw()
    else {
      const mo = new MutationObserver(() => { if (document.documentElement.classList.contains('posters')) { mo.disconnect(); draw() } })
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
      return () => { cancelled = true; mo.disconnect() }
    }
    return () => { cancelled = true }
  }, [desktop, mobile])
  return <canvas ref={ref} className={className} aria-hidden="true" />
}

function Hero() {
  const [pts, setPts] = useState<[number, number][]>([])
  const [hot, setHot] = useState(-1)
  useLayoutEffect(() => {
    const place = () => { const f = netFrame(innerWidth, innerHeight); setPts(NODES.slice(0, 6).concat([NODES[9]]).map((n) => netToScreen(n, f))) }
    place()
    addEventListener('resize', place)
    return () => removeEventListener('resize', place)
  }, [])
  const light = (i: number) => { setHot(i); bus.hotAgent = i; ticker.wake() }
  return (
    <section className="hero" data-scene="hero" aria-labelledby="h1">
      <PosterCanvas className="poster poster-hero" desktop={posterHero1440} mobile={posterHero390} />
      <div className="hero-copy">
        <h1 id="h1" data-dark><span>{hero.h1[0]}</span> <span>{hero.h1[1]}</span></h1>
        <p className="lede" data-dark="16">{hero.lede}</p>
        <a className="btn" href="#diagnostic" data-act="hero"><BtnBody>{hero.cta}</BtnBody></a>
        <p className="proof" data-dark="16">{hero.proof}</p>
      </div>
      <div className="agents" onPointerLeave={(e) => { if (e.pointerType === 'mouse') light(-1) }}>
        {pts.slice(0, 6).map(([x, y], i) => (
          <button key={agents[i]} type="button" className="agent" style={{ transform: `translate(${x}px, ${y}px)` }}
            aria-label={agents[i]} aria-pressed={hot === i}
            // a tap fires pointerenter then click: only the mouse lights on hover, so the tap toggles cleanly (juri-v4)
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') light(i) }}
            onFocus={(e) => { if (e.currentTarget.matches(':focus-visible')) light(i) }} onBlur={() => light(-1)}
            onClick={() => light(hot === i ? -1 : i)}>
            <span className="agent-name" aria-hidden="true">{agents[i]}</span>
          </button>
        ))}
        {pts[6] && <span className="vertex" role="img" aria-label={hero.vertex} style={{ transform: `translate(${pts[6][0]}px, ${pts[6][1]}px)` }} />}
      </div>
    </section>
  )
}

// ---------- form (visual only this round: nothing is sent, no Supabase import)
type Values = Record<FieldKey, string>
const validate = (k: FieldKey, v: string): 'empty' | 'invalid' | null => {
  const t = v.trim()
  if (!t) return 'empty'
  if (k === 'name' || k === 'company') return t.length >= 2 ? null : 'invalid'
  if (k === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t) ? null : 'invalid'
  if (k === 'phone') {
    let d = t.replace(/\D/g, '')
    if (d.startsWith('61')) d = d.slice(2)
    if (d.startsWith('0')) d = d.slice(1)
    return /^4\d{8}$/.test(d) ? null : 'invalid'
  }
  return null
}
const ORDER: FieldKey[] = ['name', 'company', 'email', 'phone', 'revenue']

function LeadForm({ id, compact = false }: { id: string; compact?: boolean }) {
  const [values, setValues] = useState<Values>({ name: '', company: '', email: '', phone: '', revenue: '' })
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const refs = useRef<Partial<Record<FieldKey, HTMLElement | null>>>({})
  const errorOf = (k: FieldKey) => (touched[k] ? validate(k, values[k]) : null)
  const ready = ORDER.every((k) => validate(k, values[k]) === null)
  useEffect(() => {
    bus.beams[id] = ORDER.map((k) => validate(k, values[k]) === null)
    ticker.wake()
  }, [id, values])
  useEffect(() => () => { delete bus.beams[id] }, [id])
  const set = (k: FieldKey, v: string) => setValues((s) => ({ ...s, [k]: v }))
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, company: true, email: true, phone: true, revenue: true })
    const first = ORDER.find((k) => validate(k, values[k]) !== null)
    if (first) { refs.current[first]?.focus(); return }
    setStatus('sending')
    setTimeout(() => setStatus('done'), 900)
  }
  const message = (k: FieldKey) => {
    const e = errorOf(k)
    if (!e) return null
    if (k === 'revenue') return revenue.empty
    const f = fields.find((x) => x.key === k)!
    return e === 'empty' ? f.empty : f.invalid
  }
  return (
    <form id={id} className={compact ? 'lead compact' : 'lead'} data-dark={compact ? '' : undefined} noValidate onSubmit={onSubmit}>
      {fields.map((f) => {
        const err = message(f.key)
        const inputId = `${id}-${f.key}`
        return (
          <div key={f.key} className={`field field-${f.key}`} data-invalid={err ? 'true' : undefined}>
            <label htmlFor={inputId} data-dark={compact ? undefined : '12'}>{f.label}</label>
            <div className={f.key === 'phone' ? 'input input-phone' : 'input'}>
              {f.key === 'phone' && <span className="prefix" aria-hidden="true">+61</span>}
              <input id={inputId} ref={(el) => { refs.current[f.key] = el }} name={f.key} type={f.type} inputMode={f.inputMode}
                autoComplete={f.autoComplete} placeholder={f.placeholder} value={values[f.key]} required
                minLength={f.key === 'name' || f.key === 'company' ? 2 : undefined}
                aria-invalid={err ? true : undefined} aria-describedby={err ? `${inputId}-err` : undefined}
                onChange={(e) => set(f.key, e.target.value)} onBlur={() => setTouched((t) => ({ ...t, [f.key]: true }))} />
            </div>
            {err && <p className="err" id={`${inputId}-err`}>{err}</p>}
          </div>
        )
      })}
      <fieldset className="field revenue" aria-describedby={message('revenue') ? `${id}-rev-err` : undefined}>
        <legend>{revenue.label}</legend>
        <div className="blocks">
          {revenue.options.map((o, i) => (
            <label key={o.value} className="block">
              <input type="radio" name={`${id}-revenue`} value={o.value} checked={values.revenue === o.value}
                ref={i === 0 ? (el) => { refs.current.revenue = el } : undefined}
                onChange={() => { set('revenue', o.value); setTouched((t) => ({ ...t, revenue: true })) }} />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
        {message('revenue') && <p className="err" id={`${id}-rev-err`}>{message('revenue')}</p>}
      </fieldset>
      <div className="submit">
        <button className="btn" type="submit" disabled={status === 'sending'} aria-busy={status === 'sending' || undefined}
          data-act={id} data-act-ready={ready ? 'true' : undefined} data-state={status}>
          <BtnBody>{status === 'sending' ? form.sending : form.button}</BtnBody>
        </button>
        <p className="privacy" data-dark="12">{form.privacy} <a href="/privacy">{form.privacyLink}</a></p>
        <p className="status" role="status">{status === 'done' ? form.protoNote : ''}</p>
      </div>
    </form>
  )
}

function Night() {
  const words = night.h2.split(' ')
  const lines = deskLines(POSTER_T) // the poster frame (02:14): what no-JS, reduced motion and the 1st paint show
  return (
    <section className="night" data-scene="night" aria-labelledby="night-h">
      <div className="stage">
        {/* K3: each word lights when the crest passes it (domScenes) */}
        <h2 id="night-h" className="k3" data-dark aria-label={night.h2}>
          {words.map((w, i) => <span key={i} className="k3-w" aria-hidden="true">{w}{i < words.length - 1 ? ' ' : ''}</span>)}
        </h2>
        <p className="sr-only">{night.aria}</p>
        {/* brief-v4.2 §5.2: the whole scene is there from the first frame; the scroll only moves the time */}
        <div className="shift" data-shift data-on="false" aria-hidden="true">
          <div className="moon-path" data-moon-path>
            <div className="moon" data-moon data-dark="10">
              <svg viewBox="0 0 18 18" width="18" height="18"><path d="M11 1A8 8 0 1 0 17 12A6.5 6.5 0 1 1 11 1Z" fill="url(#dot-moon)" /></svg>
              <span className="moon-t" data-moon-t>{night.posterAt}</span>
            </div>
          </div>
          <div className="shift-office">
            <p className="place" data-dark="10">{night.office}</p>
            <ul className="desks">
              {night.desks.map((d, i) => (
                <li key={d.name} className="desk" data-desk={i} data-work="false" style={{ ['--i' as string]: i }}>
                  <span className="fig"><Seated /><span className="beam" /></span>
                  <span className="desk-label" data-dark="10">
                    <span className="dname"><span className="long">{d.name}</span><span className="short">{d.short}</span></span>
                    <span className="dtask" data-task data-fresh="false">{lines[i]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="home" data-home data-lit="false">
            <p className="place" data-dark="10">{night.home}</p>
            <span className="sleeper"><Sleeper /><span className="phone-aura" /></span>
            <span className="wait" data-dark="10">07:58 · {night.waiting}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/** brief-v4.2 §5.2 / §8.3: the resin figure as a profile pictogram in 2-px squares. EM AVALIAÇÃO: drawn in
 *  SVG from the proportions of desk-followup-1x1.png while Blender renders the loop (the atlas replaces it).
 *  Body = ink 35 % in a checker; the monitor is the only lit part; the lamp at 50 %. */
function Seated() {
  return (
    <svg className="seated" viewBox="0 0 36 36" aria-hidden="true">
      <g fill="url(#dot-ink)">
        <rect x="4" y="12" width="2" height="12" /><rect x="5" y="21" width="9" height="2" /><rect x="9" y="23" width="1" height="11" />
        <rect x="9" y="6" width="5" height="5" /><rect x="8" y="12" width="5" height="9" />
        <rect x="11" y="21" width="6" height="2" /><rect x="15" y="23" width="2" height="10" /><rect x="15" y="33" width="4" height="1" />
        <rect x="14" y="20" width="20" height="1" /><rect x="15" y="21" width="1" height="13" /><rect x="32" y="21" width="1" height="13" />
        <rect x="27" y="18" width="2" height="2" /><rect x="34" y="11" width="1" height="9" />
      </g>
      <g className="arm" fill="url(#dot-ink)"><rect x="12" y="14" width="5" height="2" /><rect x="16" y="16" width="5" height="2" /><rect x="19" y="18" width="4" height="1" /></g>
      <rect className="lamp" x="31" y="10" width="4" height="2" />
      <rect className="mon-back" x="23" y="9" width="8" height="9" />
      <rect className="mon" x="24" y="10" width="6" height="7" />
    </svg>
  )
}
function Sleeper() {
  return (
    <svg className="sleeper-svg" viewBox="0 0 72 36" aria-hidden="true">
      <g fill="url(#dot-ink)">
        <rect x="4" y="25" width="50" height="3" /><rect x="4" y="28" width="2" height="6" /><rect x="52" y="28" width="2" height="6" /><rect x="4" y="18" width="2" height="7" />
        <rect x="7" y="21" width="8" height="4" /><rect x="9" y="17" width="5" height="4" /><rect x="14" y="19" width="36" height="6" />
        <rect x="58" y="22" width="11" height="2" /><rect x="59" y="24" width="1" height="10" /><rect x="67" y="24" width="1" height="10" />
      </g>
      <rect className="handset" x="60" y="20" width="7" height="2" />
    </svg>
  )
}

/** brief-v4.1 §4.3 + §4.2: one pinned scene. The phrase edits itself (K2), the model lights desk by desk
 *  over 90 days, night turns to day, the three exchanges play with the scroll. DOM driven by domScenes;
 *  the render itself is drawn by the engine (the <picture> is the fallback). */
const DESK_NAMES: Record<string, string> = { receptionist: 'Reception', followup: 'Follow-up', bookkeeper: 'Bookkeeper', admanager: 'Ad manager', social: 'Social media', analyst: 'Analyst' }
const DESK_ORDER = ['receptionist', 'followup', 'bookkeeper', 'admanager', 'social', 'analyst']
function Office() {
  const lines = office.talk.flatMap((t) => [{ desk: t.from, name: t.fromName, text: t.q }, { desk: t.to, name: t.toName, text: t.a }])
  return (
    <section className="office" data-scene="office" aria-labelledby="office-h">
      <div className="stage office-stage">
        <div className="k2-wrap" data-k2-wrap>
          <h2 id="office-h" className="k2" data-dark aria-label={office.h2.join(' ')}>
            {office.rest.map((rest, i) => (
              <span key={rest} className="k2-line" data-k2-line={i} aria-hidden="true">
                <span className="k2-swap"><span className="k2-old">{office.human}</span><span className="k2-new">{office.agent}</span></span>{' '}
                <span className="k2-rest">{rest}</span>
              </span>
            ))}
          </h2>
        </div>
        <div className="office-quad" data-office-quad>
          <picture className="office-fallback">
            <source media="(max-width: 767px)" srcSet={`${officeDayP780} 780w`} sizes="100vw" />
            <img src={officeDay1440} srcSet={`${officeDay1440} 1440w`} sizes="(max-width: 767px) 100vw, 80vw" alt={office.alt} width="1440" height="1246" loading="lazy" decoding="async" />
          </picture>
          {DESK_ORDER.map((id, k) => <span key={id} className="desk-tag" data-desk-tag={k} data-on="false" aria-hidden="true">{DESK_NAMES[id]}</span>)}
          {lines.map((l, i) => <p key={i} className="balloon" data-balloon={i} data-desk={l.desk} data-on="false" aria-hidden="true">{l.text}</p>)}
          <div className="dayline" aria-hidden="true">
            <span className="dayline-track" /><span className="dayline-lit" data-dayline-lit />
            <span className="dayline-mark" data-dayline-mark><span className="dayline-label">Day <span data-day-number>0</span></span></span>
          </div>
        </div>
        <ol className="talk-seq" aria-hidden="true">
          {lines.map((l, i) => <li key={i} data-talk={i} data-on={i === 0 ? 'true' : 'false'}><span className="who">{l.name}</span>{l.text}</li>)}
        </ol>
        {/* readable everywhere (AT, no JS, reduced): the desks and their (sample) days, the exchanges */}
        <div className="office-text">
          <p className="office-line-label">{office.lineLabel} <span className="modelo">(sample plan)</span></p>
          <ol className="desk-list">{days.desks.map((d) => <li key={d.name}><span>{d.name}</span> <span className="t">Day {d.day}</span></li>)}</ol>
          <ul className="talk-list">{office.talk.map((t) => <li key={t.q}><span className="who">{t.fromName}:</span> {t.q} <span className="who">{t.toName}:</span> {t.a}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}

// ---------- the scroll-driven yes (brief-v4.1 §4.5): progress follows the finger, consequences play in time
type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 // 0 idle, 1 arrive#0, 2 sent#0, 3 arrive#1, 4 sent#1, 5 arrive#2, 6 declined#2, 7 clear
const T = [0.08, 0.27, 0.38, 0.55, 0.66, 0.85, 0.88]
const FILL: [number, number][] = [[0.13, 0.27], [0.41, 0.55], [0.71, 0.85]]
const TRAVEL: [number, number][] = [[0, 0.08], [0.3, 0.38], [0.58, 0.66]]
const DWELL = [0, 500, 425, 500, 425, 500, 400, 300] // ms each step needs before the next may play (≤ 2× speed)
const AGENT_OF = [0, 1, 4] // hero agent index of each order: follow-up, bookkeeper, receptionist

function You() {
  const [step, setStep] = useState<Step>(reduced ? 7 : 0)
  const fillRef = useRef<HTMLDivElement>(null)
  const declineRef = useRef<HTMLDivElement>(null)
  const sec = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduced) return
    let shown: Step = 0, at = 0, clearAt = -1, rec = -1
    const task = (now: number) => {
      const el = sec.current
      if (!el) return false
      const r = el.getBoundingClientRect()
      const vh = innerHeight
      if (r.bottom < 0 || r.top > vh) { bus.sim.travel = -1; return false }
      const pNew = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh)))
      // brief-v4.2 §6 + T5: the stage grew by 0.4 screen (the finale) + 0.3 (the silence). The thresholds keep
      // their old scroll distances (old span / new span), so everything up to the clear plays as before.
      const portrait = innerWidth < 768
      const span = portrait ? 1.8 : 2.3
      const p = pNew * span / (portrait ? 1.2 : 1.6)
      // v4.3 (coordinator): the finale ends lit and clean through the silence; it recedes only as the stage
      // leaves for the FAQ (the stage's bottom edge entering the screen), never as its resting state
      const recede = Math.min(1, Math.max(0, (vh - r.bottom) / (vh * 0.6)))
      if (recede !== rec && phoneRef.current) { rec = recede; phoneRef.current.style.setProperty('--rec', recede.toFixed(3)) }
      // hysteresis ±0.01 around each threshold
      let target = 0
      for (let i = 0; i < T.length; i++) if (p >= T[i] + (i + 1 > shown ? 0.01 : -0.01)) target = i + 1
      let keep = false
      if (target < shown) { shown = target as Step; at = now; setStep(shown); bus.phone.lit = shown === 1 || shown === 3 || shown === 5 ? 1 : 0 }
      else if (target > shown) {
        // recover in sequence: never skip a "Sent" without showing it
        if (now - at >= DWELL[shown]) {
          shown = (shown + 1) as Step; at = now; setStep(shown)
          if (shown === 2 || shown === 4) { bus.rise = { at: now, src: 'phone' }; bus.phone.lit = 0 }
          if (shown === 6) bus.phone.lit = 0
          if (shown === 1 || shown === 3 || shown === 5) bus.phone.lit = 1
          if (shown === 7) { bus.phone.lit = 0; clearAt = now }
        }
        keep = true
      }
      // the column of the finale leaves the phone 600 ms after the clear: the engine's rise, at its largest
      if (shown === 7 && clearAt >= 0) { if (now - clearAt >= 600) { bus.rise = { at: now, src: 'phone' }; clearAt = -1 } else keep = true }
      if (shown < 7) clearAt = -1
      const order = shown <= 2 ? 0 : shown <= 4 ? 1 : 2
      const waiting = shown === 1 || shown === 3 || shown === 5
      const [f0, f1] = FILL[order]
      const fill = waiting ? Math.min(1, Math.max(0, (p - f0) / (f1 - f0))) : shown === 2 || shown === 4 || shown === 6 ? 1 : 0
      bus.sim.fill = order < 2 ? fill : 0
      bus.sim.agent = shown >= 7 ? -1 : AGENT_OF[order]
      const [t0, t1] = TRAVEL[shown <= 1 ? 0 : shown <= 3 ? 1 : 2]
      bus.sim.travel = (shown === 0 || shown === 2 || shown === 4) && p >= t0 && p < t1 ? (p - t0) / (t1 - t0) : -1
      const target2 = order < 2 ? fillRef.current : declineRef.current
      const other = order < 2 ? declineRef.current : fillRef.current
      if (target2) target2.style.setProperty('--fill', String(fill))
      if (other) other.style.setProperty('--fill', '0')
      return keep
    }
    ticker.add(task)
    return () => { ticker.remove(task); bus.sim.agent = -1; bus.sim.travel = -1; bus.phone.lit = 0 }
  }, [])
  const order = step <= 2 ? 0 : step <= 4 ? 1 : 2
  const o = you.orders[order]
  const state = step === 0 ? 'idle' : step === 7 ? 'clear' : step === 2 || step === 4 ? 'sent' : step === 6 ? 'declined' : 'waiting'
  const live = state === 'waiting' ? you.arriving(o.desk) : state === 'sent' ? o.sent : state === 'declined' ? you.declined : state === 'clear' ? you.lock.live : ''
  return (
    <section className="you" data-scene="you" aria-labelledby="you-h" ref={sec}>
      <div className="stage you-stage" data-you-stage>
        <h2 id="you-h" className="you-h" aria-label={you.h2}>
          <span className="you-a" data-dark aria-hidden="true">{you.split[0]}</span>
          <span className="you-b" data-dark data-k4={step >= 2 ? 'on' : 'off'} aria-hidden="true">{you.split[1]}</span>
        </h2>
        <p className="sr-only">{you.script}</p>
        <p className="sr-only" aria-live="polite">{live}</p>
        <div className="phone" data-phone data-state={state} aria-hidden="true" ref={phoneRef}>
          <span className="phone-energy" />
          <span className="phone-colw"><span className="phone-col" /></span>
          <div className="screen">
            {state === 'clear' ? <LockScreen /> : (
              <div className="order" key={order} data-in={state === 'idle' ? 'false' : 'true'}>
                <p className="top">{o.top.join(' · ')}</p>
                <p className="ask">{o.ask}</p>
                <p className="why">{o.why}</p>
                <p className="preview">{o.preview}</p>
                <div className="actions">
                  <div className="approve" data-act={order < 2 ? 'approve' : undefined}>
                    {/* the same .btn box as the fill (padding, gap, arrow): the two labels sit exactly on top of each other */}
                    <div className="btn approve-base" aria-hidden="true"><BtnBody>{you.approve}</BtnBody></div>
                    <div className="btn approve-fill" ref={fillRef}><BtnBody>{you.approve}</BtnBody></div>
                  </div>
                  <div className="ghost is-off">{you.edit}</div>
                  <div className="ghost decline" ref={declineRef}><span className="decline-fill" />{you.decline}</div>
                </div>
              </div>
            )}
            <p className="phone-status">{state === 'clear' || state === 'idle' ? '' : live}</p>
          </div>
        </div>
        <span className="net-tag" data-net-tag aria-hidden="true">{agents[AGENT_OF[order]]}</span>
      </div>
      <div className="phone-static">
        {/* brief-v4.2 §6, reduced motion: waiting · sent · all clear (the declined order stays in the text) */}
        {you.orders.slice(0, 2).map((ord, i) => (
          <div key={ord.ask} className="phone-mini">
            <p className="top">{ord.top.join(' · ')}</p>
            <p className="ask">{ord.ask}</p>
            <p className="phone-status">{i === 0 ? you.arriving(ord.desk) : ord.sent}</p>
          </div>
        ))}
        <div className="phone-mini lock-mini"><LockScreen /></div>
      </div>
    </section>
  )
}

/** v4.5 the footer (owner's reference: thin columns of links on top, a big landscape of grain at the base): four
 *  columns, then the logo as a mountain of points (footPeak.ts, canvas 2D) standing on the giant wordmark, and a
 *  base line with the live hour of Sydney. The landscape is decoration (aria-hidden); every word is in the columns. */
function Footer() {
  const [time, setTime] = useState('')
  const peak = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const f = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Sydney', hour: '2-digit', minute: '2-digit', hour12: false })
    let timer = 0
    const tick = () => { setTime(f.format(new Date())); timer = window.setTimeout(tick, 60000 - (Date.now() % 60000) + 50) }
    tick()
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => (peak.current ? initFootPeak(peak.current, reduced) : undefined), [])
  const c = footer.cols
  return (
    <footer className="foot" data-ground-scene="foot">
      <nav className="foot-cols" aria-label="Footer">
        <div className="foot-col">
          <h2 className="foot-h">{c.product.h}</h2>
          <ul>{c.product.links.map(([t, h]) => <li key={h}><a href={h}>{t}</a></li>)}</ul>
        </div>
        <div className="foot-col">
          <h2 className="foot-h">{c.company.h}</h2>
          <ul>
            {c.company.links.map(([t, h]) => <li key={h}><a href={h}>{t}</a></li>)}
            <li className="foot-live">{time ? footer.live(time) : ''}</li>
            <li className="foot-dim">{footer.abn}</li>
          </ul>
        </div>
        <div className="foot-col">
          <h2 className="foot-h">{c.legal.h}</h2>
          <ul>
            <li><a href="/privacy">{footer.privacy}</a></li>
            <li className="foot-dim foot-note">{footer.note}</li>
          </ul>
        </div>
        <div className="foot-col">
          <h2 className="foot-h">{c.contact.h}</h2>
          <ul>
            <li><a href={`mailto:${footer.email}`}>{footer.email}</a></li>
            <li><a href="tel:+61255501234">{footer.phone}</a></li>
          </ul>
        </div>
      </nav>
      <div className="foot-land" aria-hidden="true">
        <p className="foot-word">BrandUp</p>
        <canvas ref={peak} className="foot-peak" />
      </div>
      <p className="foot-copy">{footer.copy}</p>
    </footer>
  )
}

function LockScreen() {
  return (
    <div className="lock">
      <span className="lock-fill" />
      <p className="lock-time">{you.lock.time}</p>
      <p className="lock-status">{you.lock.l1}<br />{you.lock.l2}</p>
      <p className="lock-sum">{you.lock.summary}</p>
    </div>
  )
}

/** brief-v4.1 §4.8: questions as balloons on the logo's field; the reading cursor answers them; each
 *  answered one sends its dot up to the apex. Answers are always in the layout (no overlap, Ctrl+F). */
function Faq() {
  return (
    <section className="sec faq" data-scene="faq" aria-labelledby="faq-h">
      <div className="faq-head"><Lines id="faq-h" lines={[faq.h2]} /></div>
      <ol className="faq-list">
        {faq.items.map(([qq, a], i) => (
          <li key={qq} className="faq-item" data-faq={i} data-side={i % 2 ? 'r' : 'l'} data-state="open">
            <button type="button" className="faq-q" aria-expanded="true" aria-controls={`faq-a-${i}`} data-faq-q={i}>
              <span className="faq-dot" aria-hidden="true" />{qq}
            </button>
            <p className="faq-a" id={`faq-a-${i}`}>{a}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
