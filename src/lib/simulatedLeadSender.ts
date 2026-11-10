import type { LeadSender } from './submitLead'

export type SimulatedSendMode = 'ok' | 'fail' | 'slow'

/** The prototype's transport: nothing leaves the browser. `ok` answers after ~900 ms; `fail` throws like a dropped
 *  connection (→ network error); `slow` never answers, so the submitter's 12-s timeout fires (→ network error, timed out).
 *  It honours the abort signal like a real fetch. Picked in the prototype with ?send=fail / ?send=slow. */
export function createSimulatedSender(mode: SimulatedSendMode = 'ok', delayMs = 900): LeadSender {
  return (_row, signal) => new Promise((resolve, reject) => {
    const abort = () => { clearTimeout(timer); reject(new DOMException('Aborted', 'AbortError')) }
    const timer = mode === 'slow' ? undefined : setTimeout(() => {
      signal.removeEventListener('abort', abort)
      if (mode === 'fail') reject(new TypeError('Failed to fetch'))
      else resolve({ ok: true })
    }, delayMs)
    if (signal.aborted) abort()
    else signal.addEventListener('abort', abort, { once: true })
  })
}

export function simulatedModeFrom(search: string): SimulatedSendMode {
  const mode = new URLSearchParams(search).get('send')
  return mode === 'fail' || mode === 'slow' ? mode : 'ok'
}
