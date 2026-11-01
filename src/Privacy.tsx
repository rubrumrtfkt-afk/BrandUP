import { useEffect } from 'react'
import './StaticPage.css'

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy policy | BrandUp'
  }, [])

  return (
    <main className="static-page">
      <div className="static-page-inner">
        <p className="static-page-eyebrow">Legal</p>
        <h1>Privacy policy</h1>
        <p>Last updated: 31 October 2026</p>

        <h2>Who we are</h2>
        <p>
          BrandUp is a marketing and automation agency for Australian businesses. This policy explains how we
          handle personal information collected through brandupadvisory.com.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>Details you enter in our form: name, email, phone, company and monthly revenue range.</li>
          <li>How you reached us: the ad or link you clicked, click identifiers from Meta and Google, the page you landed on and the referring website.</li>
          <li>Website activity collected by the Meta Pixel, such as pages viewed and whether a form was sent.</li>
        </ul>

        <h2>Why we use it</h2>
        <p>
          We use it to respond to your enquiry, talk to you about our services, and measure and
          improve our advertising. We do not sell your personal information.
        </p>

        <h2>How we collect and store information</h2>
        <p>
          We collect enquiry details when you submit our website form and store them in our
          Supabase database. Our authorised team uses them to manage your enquiry. Campaign
          parameters are kept in your browser for up to 30 days and attached to a form you submit.
          We do not ask you to put personal information in campaign links.
        </p>

        <h2>Who we share it with</h2>
        <p>
          We use service providers to run this website and our advertising, including Supabase
          (database), GitHub (hosting) and Meta (advertising measurement). These providers may store
          or process information outside Australia.
        </p>

        <h2>Cookies and the Meta Pixel</h2>
        <p>
          The Meta Pixel uses cookies and similar technologies so Meta can measure our ads and show
          them to relevant audiences. You can manage this in your{' '}
          <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noreferrer">Meta ad preferences</a>{' '}
          and in your browser settings.
        </p>

        <h2>Access, correction and marketing</h2>
        <p>
          You can ask to access or correct your information, or ask us to stop contacting you, by
          emailing <a href="mailto:brandupinbox@gmail.com">brandupinbox@gmail.com</a>.
        </p>

        <h2>Retention and deletion requests</h2>
        <p>
          Contact us at the email above to request deletion or to ask how long we need your
          enquiry information. Archiving an enquiry in our dashboard does not delete it. Browser
          attribution expires after 30 days; this does not automatically delete an enquiry you
          have already submitted.
        </p>

        <h2>Complaints</h2>
        <p>
          Email us first and we will respond within a reasonable time. If you are not satisfied, you
          can contact the Office of the Australian Information Commissioner at{' '}
          <a href="https://www.oaic.gov.au" target="_blank" rel="noreferrer">oaic.gov.au</a>.
        </p>

        <a className="static-page-link" href="/">Back to the website</a>
      </div>
    </main>
  )
}
