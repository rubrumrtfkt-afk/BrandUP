const STORAGE_KEY = 'brandup-attribution'
const LEAD_CONFIRMED_KEY = 'brandup-lead-confirmed'
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', 'gclid', 'offer', 'placement', 'partner', 'link_id'] as const
export type Attribution = Partial<Record<(typeof PARAMS)[number] | 'landing_page' | 'referrer', string>>

// Accept the demo's short labels too; they never verify identity or qualification.
const aliases: Record<string, string> = { utm_source: 's', utm_campaign: 'c', utm_content: 'm', offer: 'o', placement: 'p', partner: 'k' }
const sources: Record<string, string> = { meta: 'facebook', ig: 'instagram', fb: 'facebook', wa: 'whatsapp', qr: 'qr', ref: 'referral' }

export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search)
    const click: Attribution = {}
    for (const key of PARAMS) {
      const value = (params.get(key) || params.get(aliases[key] ?? ''))?.trim()
      if (value) click[key] = value.slice(0, key === 'link_id' ? 100 : 300)
    }
    if (!params.has('utm_source') && click.utm_source) click.utm_source = sources[click.utm_source] ?? click.utm_source
    if (params.get('s') === 'meta' && !click.utm_medium) click.utm_medium = 'paid'
    if (!Object.keys(click).length && (Object.keys(readAttribution()).length || /^\/(thank-you|privacy)\/?$/.test(window.location.pathname))) return
    const attribution: Attribution = { ...click,
      landing_page: `${window.location.pathname}${window.location.search}`.slice(0, 500),
      referrer: safeReferrer(document.referrer) }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ at: Date.now(), attribution }))
  } catch { /* The enquiry still works when browser storage is blocked. */ }
}

// A referrer from a Supabase auth link would store its token in leads.referrer.
export function safeReferrer(referrer: string): string | undefined {
  if (/[?&#](token_hash|access_token|refresh_token)=/i.test(referrer)) return undefined
  return referrer.slice(0, 500) || undefined
}

export function readAttribution(): Attribution {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (!stored || !Number.isFinite(stored.at) || Date.now() - stored.at > MAX_AGE_MS || Date.now() < stored.at) return {}
    return Object.fromEntries([...PARAMS, 'landing_page', 'referrer'].flatMap(key =>
      typeof stored.attribution?.[key] === 'string' ? [[key, stored.attribution[key].slice(0, key === 'link_id' ? 100 : key === 'landing_page' || key === 'referrer' ? 500 : 300)]] : []))
  } catch { return {} }
}

export function markLeadConfirmed(eventId: string) {
  try { sessionStorage.setItem(LEAD_CONFIRMED_KEY, eventId) } catch { /* Never guess a conversion. */ }
}

export function trackConfirmedLead() {
  try {
    const eventId = sessionStorage.getItem(LEAD_CONFIRMED_KEY)
    if (!eventId || !window.fbq) return
    window.fbq('track', 'Lead', {}, { eventID: eventId })
    sessionStorage.removeItem(LEAD_CONFIRMED_KEY)
  } catch { /* Tracking must never break the page. */ }
}
