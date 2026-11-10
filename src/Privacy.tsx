import { useEffect } from 'react'
import { StaticPage, Todo } from './StaticPage'

// plano-producao §4 + §"O que bloqueia o go-live" item 6, admin-crm-inventario §9.3 item 9: the facts the 31/10
// policy already stated are kept; the Spam Act section is new (its three duties — consent, name the sender, a
// working unsubscribe — are a standing legal commitment, not owner-specific data, so it ships without a Todo).
// Everything only the owner can state (which AI providers see enquiry data, the retention period, whether the
// request e-mail below should be the same one the footer shows the public) is a visible <Todo>.
const CONTACT = 'brandupinbox@gmail.com'

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy policy | BrandUp'
  }, [])

  return (
    <StaticPage eyebrow="Legal" title="Privacy policy">
      {/* no fallback date reads honestly here (the text below changed today) — gone entirely in production
          rather than a dangling "Last updated: ", the same whole-block treatment as Retention below */}
      {import.meta.env.DEV && <p className="muted">Last updated: <Todo>date of the reviewed version, once the owner confirms the text below</Todo></p>}

      <h2>Who we are</h2>
      <p>
        BrandUp builds and runs AI agents and automation for Australian industrial and B2B companies. This policy
        explains how we handle personal information collected through brandupadvisory.com.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Details you enter in our form: name, company, work email, mobile number and monthly revenue range.</li>
        <li>How you reached us: the ad or link you clicked, click identifiers from Meta and Google, the page you landed on and the referring website.</li>
        <li>Website activity collected by the Meta Pixel, such as pages viewed and whether a form was sent.</li>
      </ul>

      <h2>Why we use it</h2>
      <p>
        We use it to respond to your enquiry, talk to you about our services, and measure and improve our
        advertising. We do not sell your personal information.
      </p>

      <h2>AI agents and your information</h2>
      <p>
        We may use AI services to help prepare our reply to your enquiry.{' '}
        <Todo>Which AI providers process enquiry data, for what purpose, and whether they keep or train on it.</Todo>
      </p>

      <h2>How we collect and store information</h2>
      <p>
        We collect enquiry details when you submit our website form and store them in our Supabase database. Our
        authorised team uses them to manage your enquiry. Campaign parameters are kept in your browser for up to
        30 days and attached to a form you submit. We do not ask you to put personal information in campaign links.
      </p>

      <h2>Who we share it with</h2>
      <p>
        We use service providers to run this website and our advertising: Supabase (database), GitHub (hosting),
        Meta (advertising measurement) and, where we use one for your enquiry, an AI service. These providers may
        store or process information outside Australia.
      </p>

      <h2>Cookies and the Meta Pixel</h2>
      <p>
        The Meta Pixel uses cookies and similar technologies so Meta can measure our ads and show
        them to relevant audiences. You can manage this in your{' '}
        <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noreferrer">Meta ad preferences</a>{' '}
        and in your browser settings.
      </p>

      <h2>Emails and messages we send</h2>
      <p>
        We only send commercial emails and messages with your consent, we always identify BrandUp as the sender,
        and every one gives you a way to stop them, as the Spam Act 2003 requires. To stop them at any time, email{' '}
        <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
      </p>

      <h2>Access, correction and deletion requests</h2>
      <p>
        You can ask to access or correct your information, ask us to stop contacting you, or request deletion, by
        emailing <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.{' '}
        <Todo>Whether this should be the same address the footer shows the public, or a dedicated one.</Todo>
      </p>

      <h2>Retention</h2>
      <p>
        {/* the retention period sits mid-sentence, not at a boundary: no sentence survives without it. Gone
            entirely in production, not just the <Todo> span — the two facts after it are decided, and stay. */}
        {import.meta.env.DEV && (
          <>We keep enquiry details for <Todo>retention period, confirmed by the owner</Todo> after our last
          contact with you, then delete them. </>
        )}
        Archiving an enquiry in our dashboard does not delete it. Browser attribution expires after 30 days; this
        does not automatically delete an enquiry you have already submitted.
      </p>

      <h2>Complaints</h2>
      <p>
        Email us first and we will respond within a reasonable time. If you are not satisfied, you
        can contact the Office of the Australian Information Commissioner at{' '}
        <a href="https://www.oaic.gov.au" target="_blank" rel="noreferrer">oaic.gov.au</a>.
      </p>
    </StaticPage>
  )
}
