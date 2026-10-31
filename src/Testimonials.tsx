import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Michael Bennett',
    initials: 'MB',
    quote: 'I used to finish a full day at the restaurant and still have to figure out what to post. Most nights, I just didn’t have the energy. Since working with BrandUp, our content feels more consistent and actually reflects the care we put into our food. For me, the biggest difference is being able to head home without feeling like I’ve left another job unfinished.',
  },
  {
    name: 'Sofia Mitchell',
    initials: 'SM',
    quote: 'We’ve always been proud of what comes out of our kitchen, but our online presence never quite matched it. BrandUp took the time to understand our food, our customers, and the atmosphere we’ve worked hard to create. When I look at our page now, I recognize our restaurant in it. That might sound like a small thing, but when you’ve built a business from scratch, it means a lot.',
  },
  {
    name: 'Daniel Carter',
    initials: 'DC',
    quote: 'Before BrandUp, I would put money into ads and hope for the best. I knew we needed marketing, but I couldn’t really explain what we were doing or why. Their team walked me through the plan and made room for my questions. Having someone explain the decisions in plain language has made me feel much more involved and comfortable with the process.',
  },
  {
    name: 'Emily Parker',
    initials: 'EP',
    quote: 'Our menu had grown over the years, and we’d kept adding dishes without thinking much about the layout. It had become a lot to take in. BrandUp helped us organize it and give the dishes we’re most proud of the attention they deserved. The first time I held the new version, I thought, ‘This finally feels like our restaurant.’ It was a change we’d put off for too long.',
  },
]

export default function Testimonials() {
  const rail = useRef<HTMLDivElement>(null)
  const [navigation, setNavigation] = useState({ page: 0, pages: 1 })

  const measure = () => {
    const element = rail.current
    const card = element?.firstElementChild
    if (!element || !card) return
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap)
    const maxScroll = Math.max(0, element.scrollWidth - element.clientWidth)
    // Layout rounds scrollWidth to whole pixels; ignore the subpixel remainder.
    const pages = Math.max(1, Math.ceil(Math.max(0, maxScroll - 3) / step) + 1)
    const page = element.scrollLeft >= maxScroll - 3
      ? pages - 1
      : Math.min(pages - 1, Math.round(element.scrollLeft / step))
    setNavigation((previous) => previous.page === page && previous.pages === pages
      ? previous : { page, pages })
  }

  useEffect(() => {
    const element = rail.current
    if (!element) return
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const goToPage = (page: number) => {
    const element = rail.current
    const card = element?.firstElementChild
    if (!element || !card) return
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(element).columnGap)
    element.scrollTo({
      left: Math.max(0, Math.min(page, navigation.pages - 1)) * step,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  return (
    <section className="written-testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div className="written-testimonials-inner">
        <div className="written-testimonials-heading">
          <p className="written-testimonials-eyebrow">Testimonials</p>
          <h2 id="testimonials-title">In their own words.<br />In their <span>own businesses.</span></h2>
          <p className="written-testimonials-intro">The people, the everyday challenges,<br />and what working with BrandUp means to them.</p>
        </div>
        <div className="testimonial-rail" id="testimonial-rail" ref={rail} onScroll={measure} tabIndex={0} aria-label="Written testimonials; scroll to read all four">
          {testimonials.map((item) => (
            <figure className="testimonial-card" key={item.name}>
              <span className="testimonial-quote-mark" aria-hidden="true">“</span>
              <blockquote><p>{item.quote}</p></blockquote>
              <figcaption>
                <span className="testimonial-avatar" aria-hidden="true">{item.initials}</span>
                <span><strong>{item.name}</strong><span className="testimonial-role">Owner</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="testimonial-navigation" hidden={navigation.pages <= 1}>
          <div className="testimonial-dots" aria-label="Choose testimonial page">
            {Array.from({ length: navigation.pages }, (_, page) => (
              <button className={page === navigation.page ? 'is-active' : ''} key={page}
                type="button" onClick={() => goToPage(page)} aria-controls="testimonial-rail"
                aria-label={`Show testimonial page ${page + 1}`} aria-current={page === navigation.page ? 'true' : undefined} />
            ))}
          </div>
          <div className="testimonial-arrows">
            <span className="testimonial-page">{String(navigation.page + 1).padStart(2, '0')} / {String(navigation.pages).padStart(2, '0')}</span>
            <button type="button" onClick={() => goToPage(navigation.page - 1)} disabled={navigation.page === 0} aria-label="Previous testimonials" aria-controls="testimonial-rail"><ChevronLeft size={17} aria-hidden="true" /></button>
            <button type="button" onClick={() => goToPage(navigation.page + 1)} disabled={navigation.page === navigation.pages - 1} aria-label="Next testimonials" aria-controls="testimonial-rail"><ChevronRight size={17} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
