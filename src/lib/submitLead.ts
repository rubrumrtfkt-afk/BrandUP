import type { Attribution } from './attribution'

// The lead contract with the CRM (docs/redesign/admin-crm-inventario.md §1, §2, §9). Pure on purpose: no Supabase,
// no DOM, only `import type`, so tests/submitLead.test.mjs loads it as-is and the prerender never pulls the client.

export type LeadField = 'name' | 'company' | 'email' | 'phone' | 'revenue'
export type LeadInput = Record<LeadField, string> & { website?: string }

/** = the CHECKs of public.leads (supabase/migrations/20260721143800_create_leads.sql, char_length(trim(x))). */
export const LEAD_MAX_LENGTH = { name: 120, company: 160, email: 320, phone: 30 } as const

/** = the monthly_revenue CHECK and the four cases of revenueGrade() in leadboard.ts. Change all three together
 *  (migration first: a string the CHECK does not know makes every submission fail). */
export const REVENUE_VALUES = ['Up to AUD 30k', 'AUD 30k to AUD 80k', 'AUD 80k to AUD 150k', 'Above AUD 150k'] as const

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Australian mobile, typed as the national number (the +61 is a visual prefix): 412 345 678, 0412…, +61 412…
 *  Returns E.164 (+614XXXXXXXX) or null. Landlines are refused (pending owner decision, plano-producao §2). */
export function toAuMobileE164(value: string): string | null {
  let digits = value.replace(/\D/g, '')
  if (digits.startsWith('61')) digits = digits.slice(2)
  if (digits.startsWith('0')) digits = digits.slice(1)
  return /^4\d{8}$/.test(digits) ? `+61${digits}` : null
}

export function validateLeadField(field: LeadField, value: string): 'empty' | 'invalid' | null {
  const text = value.trim()
  if (!text) return 'empty'
  if (field === 'name' || field === 'company') return text.length >= 2 && text.length <= LEAD_MAX_LENGTH[field] ? null : 'invalid'
  if (field === 'email') return EMAIL.test(text) && text.length <= LEAD_MAX_LENGTH.email ? null : 'invalid'
  if (field === 'phone') return toAuMobileE164(text) ? null : 'invalid'
  return (REVENUE_VALUES as readonly string[]).includes(value) ? null : 'invalid'
}

export const LEAD_FIELDS: readonly LeadField[] = ['name', 'company', 'email', 'phone', 'revenue']
export const firstInvalidField = (input: LeadInput) => LEAD_FIELDS.find((k) => validateLeadField(k, input[k]) !== null)

/** The row, field for field the insert of src/App.tsx (plus the client id that makes a resend idempotent). */
export type LeadRow = Attribution & {
  id: string; name: string; email: string; phone: string; company: string; monthly_revenue: string
  source: 'brandupadvisory.com'; status: 'new'; meta_event_id: string
}

export function buildLeadPayload(input: LeadInput, attempt: { id: string; metaEventId: string }, attribution: Attribution): LeadRow {
  return {
    id: attempt.id,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    // validated before this point; the raw trim is only the defensive fallback the CHECK still bounds
    phone: toAuMobileE164(input.phone) ?? input.phone.trim(),
    company: input.company.trim(),
    monthly_revenue: input.revenue,
    source: 'brandupadvisory.com', // RLS: the insert policy accepts only this source…
    status: 'new', // …and this status
    meta_event_id: attempt.metaEventId,
    ...attribution, // readAttribution() is an allowlist: it can never add id, source or status
  }
}

/** The transport. It resolves `{ ok: true }`, resolves `{ ok: false, code }` for an answer from the server, and THROWS
 *  for anything that never got an answer (offline, DNS, abort). It must not retry: the caller decides. */
export type LeadSendResult = { ok: true } | { ok: false; code: string }
export type LeadSender = (row: LeadRow, signal: AbortSignal) => Promise<LeadSendResult>

export type SubmitOutcome =
  | { status: 'sent'; eventId: string }
  | { status: 'honeypot' }
  | { status: 'invalid'; field: LeadField }
  | { status: 'busy' } // another submission of this page is still pending
  | { status: 'aborted' } // the form unmounted: nobody to tell
  | { status: 'error'; kind: 'network'; timedOut: boolean }
  | { status: 'error'; kind: 'server'; code: string }

export type LeadSubmitterOptions = {
  sender: LeadSender
  readAttribution: () => Attribution
  /** markLeadConfirmed(eventId) with the real sender; left out with the simulated one (no conversion to count). */
  onConfirmed?: (eventId: string) => void
  timeoutMs?: number
  uuid?: () => string
  /** Only the outcome kind and the server code: never a field value (no personal data in logs). */
  log?: (event: 'lead_submit_failed', detail: { kind: 'network' | 'server'; code?: string; timedOut?: boolean }) => void
}

const UNIQUE_VIOLATION = '23505' // the row with this id is already in: an earlier attempt landed

export function createLeadSubmitter(options: LeadSubmitterOptions) {
  const { sender, readAttribution, onConfirmed, timeoutMs = 12_000 } = options
  const uuid = options.uuid ?? (() => crypto.randomUUID())
  const log = options.log ?? ((event, detail) => console.warn(event, detail))
  // One pending submission for the whole page (two forms share this instance), and one attempt per form: a resend
  // after an error reuses its id, so a first try that did land comes back as 23505 instead of a second lead.
  let pending = false
  const attempts = new Map<string, { id: string; metaEventId: string }>()

  async function submit(formId: string, input: LeadInput, signal?: AbortSignal): Promise<SubmitOutcome> {
    if (pending) return { status: 'busy' }
    // the honeypot: a person never sees the field; a bot gets the success screen and nothing is written or counted
    if (input.website?.trim()) return { status: 'honeypot' }
    const invalid = firstInvalidField(input)
    if (invalid) return { status: 'invalid', field: invalid }
    if (signal?.aborted) return { status: 'aborted' }

    let attempt = attempts.get(formId)
    if (!attempt) { attempt = { id: uuid(), metaEventId: uuid() }; attempts.set(formId, attempt) }
    const row = buildLeadPayload(input, attempt, readAttribution())

    pending = true
    const controller = new AbortController()
    const forward = () => controller.abort()
    signal?.addEventListener('abort', forward, { once: true })
    let timedOut = false
    const timer = setTimeout(() => { timedOut = true; controller.abort() }, timeoutMs)
    // a sender that ignores its signal still cannot hold the form past the timeout
    const stopped = new Promise<'stopped'>((resolve) => controller.signal.addEventListener('abort', () => resolve('stopped'), { once: true }))
    try {
      const result = await Promise.race([sender(row, controller.signal), stopped])
      if (result === 'stopped') throw new DOMException('Aborted', 'AbortError')
      if (!result.ok && result.code !== UNIQUE_VIOLATION) {
        log('lead_submit_failed', { kind: 'server', code: result.code })
        return { status: 'error', kind: 'server', code: result.code }
      }
      attempts.delete(formId)
      onConfirmed?.(attempt.metaEventId)
      return { status: 'sent', eventId: attempt.metaEventId }
    } catch (error: unknown) {
      if (!timedOut && signal?.aborted) return { status: 'aborted' }
      // no answer from the server: offline, DNS, CORS, timeout. The error object can carry the URL, so only the kind is logged
      log('lead_submit_failed', { kind: 'network', timedOut, code: error instanceof Error ? error.name : 'unknown' })
      return { status: 'error', kind: 'network', timedOut }
    } finally {
      clearTimeout(timer)
      signal?.removeEventListener('abort', forward)
      pending = false
    }
  }

  return { submit, isPending: () => pending }
}
