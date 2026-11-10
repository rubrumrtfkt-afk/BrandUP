import { useEffect } from 'react'
import { trackConfirmedLead } from './lib/attribution'
import { StaticPage } from './StaticPage'
import { form } from './proto/content'

// juri-v58 item 1: the exact phrase the landing's own success state shows (content.ts, one source — the owner's
// "5 minutes during business hours" wording lives there, not duplicated here), split at the sentence boundary
// into the title + the supporting line, the same shape this page already had.
const [headline, ...rest] = form.success.split(/(?<=\.)\s+/)

export default function ThankYou() {
  useEffect(() => {
    document.title = 'Thank you | BrandUp'
    trackConfirmedLead()
  }, [])

  return (
    <StaticPage eyebrow="Thank you" title={headline}>
      <p>{rest.join(' ')}</p>
    </StaticPage>
  )
}
