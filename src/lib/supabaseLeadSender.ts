import type { LeadSender } from './submitLead'

/**
 * The real transport, written for the swap day and NOT wired yet (the prototype uses createSimulatedSender).
 *
 * To turn it on (docs/redesign/plano-producao.md §2):
 *   createLeadSubmitter({ sender: supabaseLeadSender, readAttribution, onConfirmed: markLeadConfirmed })
 *   and on `sent` → window.location.assign('/thank-you') (ThankYou fires the Pixel Lead with the same eventID).
 *
 * - `./supabase` is imported here, lazily: that module throws without the env vars, so a static import would break the
 *   prerender (ssr.tsx) and put the client on the LCP path.
 * - Insert WITHOUT `.select()`: anon has INSERT only, and RLS would refuse the read-back.
 * - postgrest-js does not throw on a failed fetch: it resolves with status 0. That case is re-thrown so the submitter
 *   classifies it as a network error; an HTTP answer (409 / 23505 for a resend, 400 for a CHECK) comes back as a code.
 * - postgrest-js retries only GET/HEAD/OPTIONS, so this POST is never retried behind our back.
 */
export const supabaseLeadSender: LeadSender = async (row, signal) => {
  const { supabase } = await import('./supabase')
  const { error, status } = await supabase.from('leads').insert(row).abortSignal(signal)
  if (!error) return { ok: true }
  if (status === 0 || signal.aborted) throw new Error(signal.aborted ? 'aborted' : 'no response')
  return { ok: false, code: error.code || String(status) }
}
