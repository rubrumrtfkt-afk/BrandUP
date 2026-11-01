import { useEffect } from 'react'
import { trackConfirmedLead } from './lib/attribution'
import './StaticPage.css'

export default function ThankYou() {
  useEffect(() => {
    document.title = 'Thank you | BrandUp'
    trackConfirmedLead()
  }, [])

  return (
    <main className="static-page">
      <div className="static-page-inner">
        <p className="static-page-eyebrow">Thank you</p>
        <h1>We received your details.</h1>
        <p>Someone from BrandUp will get back to you soon to talk about your restaurant.</p>
        <a className="static-page-link" href="/">Back to the website</a>
      </div>
    </main>
  )
}
