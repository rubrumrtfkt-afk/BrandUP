import type { LeadSender } from './submitLead'

// senior-review I2: a direct PostgREST insert with fetch, no supabase-js on the landing. The dashboard
// (src/lib/supabase.ts) still uses the real client — it needs Auth, sessions and queries this does not — but the
// landing's one write never justified ~100 KB of client library for a single POST.
//
// - `apikey` + `Authorization: Bearer <key>` with the SAME publishable key supabase-js would have sent: it is
//   public by design (anon-safe; RLS on `public.leads`, not this header, is what protects the table).
// - This never carries a session JWT: the landing has no admin login, and the anon key is the correct credential.
// - `Prefer: return=minimal`: never asks PostgREST for the row back (anon has no SELECT grant; `return=
//   representation` would 400 for a reason that has nothing to do with whether the insert itself worked).
// - A thrown error (network/DNS/CORS/abort) propagates as-is so the submitter classifies it as a network error;
//   an HTTP answer (409/23505 for a resend, 400 for a CHECK) comes back as `{ ok: false, code }`.
// - Not retried: `fetch` itself never retries, and the submitter's own contract forbids it too.

type PostgrestError = { code?: string; message?: string }
export type LeadRestConfig = { url: string; key: string }

const defaultConfig = (): LeadRestConfig => ({
  url: import.meta.env.VITE_SUPABASE_URL,
  key: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
})

/** Pure factory (tests/submitLead.test.mjs calls this directly, with an explicit config, to exercise the real
 *  fetch behaviour against a fake `fetch` — Proto.tsx never calls it with one: see `leadRestSender` below). */
export function createLeadRestSender(config: LeadRestConfig = defaultConfig()): LeadSender {
  if (!config.url || !config.key) throw new Error('VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY are not configured.')
  // senior-review: new URL(..., base) instead of a template string — a trailing slash or stray whitespace in the
  // env var (a copy-paste from the Supabase dashboard) used to change the path instead of being normalised away.
  const endpoint = new URL('rest/v1/leads', config.url.trim().replace(/\/*$/, '/'))
  return async (row, signal) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
      signal,
    })
    if (response.ok) return { ok: true }
    const body: PostgrestError | undefined = await response.json().catch(() => undefined)
    return { ok: false, code: body?.code || String(response.status) }
  }
}

/** The real sender Proto.tsx uses: resolved (and its env vars read, and thrown on if missing) only at the first
 *  actual call — i.e. a real form submit — never at module load. This module IS statically imported (unlike the
 *  simulated sender, which stays behind a dynamic import), so a static top-level env check here would throw on
 *  every single page load with the env vars missing, breaking the landing for everyone instead of just failing
 *  the one submit; the build itself already refuses to ship without them (vite.config.ts, requireSupabaseEnv),
 *  so reaching this throw in production would mean that guard was bypassed.
 */
export const leadRestSender: LeadSender = (() => {
  let resolved: LeadSender | null = null
  return (row, signal) => (resolved ??= createLeadRestSender())(row, signal)
})()
