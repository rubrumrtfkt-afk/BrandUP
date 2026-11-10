import type { LeadSender } from './submitLead'

// senior-review I1: which transport a submit uses, kept pure and separate from Proto.tsx (which cannot be loaded
// by the plain-module test harness tests/*.test.mjs use — it pulls in React, the WebGL engine and `?url` asset
// imports). Everything here is plain functions and injected dependencies, so it is fully behaviour-tested.

export type SenderEnv = { dev: boolean; hostname: string; search: string }

// senior-review: a whitelist, not a blacklist — the one line that decides whether a real visitor's money-path
// insert could ever be swapped for one that sends nothing. A blacklist of "not brandupadvisory.com" would quietly
// start treating any OTHER real host (a copy deployed to a wrong domain, a DNS slip) as safe to simulate; a
// whitelist of known-local hosts fails closed instead: anything not explicitly local uses the real sender.
const SIMULATED_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]'])

/** True only when the simulated sender may run: dev always (there is no local .env, a real insert would just
 *  throw), or `?send=` on one of the local hosts above — a probe run locally against a built preview, never a
 *  real visit. Any other host, `?send=` or not, always uses the real sender. */
export function wantsSimulatedSender(env: SenderEnv): boolean {
  return env.dev || (new URLSearchParams(env.search).has('send') && SIMULATED_HOSTS.has(env.hostname))
}

/** Resolves the transport once, lazily, on the first call — and remembers which kind it picked, so the caller
 *  can gate a conversion-only side effect (markLeadConfirmed) on `isReal()`: the simulated sender never actually
 *  sent anything, so it must never count as a conversion, in production or in dev. */
export function createLazySender(options: {
  env?: SenderEnv
  /** Dynamically imported only if actually reached (never in a normal production visit's bundle graph). */
  loadSimulated: () => Promise<LeadSender>
  real: LeadSender
}): { send: LeadSender; isReal: () => boolean | null } {
  const env = options.env ?? { dev: import.meta.env.DEV, hostname: location.hostname, search: location.search }
  let picked: { send: LeadSender; isReal: boolean } | null = null
  const send: LeadSender = async (row, signal) => {
    if (!picked) {
      picked = wantsSimulatedSender(env)
        ? { send: await options.loadSimulated(), isReal: false }
        : { send: options.real, isReal: true }
    }
    return picked.send(row, signal)
  }
  return { send, isReal: () => (picked ? picked.isReal : null) }
}
