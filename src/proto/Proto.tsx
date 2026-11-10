import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type FormEvent, type MouseEvent, type ReactNode } from 'react'
import { bus } from './bus'
import { agents, days, faq, fields, final, footer, form, hero, night, office, revenue, you, type FieldKey } from './content'
import { testimonials, testimonialsHead } from './testimonials'
import { initDomScenes } from './domScenes'
import { initTesti } from './testiScene'
import { initGround } from './ground'
import { initFootPeak } from './footPeak'
import { initSmoothScroll } from './smoothScroll'
import { POSTER_T, deskBoards, doneAt, initNightShift } from './nightShift'
import { initOrla, type OrlaId } from './orla'
import { NODES, YOU_HOLD, netFrame, netToScreen } from './layout'
import { ticker } from './ticker'
import officeDay1440 from './assets/office-day-1440.webp?url'
import officeDayP780 from './assets/office-day-p780.webp?url'
import posterHero1440 from './assets/poster-hero-1440.webp?url'
import posterHero390 from './assets/poster-hero-390.webp?url'

const hasWindow = typeof window !== 'undefined'
const reduced = hasWindow && matchMedia('(prefers-reduced-motion: reduce)').matches
// brief-v4.3 §10.3, "em avaliação" (the owner decides by seeing): ?scrollhint=0, ?finalnames=0 (brief-v4.4 §7: the
// FAQ's phone and its flag are gone)
const flag = (k: string) => !hasWindow || new URLSearchParams(location.search).get(k) !== '0'
const names = flag('finalnames')
const scrollHint = flag('scrollhint')
// brief-v4.6 §4.5, em avaliação: ?sig=0 turns off the signature that writes itself
const sig = flag('sig')

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
            <p className="lede" data-dark="16" data-in="voice-body">{form.lede}</p>
          </div>
          {/* v55e (owner: the dotted tray under the form read as a box and competed with the horizon): no orla here */}
          <LeadForm id="diagnostic" />
          <div className="horizon" data-horizon="diagnostic" data-beam="96" aria-hidden="true" />
        </section>
        <Night />
        <Office />
        <You />
        <Faq />
        <Testimonials />
        <section className="sec final" data-scene="final" aria-labelledby="final-h">
          {/* brief-v4.3 §5.3: the six agents of the hero's base, same order, light one per word of the question */}
          <div className="final-dots" data-final-dots>
            {agents.map((a, i) => (
              <span key={a} className="fd" data-fd={i} data-on="true" style={{ ['--i' as string]: i }}>
                {names ? <button type="button" className="fd-hit" aria-label={a}><span className="agent-name" aria-hidden="true">{a}</span></button> : null}
              </span>
            ))}
          </div>
          <p className="sr-only">{final.team}</p>
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
          <LeadForm id="final-form" orla="final" compact />
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
    <h2 id={id} className="k1" data-dark data-in="voice-h2" aria-label={lines.join(' ')}>
      {lines.map((l, i) => <span key={l} className="k1-line" aria-hidden="true"><span style={{ ['--i' as string]: i }}>{l}</span></span>)}
    </h2>
  )
}

/** The action button ("field", the owner's pick 09/11): the silk material, the light gathers around it in the engine. */
function BtnBody({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="btn-label">{children}</span>
      <svg className="btn-arrow" viewBox="12 11 16 21" width="10" height="13" aria-hidden="true"><path d="M20 13 L26 22 L14 22 Z" /><rect x="17.5" y="21" width="5" height="9" rx="2.5" /></svg>
    </>
  )
}

function Logo() {
  return (
    // width/height in the markup (brief-v4.5 §4.5): before the stylesheet (dev injects it from JS) an SVG without them
    // paints at the width of the screen: the giant purple triangle of the 1st frame of a reload
    // v55 the intro builds it (proto.html): the triangle, then the word, then the arrow rises from under the base, clipped
    // to the triangle (the clip never cuts the arrow at rest: it sits inside)
    <svg className="logo" viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
      <defs><clipPath id="logo-clip"><path d="M20 5 L35 33 L5 33 Z" /></clipPath></defs>
      <path className="logo-tri" d="M20 5 L35 33 L5 33 Z" fill="#9232EA" stroke="#9232EA" strokeWidth="2" strokeLinejoin="round" />
      <g clipPath="url(#logo-clip)">
        <g className="logo-arw">
          <path d="M20 13 L26 22 L14 22 Z" fill="#FFFFFF" />
          <rect x="17.5" y="21" width="5" height="9" rx="2.5" fill="#FFFFFF" />
        </g>
      </g>
    </svg>
  )
}
/** Ordered-dot fills for the DOM pieces that show light without WebGL (fallback triangle). */
function PatternDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
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

/** The still poster of the hero network: ONLY where the engine never runs (reduced motion, ?gl=0, Save-Data, ≤ 2 GB,
 *  no WebGL2). v52 keeps the v4.5 continuity: with the engine there is no poster to swap (the network appears once, as
 *  the intro hands over, and never disappears). A canvas is not an LCP candidate: the H1 stays the LCP. */
function PosterCanvas({ desktop, mobile, className }: { desktop: string; mobile: string; className: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let cancelled = false
    const root = document.documentElement
    const wanted = () => root.classList.contains('gl-off') || root.classList.contains('reduced')
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
    if (wanted()) { draw(); return () => { cancelled = true } }
    const mo = new MutationObserver(() => { if (wanted()) { mo.disconnect(); draw() } })
    mo.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => { cancelled = true; mo.disconnect() }
  }, [desktop, mobile])
  return <canvas ref={ref} className={className} aria-hidden="true" />
}

/** v52 hero: the long hook (copy v5.4 B) on the left, the network of light on the right (the engine), as before v4.5.
 *  One <h1>, its lines INLINE (with <br>) so the whole heading is one LCP text block: the frame (smaller, lower tone)
 *  holds "$250K per month" (the hook size of before, the one maximum emphasis, a <strong>). */
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
        <h1 id="h1" data-dark>
          <span className="h-frame">{hero.h1[0]}</span><br />
          {/* element timing on the line that carries the promise (its own text node): the probe reads when the H1 paints */}
          <strong className="h-giant" {...{ elementtiming: 'hero-h1' }}>{hero.h1[1]}</strong><br />
          <span className="h-frame">{hero.h1[2]}</span>
        </h1>
        <p className="lede" data-dark="16">{hero.lede[0]}<strong>{hero.lede[1]}</strong>{hero.lede[2]}</p>
        <a className="btn" href="#diagnostic" data-act="hero"><BtnBody>{hero.cta}</BtnBody></a>
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

function LeadForm({ id, orla, compact = false }: { id: string; orla?: OrlaId; compact?: boolean }) {
  const formRef = useRef<HTMLFormElement>(null)
  const orlaRef = useRef<HTMLCanvasElement>(null)
  // brief-v4.4 §9: the orla around the form; its horizon (the sibling [data-horizon]) is the line of its base
  useEffect(() => {
    const f = formRef.current, c = orlaRef.current
    return f && c && orla ? initOrla(c, f, { id: orla, reduced, baseEl: f.parentElement?.querySelector<HTMLElement>('[data-horizon]') }) : undefined
  }, [orla])
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
    <form id={id} ref={formRef} className={compact ? 'lead compact' : 'lead'} data-dark={compact ? '' : undefined} data-in="voice-control" noValidate onSubmit={onSubmit}>
      {orla && <canvas ref={orlaRef} className="orla" aria-hidden="true" />}
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
                onChange={(e) => set(f.key, e.target.value)}
                // v54 (jury v53: 4 red errors for whoever only Tabs through): a field is judged on leaving it only once
                // something was typed in it; an empty field is judged on submit
                onBlur={(e) => { if (e.currentTarget.value.trim() !== '') setTouched((t) => ({ ...t, [f.key]: true })) }} />
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
  const boards = deskBoards(POSTER_T) // the poster frame (02:14): what no-JS, reduced motion and the 1st paint show
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
            <ul className="desks">
              {night.desks.map((d, i) => (
                <li key={d.name} className="desk" data-desk={i} data-work="false" data-dark="8" style={{ ['--i' as string]: i }}>
                  <span className="fig"><Seated /><span className="beam" /></span>
                  <span className="desk-label">
                    <span className="dname"><span className="long">{d.name}</span><span className="short">{d.short}</span></span>
                    {/* brief-v4.4 §4.2 the shift board: the hour + what it just did, and the one before (40 %, 1440 only) */}
                    <span className="dboard"><span className="dstack" data-stack>
                      {boards[i].length ? boards[i].map((l, k) => (
                        <span key={l.time} className={k ? 'dline prev' : 'dline'}><span className="dh">{l.time}</span> <span className="dtk">{l.task}</span></span>
                      )) : <span className="dline dnone" />}
                    </span></span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="home" data-home data-lit="false">
            <p className="place" data-dark="10">{night.home}</p>
            <span className="sleeper"><Sleeper /><span className="phone-aura" /></span>
            {/* §4.4: the count of the night, fed by the packets that reach the phone (digit roll, tabular) */}
            <p className="tally" data-dark="10"><span className="ncount" data-count><span className="cd">{doneAt(POSTER_T)}</span></span> <span className="tally-l">{night.count}</span></p>
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
  // v54 (jury v53: office-day-p780 fetched twice): the engine draws the render from its own texture, so the <picture>
  // only exists where it is shown: reduced motion or no WebGL (html.reduced / html.gl-off, set by main.tsx, maybe after
  // mount) and, without JS, inside <noscript> (a page with JS never fetches what a <noscript> holds)
  const [fallback, setFallback] = useState(false)
  useEffect(() => {
    const root = document.documentElement
    const check = () => { if (root.classList.contains('reduced') || root.classList.contains('gl-off')) setFallback(true) }
    check()
    const mo = new MutationObserver(check)
    mo.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => mo.disconnect()
  }, [])
  const picture = (
    <picture className="office-fallback">
      <source media="(max-width: 767px)" srcSet={`${officeDayP780} 780w`} sizes="100vw" />
      <img src={officeDay1440} srcSet={`${officeDay1440} 1440w`} sizes="(max-width: 767px) 100vw, 80vw" alt={office.alt} width="1440" height="1246" loading="lazy" decoding="async" />
    </picture>
  )
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
          {fallback ? picture : <noscript>{picture}</noscript>}
          {DESK_ORDER.map((id, k) => <span key={id} className="desk-tag" data-desk-tag={k} data-on="false" aria-hidden="true">{DESK_NAMES[id]}</span>)}
          {/* brief-v4.4 §5.3: as the order leaves the follow-up desk (C4 s 0–.40) */}
          <span className="desk-tag order-tag" data-order-tag data-on="false" aria-hidden="true">{office.orderTag}</span>
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

// ---------- the scroll-driven yes (brief-v4.3 §4.4): 2.0 screens, p = 0…1 over the one pinned screen of scroll.
// The phone enters with order 1 already on it; the scroll fills the button (the finger IS the yes): "Approving…",
// a 2-px line under the screen, then the press (scale .96 → 1, once), "Approved", and a dot runs down the wire to the
// agent. Order 3 fills Decline instead. Then the finale, then the phone recedes to the left (the FAQ's anchor).
type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 // 0 idle, 1 arrive#0, 2 sent#0, 3 arrive#1, 4 sent#1, 5 arrive#2, 6 declined#2, 7 clear
const T = [-0.02, 0.285, 0.33, 0.47, 0.52, 0.70, 0.74]
const FILL: [number, number][] = [[0.08, 0.28], [0.35, 0.465], [0.55, 0.695]]
const TRAVEL: [number, number][] = [[0.285, 0.33], [0.47, 0.52]] // the dot runs phone → agent after each yes
const DWELL = [0, 600, 425, 500, 425, 500, 400, 300] // ms each step needs before the next may play (≤ 2× speed; order 1 ≥ 600 ms)
const AGENT_OF = [0, 1, 4] // hero agent index of each order: follow-up, bookkeeper, receptionist

function GestureLabel({ words }: { words: readonly [string, string, string] }) {
  return <><span className="g-idle">{words[0]}</span><span className="g-go">{words[1]}</span><span className="g-done">{words[2]}</span></>
}

function You() {
  const [step, setStep] = useState<Step>(reduced ? 7 : 1)
  const fillRef = useRef<HTMLDivElement>(null)
  const declineRef = useRef<HTMLDivElement>(null)
  const sec = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reduced) return
    let shown: Step = 1, at = 0, clearAt = -1, g = ''
    const task = (now: number) => {
      const el = sec.current
      const phone = phoneRef.current
      if (!el || !phone) return false
      const r = el.getBoundingClientRect()
      const vh = innerHeight
      if (r.bottom < 0 || r.top > vh) { bus.sim.travel = -1; return false }
      // p in units of the first pinned screen (the orders); the YOU_HOLD screens after it only hold the finale
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, (r.height - vh) / (1 + YOU_HOLD))))
      // brief-v4.4 §6: the phone no longer recedes nor fades: after "All clear" it comes apart where it stands (C5,
      // domScenes data-dis + the engine's fragments)
      // hysteresis ±0.01 around each threshold
      let target = 1
      for (let i = 1; i < T.length; i++) if (p >= T[i] + (i + 1 > shown ? 0.01 : -0.01)) target = i + 1
      let keep = false
      if (target < shown) { shown = target as Step; at = now; setStep(shown); bus.phone.lit = shown === 1 || shown === 3 || shown === 5 ? 1 : 0 }
      else if (target > shown) {
        // recover in sequence: never skip a "Sent" without showing it
        if (now - at >= DWELL[shown]) {
          shown = (shown + 1) as Step; at = now; setStep(shown)
          bus.phone.lit = shown === 1 || shown === 3 || shown === 5 ? 1 : 0
          if (shown === 7) { clearAt = now; bus.phone.clearAt = now }
        }
        keep = true
      }
      if (bus.phone.lit === 0 && (shown === 1 || shown === 3 || shown === 5)) bus.phone.lit = 1
      // the column of the finale leaves the phone 600 ms after the clear: the engine's rise, at its largest
      if (shown === 7 && clearAt >= 0) { if (now - clearAt >= 600) { if (bus.c5 < 0.35) bus.rise = { at: now, src: 'phone' }; clearAt = -1 } else keep = true } // v4.9: the rise never leaves a phone that came apart
      if (shown < 7) { clearAt = -1; bus.phone.clearAt = -1 }
      const order = shown <= 2 ? 0 : shown <= 4 ? 1 : 2
      const waiting = shown === 1 || shown === 3 || shown === 5
      const [f0, f1] = FILL[order]
      const fill = waiting ? Math.min(1, Math.max(0, (p - f0) / (f1 - f0))) : shown === 2 || shown === 4 || shown === 6 ? 1 : 0
      bus.sim.fill = order < 2 ? fill : 0
      bus.sim.agent = shown >= 7 ? -1 : AGENT_OF[order]
      const tr = shown === 2 ? TRAVEL[0] : shown === 4 ? TRAVEL[1] : null
      bus.sim.travel = tr && p >= tr[0] && p < tr[1] ? 1 - (p - tr[0]) / (tr[1] - tr[0]) : -1
      const target2 = order < 2 ? fillRef.current : declineRef.current
      const other = order < 2 ? declineRef.current : fillRef.current
      if (target2) target2.style.setProperty('--fill', String(fill))
      if (other) other.style.setProperty('--fill', '0')
      phone.style.setProperty('--fill', String(fill))
      const gNew = shown === 7 ? 'clear' : waiting ? (fill > 0.002 ? 'going' : 'idle') : 'done'
      if (gNew !== g) { g = gNew; phone.dataset.g = g }
      return keep
    }
    ticker.add(task)
    return () => { ticker.remove(task); bus.sim.agent = -1; bus.sim.travel = -1; bus.phone.lit = 0; bus.phone.clearAt = -1 }
  }, [])
  const order = step <= 2 ? 0 : step <= 4 ? 1 : 2
  const o = you.orders[order]
  const state = step === 0 ? 'idle' : step === 7 ? 'clear' : step === 2 || step === 4 ? 'sent' : step === 6 ? 'declined' : 'waiting'
  // aria-live: once per order (the request), once per outcome; never per scroll frame
  const live = state === 'waiting' ? you.arriving(o.desk) : state === 'sent' ? o.sent : state === 'declined' ? you.declined : state === 'clear' ? you.lock.live : ''
  return (
    <section className="you" data-scene="you" aria-labelledby="you-h" ref={sec} style={{ '--you-hold': YOU_HOLD } as CSSProperties}>
      <div className="stage you-stage" data-you-stage>
        <h2 id="you-h" className="you-h" aria-label={you.h2}>
          <span className="you-a" data-dark aria-hidden="true">{you.split[0]}</span>
          <span className="you-b" data-dark data-k4={step >= 2 ? 'on' : 'off'} aria-hidden="true">{you.split[1]}</span>
        </h2>
        <p className="sr-only">{you.script}</p>
        <p className="sr-only" aria-live="polite">{live}</p>
        <div className="phone" data-phone data-state={state} data-g="idle" aria-hidden="true" ref={phoneRef}>
          <span className="phone-energy" />
          <span className="phone-colw"><span className="phone-col" /></span>
          <div className="screen">
            {state === 'clear' ? <LockScreen /> : (
              <div className="order" key={order}>
                <p className="top">{o.top.join(' · ')}</p>
                <p className="ask">{o.ask}</p>
                <p className="why">{o.why}</p>
                <p className="preview">{o.preview}</p>
                <div className="actions">
                  <div className="approve" data-act={order < 2 ? 'approve' : undefined}>
                    {/* the same .btn box as the fill (padding, gap, arrow): the two labels sit exactly on top of each other */}
                    <div className="btn approve-base" aria-hidden="true"><BtnBody><GestureLabel words={you.approveG} /></BtnBody></div>
                    <div className="btn approve-fill" ref={fillRef}><BtnBody><GestureLabel words={you.approveG} /></BtnBody></div>
                  </div>
                  <div className="ghost is-off">{you.edit}</div>
                  <div className="ghost decline" ref={declineRef}><span className="decline-fill" />{order === 2 ? <GestureLabel words={you.declineG} /> : you.decline}</div>
                </div>
              </div>
            )}
            <p className="phone-status">{state === 'clear' || state === 'idle' ? '' : live}</p>
            <span className="phone-prog" />
            {/* brief-v4.4 §5.3: the ring at the front of the circle that lights the screen (2 dither levels, purple) */}
            <span className="rv-ring" />
          </div>
        </div>
        {scrollHint && <p className="scroll-hint" data-dark="12" data-show={step === 1 ? 'true' : 'false'}>{you.scrollHint}</p>}
        {/* brief-v4.5 §9.2: the six names always under their nodes (1440; only the agent whose turn it is at 390), the one
            whose turn it is at full ink with a status line; positions written by the engine with the network */}
        <div className="net-names" data-net-names aria-hidden="true">
          {agents.map((a, i) => {
            const on = step < 7 && AGENT_OF[order] === i
            return (
              <span key={a} className="nn" data-nn={i} data-on={on ? 'true' : 'false'}>
                <span className="nn-name">{a}</span>
                <span className="nn-state">{on ? <span key={`${order}-${state}`}>{you.agentState[state] ?? ''}</span> : null}</span>
              </span>
            )
          })}
        </div>
      </div>
      <div className="phone-static">
        {/* brief-v4.3 §4.4, reduced motion: the three orders with their outcome written, then all clear */}
        {you.orders.map((ord, i) => (
          <div key={ord.ask} className="phone-mini">
            <p className="top">{ord.top.join(' · ')}</p>
            <p className="ask">{ord.ask}</p>
            <p className="phone-status"><span className="mini-out">{i < 2 ? you.approveG[2] : you.declineG[2]}</span> {ord.sent}</p>
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
          <h3 className="foot-h">{c.product.h}</h3>
          <ul>{c.product.links.map(([t, h]) => <li key={h}><a href={h}>{t}</a></li>)}</ul>
        </div>
        <div className="foot-col">
          <h3 className="foot-h">{c.company.h}</h3>
          <ul>
            {c.company.links.map(([t, h]) => <li key={h}><a href={h}>{t}</a></li>)}
            <li className="foot-live">{time ? footer.live(time) : ''}</li>
            <li className="foot-dim">{footer.abn}</li>
          </ul>
        </div>
        <div className="foot-col">
          <h3 className="foot-h">{c.legal.h}</h3>
          <ul>
            <li><a href="/privacy">{footer.privacy}</a></li>
            <li className="foot-dim foot-note">{footer.note}</li>
          </ul>
        </div>
        <div className="foot-col">
          <h3 className="foot-h">{c.contact.h}</h3>
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
    <>
    {/* brief-v4.5 §9.3: the fill is a child of the .screen (inset 0, the screen's radius), no longer of the .lock, whose
        box did not span the screen: it covered only a ~70-px band at the foot */}
    <span className="lock-fill" />
    <div className="lock">
      <p className="lock-time">{you.lock.time}</p>
      <p className="lock-status">{you.lock.l1}<br />{you.lock.l2}</p>
      <p className="lock-sum">{you.lock.summary}</p>
    </div>
    </>
  )
}

/** brief-v4.3 §5.2 / brief-v4.4 §7: one screen, one list; the H2 held in c1–c4 with a human way out under it (the
 *  phone of the yes is gone: its light became the orla around the list); five answers open in two columns.
 *  <details open> in the prerendered HTML: without JS every answer is open; on a phone the last three close. */
function Faq() {
  const listRef = useRef<HTMLDivElement>(null)
  const orlaRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => { const l = listRef.current, c = orlaRef.current; return l && c ? initOrla(c, l, { id: 'faq', reduced }) : undefined }, [])
  useEffect(() => {
    const items = Array.from(listRef.current?.querySelectorAll<HTMLDetailsElement>('details') ?? [])
    const narrow = matchMedia('(max-width: 767px)')
    const apply = () => items.forEach((d, i) => { d.open = !narrow.matches || i < 2 })
    apply()
    narrow.addEventListener('change', apply)
    return () => narrow.removeEventListener('change', apply)
  }, [])
  // on a wide screen the answers are the light of the section: they never close
  const keepOpen = (e: MouseEvent) => { if (!matchMedia('(max-width: 767px)').matches) e.preventDefault() }
  return (
    <section className="sec faq" data-scene="faq" aria-labelledby="faq-h">
      <div className="faq-head">
        <Lines id="faq-h" lines={[faq.h2]} />
        {/* brief-v4.4 §7: the 6th question, answered by a human (the footer's contacts, real links, 44-px targets) */}
        <p className="faq-contact" data-in="voice-body">{faq.contact} <a href={`mailto:${footer.email}`}>{footer.email}</a> <a href="tel:+61255501234">{footer.phone}</a></p>
      </div>
      <div className="faq-list" ref={listRef}>
        <canvas ref={orlaRef} className="orla" aria-hidden="true" />
        {faq.items.map(([qq, a], i) => (
          <details key={qq} className="faq-item" data-faq={i} data-state="other" data-in="voice-q" style={{ ['--q' as string]: Math.min(5, i) }} open>
            <summary className="faq-q" onClick={keepOpen}><span className="q-line"><span>{qq}</span></span></summary>
            <p className="faq-a">{a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

/** brief-v4.5 §11 + brief-v4.6 "a voz chega pelo fio": "In their own words", between the FAQ and the final form. 1440: a
 *  stack with a wire of grain in the gutter whose nodes are the owners' initials; 390: a native scroll-snap rail with a
 *  bar of grain beside the count. testiScene.ts drives the packet, the nodes, the lines and the signature (no React
 *  state per move). The text is the client's, verbatim (testimonials.ts). No JS: the four at 100 %, stacked. */
function Testimonials() {
  const secRef = useRef<HTMLElement>(null)
  useEffect(() => (secRef.current ? initTesti(secRef.current, { reduced, sig }) : undefined), [])
  const n = testimonials.length
  return (
    <section className="sec testi" data-scene="testi" aria-labelledby="testi-h" ref={secRef}>
      <h2 id="testi-h" className="k1 testi-h" data-dark data-in="voice-h2" aria-label={testimonialsHead.h2.join(' ')}>
          {testimonialsHead.h2.map((l, i) => <span key={l} className={i ? 'k1-line t2' : 'k1-line'} aria-hidden="true"><span style={{ ['--i' as string]: i }}>{l}</span></span>)}
      </h2>
      <div className="testi-side">
        <p className="testi-intro" data-in="voice-body">{testimonialsHead.intro}</p>
        {/* taste-skill-ignore: brief-v4.5 §11.2 asks the "01 / 04" reading position (voice of data), not a section label */}
        <div className="testi-meter" aria-hidden="true">
          <p className="testi-count"><span className="tcount" data-tcount><span className="cd">01</span></span> / {String(n).padStart(2, '0')}</p>
          <span className="testi-bar" />
        </div>
      </div>
      <div className="testi-rail" tabIndex={0} role="region" aria-label={`Testimonials, ${n} owners`}>
        <span className="testi-wire" aria-hidden="true" />
        {testimonials.map((t, i) => (
          <figure key={t.name} className="tq" data-tq={i} data-state={i === 0 ? 'current' : 'other'}>
            <blockquote><p>{t.quote}</p></blockquote>
            <figcaption><span className="tq-ini" aria-hidden="true">{t.initials}</span><span className="tq-sig"><span className="tq-name">{t.name}</span> <span className="tq-role">Owner</span></span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
