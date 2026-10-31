import { useEffect, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import NumberFlow, { continuous } from '@number-flow/react'
import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  MessageCircle,
  Search,
  Star,
  Target,
  TrendingUp,
  Utensils,
} from 'lucide-react'
import { supabase } from './lib/supabase'
import Testimonials from './Testimonials'
import './App.css'

const assetBaseUrl = import.meta.env.BASE_URL
const heroImageUrl = `${assetBaseUrl}agnes-restaurant.png`

function BrandIcon() {
  return (
    <svg className="brand-icon" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 5 L35 33 L5 33 Z"
        stroke="#9232ea"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="#9232ea"
      />
      <path d="M20 13 L26 22 L14 22 Z" fill="#ffffff" />
      <rect x="17.5" y="21" width="5" height="9" rx="2.5" fill="#ffffff" />
    </svg>
  )
}

const services = [
  {
    icon: Search,
    image: `${assetBaseUrl}service-local-diagnosis.png`,
    title: 'Local diagnosis',
    text: 'We audit competitors, average ticket, prime hours, and high-intent Google demand around your venue.',
  },
  {
    icon: Clapperboard,
    image: `${assetBaseUrl}service-creatives.png`,
    title: 'Cravings-driven creatives',
    text: 'Campaign concepts, offers, and visuals designed to elevate delivery, bookings, and dine-in demand.',
  },
  {
    icon: Target,
    image: `${assetBaseUrl}service-paid-media.png`,
    title: 'Paid media',
    text: 'Meta, Google, and remarketing campaigns built to scale bookings, orders, and repeat visits.',
  },
  {
    icon: MessageCircle,
    image: `${assetBaseUrl}service-whatsapp-funnel.png`,
    title: 'WhatsApp funnel',
    text: 'Lead capture, qualification, and follow-up flows that turn interest into booked tables.',
  },
  {
    icon: Utensils,
    image: `${assetBaseUrl}service-digital-menu.png`,
    title: 'Digital menu',
    text: 'Refined digital menus that spotlight signature items and guide guests toward higher-value orders.',
  },
  {
    icon: BarChart3,
    image: `${assetBaseUrl}service-reporting.png`,
    title: 'Clear reporting',
    text: 'Executive reporting on revenue, cost per lead, reservations, orders, and channel-level return.',
  },
]

const faqs = [
  {
    question: 'Does BrandUp work only with restaurants in Australia?',
    answer:
      'Our main focus is Australia, with strategies for restaurants, coffee shops, pizzerias, bars, and dark kitchens that need predictable growth.',
  },
  {
    question: 'Do I need an in-house marketing team?',
    answer:
      'No. The goal is to operate as your dedicated external team, covering strategy, creatives, campaigns, optimization, and data analysis.',
  },
  {
    question: 'How long does it take to see results?',
    answer:
      'The first signals usually appear in the first few weeks, but the plan is measured in monthly cycles to improve offer, audience, and conversion.',
  },
  {
    question: 'Do you create ads and creatives?',
    answer:
      'Yes. We create campaign angles, copy, visual direction, and ad structures for Meta, Google, and conversion channels.',
  },
]

type HeroStatItemProps = {
  active: boolean
  value: number
  prefix?: string
  suffix?: string
  delay?: number
  label: string
}

const SHUFFLE_STEPS = 10
const SHUFFLE_SETTLE_EASING =
  'linear(0, 0.0033, 0.0141, 0.0326, 0.0588, 0.0927, 0.1343, 0.1835, 0.2399, 0.3032, 0.3728, 0.4479, 0.5274, 0.6101, 0.6948, 0.7804, 0.8654, 0.9488, 1.029, 1.104, 1.174, 1.237, 1.292, 1.34, 1.379, 1.41, 1.433, 1.447, 1.453, 1.452, 1.444, 1.429, 1.409, 1.384, 1.356, 1.325, 1.292, 1.259, 1.225, 1.192, 1.16, 1.131, 1.103, 1.079, 1.057, 1.039, 1.023, 1.01, 1, 0.992, 0.986, 0.982, 0.98, 0.98, 0.981, 0.983, 0.986, 0.989, 0.993, 0.997, 1)'
const canAnimateNumbers = () =>
  typeof window !== 'undefined'
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const getDigitCount = (number: number) =>
  String(Math.abs(Math.floor(number))).length

const randomWithSameDigits = (target: number, exclude = target) => {
  const digits = getDigitCount(target)
  const min = digits === 1 ? 0 : 10 ** (digits - 1)
  const max = 10 ** digits - 1

  if (min === max) {
    return min
  }

  let random = exclude

  while (random === exclude) {
    random = Math.floor(Math.random() * (max - min + 1)) + min
  }

  return random
}

function HeroStatItem({
  active,
  value,
  prefix,
  suffix,
  delay = 0,
  label,
}: HeroStatItemProps) {
  const [animatedValue, setAnimatedValue] = useState(value)
  const [isSettling, setIsSettling] = useState(false)

  useEffect(() => {
    if (!active || !canAnimateNumbers()) {
      setAnimatedValue(value)
      return undefined
    }

    let cancelled = false
    const timeouts: number[] = []
    let elapsed = delay
    let previous = randomWithSameDigits(value)

    setIsSettling(false)
    setAnimatedValue(previous)

    for (let step = 0; step < SHUFFLE_STEPS; step += 1) {
      const isFinalStep = step === SHUFFLE_STEPS - 1
      const progress = step / (SHUFFLE_STEPS - 1)
      const gap = 110 + progress * progress * 230

      elapsed += gap

      const nextValue = isFinalStep
        ? value
        : randomWithSameDigits(value, previous)
      previous = nextValue

      timeouts.push(
        window.setTimeout(() => {
          if (cancelled) {
            return
          }

          setIsSettling(isFinalStep)
          setAnimatedValue(nextValue)
        }, elapsed),
      )
    }

    return () => {
      cancelled = true
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId))
    }
  }, [active, value, delay])

  const spinDuration = isSettling ? 1050 : 340

  return (
    <div className="hero-stat-card" style={{ '--stat-delay': `${delay}ms` } as CSSProperties}>
      <NumberFlow
        aria-label={`${prefix ?? ''}${value}${suffix ?? ''}`}
        className="hero-stat-number"
        opacityTiming={{ duration: 260, easing: 'ease-out' }}
        plugins={[continuous]}
        prefix={prefix}
        spinTiming={{
          duration: spinDuration,
          easing: isSettling ? SHUFFLE_SETTLE_EASING : 'ease-in-out',
        }}
        suffix={suffix}
        transformTiming={{ duration: spinDuration, easing: 'ease-in-out' }}
        trend={1}
        value={animatedValue}
      />
      <span>{label}</span>
    </div>
  )
}

function App() {
  const [serviceBeltDuration, setServiceBeltDuration] = useState(30)
  const [heroStatsActive, setHeroStatsActive] = useState(false)
  const [leadFormStatus, setLeadFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    if (String(formData.get('website') ?? '')) {
      form.reset()
      setLeadFormStatus('success')
      return
    }

    setLeadFormStatus('submitting')

    const { error } = await supabase.from('leads').insert({
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim().toLowerCase(),
      phone: String(formData.get('phone') ?? '').trim(),
      company: String(formData.get('company') ?? '').trim(),
      monthly_revenue: String(formData.get('revenue') ?? ''),
      source: 'brandupadvisory.com',
      status: 'new',
    })

    if (error) {
      console.error('Lead submission failed', error)
      setLeadFormStatus('error')
      return
    }

    form.reset()
    setLeadFormStatus('success')
  }

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal-on-scroll'),
    )

    if (!revealElements.length) {
      return undefined
    }

    let animationFrame = 0
    const clamp = (value: number) => Math.min(Math.max(value, 0), 1)

    const updateReveal = () => {
      animationFrame = 0
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const start = viewportHeight * 1.06
      const end = viewportHeight * 0.7

      revealElements.forEach((element, index) => {
        const { top } = element.getBoundingClientRect()
        const isLastReveal = index === revealElements.length - 1
        const itemStart = isLastReveal ? viewportHeight * 1.2 : start
        const itemEnd = isLastReveal ? viewportHeight * 0.84 : end
        const progress = clamp((itemStart - top) / (itemStart - itemEnd))
        const eased = progress * progress * (3 - 2 * progress)
        const translateY = (1 - eased) * 64
        const blur = (1 - eased) * 20

        element.style.setProperty('--reveal-opacity', eased.toFixed(3))
        element.style.setProperty('--reveal-y', `${translateY.toFixed(2)}px`)
        element.style.setProperty('--reveal-blur', `${blur.toFixed(2)}px`)
      })
    }

    const requestRevealUpdate = () => {
      if (animationFrame) {
        return
      }
      animationFrame = window.requestAnimationFrame(updateReveal)
    }

    updateReveal()
    window.addEventListener('scroll', requestRevealUpdate, { passive: true })
    window.addEventListener('resize', requestRevealUpdate)

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
      window.removeEventListener('scroll', requestRevealUpdate)
      window.removeEventListener('resize', requestRevealUpdate)
    }
  }, [])

  useEffect(() => {
    let timeoutId = 0
    const frameId = window.requestAnimationFrame(() => {
      timeoutId = window.setTimeout(() => {
        setHeroStatsActive(true)
      }, 650)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(timeoutId)
    }
  }, [])


  const scrollToForm = () => {
    document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })
  }

  const moveCarousel = (direction: 'left' | 'right') => {
    setServiceBeltDuration((currentDuration) => {
      const nextDuration = direction === 'right'
        ? currentDuration - 4
        : currentDuration + 4

      return Math.min(Math.max(nextDuration, 14), 46)
    })
  }

  return (
    <main>
      <section
        className="hero"
        aria-label="BrandUp"
        style={{
          backgroundImage: `url("${heroImageUrl}")`,
        }}
      >
        <div className="section-inner hero-inner">
          <div className="nav">
            <a className="brand" href="#top" aria-label="BrandUp home">
              <span>Brand</span>Up
              <BrandIcon />
            </a>
            <div className="nav-actions">
              <div className="socials" aria-label="Social media">
                <a href="https://www.facebook.com/profile.php?id=61591164172060&locale=pt_BR" aria-label="Facebook BrandUp" target="_blank" rel="noreferrer">
                  <img src="https://cdn.simpleicons.org/facebook/ffffff" alt="" aria-hidden="true" />
                </a>
                <a href="https://www.instagram.com/brandup.aus/" aria-label="Instagram BrandUp" target="_blank" rel="noreferrer">
                  <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="" aria-hidden="true" />
                </a>
                <a href="https://wa.me/?text=I%20want%20to%20receive%20more%20information%20about%20BrandUp" aria-label="WhatsApp BrandUp" target="_blank" rel="noreferrer">
                  <img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="" aria-hidden="true" />
                </a>
              </div>
              <button className="nav-cta" type="button" onClick={scrollToForm}>
                <span>Diagnosis</span>
                <ArrowRight aria-hidden="true" size={18} />
              </button>
            </div>
          </div>

          <div className="hero-content">
            <h1>
              HOW RESTAURANTS ARE GENERATING <strong>OVER $250K PER MONTH</strong>{' '}
              WITHIN 90 DAYS BY INVESTING IN MARKETING.
            </h1>
            <p className="hero-copy">
              The best digital marketing and online presence strategies to put
              you at the top when customers search, compare, and decide where to
              eat. We have already generated <strong>OVER 10 MILLION</strong>{' '}
              in sales for our clients.
            </p>
            <div className="hero-actions">
              <button className="primary-action" type="button" onClick={scrollToForm}>
                Grow my restaurant
                <ArrowRight aria-hidden="true" size={19} />
              </button>
            </div>
          </div>

          <div
            className={`hero-stats ${heroStatsActive ? 'is-active' : ''}`}
            aria-label="BrandUp indicators"
          >
            <HeroStatItem
              active={heroStatsActive}
              delay={80}
              label="to validate offers and channels"
              suffix=" days"
              value={90}
            />
            <HeroStatItem
              active={heroStatsActive}
              delay={180}
              label="traffic, creative, and conversion"
              suffix=" fronts"
              value={3}
            />
            <HeroStatItem
              active={heroStatsActive}
              delay={280}
              label="revenue generated by our clients"
              prefix="$"
              suffix="k"
              value={250}
            />
          </div>
        </div>
      </section>

      <section className="notice-form" id="diagnostic">
        <div className="section-inner notice-inner">
          <div className="notice-left">
            <p className="eyebrow">Notice</p>
            <h2 className="reveal-on-scroll">
              <strong>Do not leave now!</strong> You are only a few seconds away
              from helping your restaurant <strong>sell more.</strong>
            </h2>

            <div className="notice-steps" aria-label="How the contact process works">
              <article className="notice-card reveal-on-scroll">
                <span className="notice-number">1</span>
                <div>
                  <h3>Complete the form</h3>
                  <p>
                    <strong>Share your information</strong> in the form beside
                    this section. Your data is kept safe and will only be used
                    for contact.
                  </p>
                </div>
              </article>

              <article className="notice-card reveal-on-scroll">
                <span className="notice-number">2</span>
                <div>
                  <h3>Get a personalized call</h3>
                  <p>
                    Within <strong>up to 5 minutes</strong> during business
                    hours, one of our specialists will{' '}
                    <strong>contact you directly</strong> to schedule the most
                    important meeting with you.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <form
            className="lead-form"
            aria-label="Diagnosis form"
            onInput={() => {
              if (leadFormStatus !== 'idle' && leadFormStatus !== 'submitting') {
                setLeadFormStatus('idle')
              }
            }}
            onSubmit={handleLeadSubmit}
          >
            <label className="form-honeypot" aria-hidden="true">
              Website
              <input
                autoComplete="off"
                name="website"
                tabIndex={-1}
                type="text"
              />
            </label>
            <label className="field-compact">
              <span className="sr-only">Name</span>
              <input
                autoComplete="name"
                minLength={2}
                name="name"
                placeholder="Your name"
                required
                type="text"
              />
            </label>
            <label className="field-compact">
              <span className="sr-only">Email</span>
              <input
                autoComplete="email"
                name="email"
                placeholder="Your best email"
                required
                type="email"
              />
            </label>
            <label className="field-compact">
              <span className="sr-only">Phone number</span>
              <input
                autoComplete="tel"
                minLength={6}
                name="phone"
                placeholder="WhatsApp number"
                required
                type="tel"
              />
            </label>
            <label className="field-compact">
              <span className="sr-only">Company name</span>
              <input
                autoComplete="organization"
                minLength={2}
                name="company"
                placeholder="Company name"
                required
                type="text"
              />
            </label>
            <label className="full">
              What is your monthly revenue?
              <select name="revenue" defaultValue="" required>
                <option value="" disabled>
                  Select your revenue
                </option>
                <option>Up to AUD 30k</option>
                <option>AUD 30k to AUD 80k</option>
                <option>AUD 80k to AUD 150k</option>
                <option>Above AUD 150k</option>
              </select>
            </label>
            <button
              className="primary-action full"
              disabled={leadFormStatus === 'submitting'}
              type="submit"
            >
              {leadFormStatus === 'submitting'
                ? 'Sending information...'
                : 'Get more information'}
            </button>
            <p
              className={`lead-form-message ${leadFormStatus}`}
              role={leadFormStatus === 'error' ? 'alert' : 'status'}
            >
              {leadFormStatus === 'success' &&
                'Thank you. Your information was received successfully.'}
              {leadFormStatus === 'error' &&
                'We could not send your information. Please try again.'}
            </p>
          </form>
        </div>
      </section>

      <Testimonials />

      <section className="about" id="about-us">
        <div className="section-inner about-inner">
          <div className="about-image reveal-on-scroll" aria-hidden="true" />
          <div className="section-copy reveal-on-scroll">
            <p className="eyebrow">About us</p>
            <h2>A leader in restaurant marketing for brands that need to sell every day.</h2>
            <p>
              We are an agency specialized in restaurants, coffee shops, and delivery
              operations. We combine market intelligence, high-converting
              creatives, and campaign management to create consistent demand.
            </p>
            <div className="proof-row">
              <span><Star aria-hidden="true" size={18} /> Offer</span>
              <span><TrendingUp aria-hidden="true" size={18} /> Performance</span>
              <span><Utensils aria-hidden="true" size={18} /> Food service</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-inner">
          <div className="section-heading services-heading reveal-on-scroll">
            <p className="eyebrow">What do we do?</p>
            <h2>A growth system to help your restaurant get seen, convert, and retain customers.</h2>
          </div>

          <div className="service-carousel" aria-label="BrandUp services">
            <button className="carousel-nav carousel-nav-left" type="button" onClick={() => moveCarousel('left')} aria-label="Slow down services">
              <ChevronLeft aria-hidden="true" size={24} />
            </button>
            <div
              className="service-track"
              style={{ '--service-belt-duration': `${serviceBeltDuration}s` } as CSSProperties}
            >
              {[0, 1].map((groupIndex) => (
                <div
                  className="service-belt-group"
                  key={groupIndex}
                  aria-hidden={groupIndex === 1}
                >
                  {services.map(({ icon: Icon, image, title, text }) => (
                    <article
                      className="service-card"
                      key={`${groupIndex}-${title}`}
                      style={{
                        backgroundImage: `linear-gradient(145deg, rgba(9, 6, 12, 0.76), rgba(9, 6, 12, 0.28)), linear-gradient(180deg, rgba(9, 6, 12, 0.08), rgba(9, 6, 12, 0.82)), url("${image}")`,
                      }}
                    >
                      <Icon aria-hidden="true" size={28} />
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
              ))}
            </div>
            <button className="carousel-nav carousel-nav-right" type="button" onClick={() => moveCarousel('right')} aria-label="Speed up services">
              <ChevronRight aria-hidden="true" size={24} />
            </button>
          </div>
        </div>
      </section>

      <section className="team">
        <div className="section-inner team-inner">
          <div className="section-copy team-copy">
            <p className="eyebrow reveal-on-scroll">Get an exclusive team</p>
            <h2 className="reveal-on-scroll">Strategy, creatives, and performance working as an extension of your operation.</h2>
            <p className="reveal-on-scroll">
              You work with a team that understands menus, margins, peak hours,
              reservations, and recurrence. Fewer scattered campaigns, more
              commercial rhythm.
            </p>
            <button className="primary-action team-cta reveal-on-scroll" type="button" onClick={scrollToForm}>
              Get more information
            </button>
          </div>
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-title">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Frequently asked questions</p>
            <h2 id="faq-title">What restaurants usually ask before getting started.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="section-inner footer-inner">
          <div>
            <a className="brand" href="#top" aria-label="BrandUp home">
              <span>Brand</span>Up
              <BrandIcon />
            </a>
            <p>Marketing agency focused on restaurants in Australia.</p>
            <p className="legal">ABN: 00 000 000 000</p>
          </div>
          <div className="socials" aria-label="Social media">
            <a href="https://www.facebook.com/profile.php?id=61591164172060&locale=pt_BR" aria-label="Facebook BrandUp" target="_blank" rel="noreferrer">
              <img src="https://cdn.simpleicons.org/facebook/ffffff" alt="" aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/brandup.aus/" aria-label="Instagram BrandUp" target="_blank" rel="noreferrer">
              <img src="https://cdn.simpleicons.org/instagram/ffffff" alt="" aria-hidden="true" />
            </a>
            <a href="https://wa.me/?text=I%20want%20to%20receive%20more%20information%20about%20BrandUp" aria-label="WhatsApp BrandUp" target="_blank" rel="noreferrer">
              <img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
