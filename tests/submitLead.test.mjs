import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'

// Same loader as leadboard.test.mjs: the real modules, transpiled, no test dependency.
async function load(path) {
  const output = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText
  return import(`data:text/javascript;base64,${Buffer.from(output).toString('base64')}`)
}
const lead = await load(new URL('../src/lib/submitLead.ts', import.meta.url))
const sim = await load(new URL('../src/lib/simulatedLeadSender.ts', import.meta.url))
const board = await load(new URL('../src/lib/leadboard.ts', import.meta.url))
const content = await load(new URL('../src/proto/content.ts', import.meta.url))
const rest = await load(new URL('../src/lib/leadRestSender.ts', import.meta.url))
const pick = await load(new URL('../src/lib/pickLeadSender.ts', import.meta.url))

const input = { name: '  Jane Smith ', company: ' Acme Pty Ltd ', email: '  Jane@Company.COM.au ', phone: '0412 345 678', revenue: 'AUD 30k to AUD 80k', website: '' }
const attribution = { utm_source: 'facebook', utm_medium: 'paid', utm_campaign: 'nov', link_id: 'abc', landing_page: '/?s=meta', referrer: 'https://www.instagram.com/' }

function harness({ results = [{ ok: true }], sender, timeoutMs } = {}) {
  const calls = [], logs = [], confirmed = []
  let n = 0
  const submitter = lead.createLeadSubmitter({
    sender: sender ?? (async (row) => { calls.push(row); return results[Math.min(calls.length - 1, results.length - 1)] }),
    readAttribution: () => attribution,
    onConfirmed: (id) => confirmed.push(id),
    uuid: () => `uuid-${++n}`,
    log: (event, detail) => logs.push([event, detail]),
    timeoutMs,
  })
  return { submitter, calls, logs, confirmed }
}

test('The payload is the App.tsx insert, field for field, plus the client id', async () => {
  const { submitter, calls, confirmed } = harness()
  const out = await submitter.submit('diagnostic', input)
  assert.deepEqual(out, { status: 'sent', eventId: 'uuid-2' })
  assert.deepEqual(calls[0], {
    id: 'uuid-1',
    name: 'Jane Smith',
    email: 'jane@company.com.au',
    phone: '+61412345678',
    company: 'Acme Pty Ltd',
    monthly_revenue: 'AUD 30k to AUD 80k',
    source: 'brandupadvisory.com',
    status: 'new',
    meta_event_id: 'uuid-2',
    ...attribution,
  })
  assert.equal('website' in calls[0], false)
  assert.equal('revenue' in calls[0], false)
  assert.deepEqual(confirmed, ['uuid-2'])
})

test('Phone numbers are stored in E.164 whatever the person typed', () => {
  for (const typed of ['412 345 678', '0412345678', '+61 412 345 678', '61412345678', '(04) 1234-5678'])
    assert.equal(lead.toAuMobileE164(typed), '+61412345678', typed)
  for (const typed of ['02 9876 5432', '41234567', '0412 345 6789', 'abc']) assert.equal(lead.toAuMobileE164(typed), null, typed)
  assert.ok('+61412345678'.length <= lead.LEAD_MAX_LENGTH.phone)
})

test('A resend after an error reuses the same id, and 23505 on it counts as sent', async () => {
  const { submitter, calls, confirmed } = harness({ results: [{ ok: false, code: '500' }, { ok: false, code: '23505' }] })
  const first = await submitter.submit('diagnostic', input)
  assert.deepEqual(first, { status: 'error', kind: 'server', code: '500' })
  const second = await submitter.submit('diagnostic', input)
  assert.deepEqual(second, { status: 'sent', eventId: 'uuid-2' })
  assert.equal(calls.length, 2)
  assert.equal(calls[0].id, calls[1].id)
  assert.equal(calls[0].meta_event_id, calls[1].meta_event_id)
  assert.deepEqual(confirmed, ['uuid-2'])
})

test('After a success the next lead from the same form gets a new id', async () => {
  const { submitter, calls } = harness()
  await submitter.submit('diagnostic', input)
  await submitter.submit('diagnostic', input)
  assert.notEqual(calls[0].id, calls[1].id)
})

test('A double submit, and the two forms at once, make one call', async () => {
  const { submitter, calls } = harness()
  const [a, b, c] = await Promise.all([
    submitter.submit('diagnostic', input), submitter.submit('diagnostic', input), submitter.submit('final-form', input)])
  assert.equal(calls.length, 1)
  assert.equal(a.status, 'sent')
  assert.deepEqual(b, { status: 'busy' })
  assert.deepEqual(c, { status: 'busy' })
})

test('The honeypot makes no call and counts no conversion', async () => {
  const { submitter, calls, confirmed } = harness()
  assert.deepEqual(await submitter.submit('diagnostic', { ...input, website: 'https://spam.example' }), { status: 'honeypot' })
  assert.equal(calls.length, 0)
  assert.equal(confirmed.length, 0)
})

test('An invalid form makes no call', async () => {
  const { submitter, calls } = harness()
  assert.deepEqual(await submitter.submit('diagnostic', { ...input, phone: '02 9876 5432' }), { status: 'invalid', field: 'phone' })
  assert.deepEqual(await submitter.submit('diagnostic', { ...input, revenue: 'Under $100K' }), { status: 'invalid', field: 'revenue' })
  assert.equal(calls.length, 0)
})

test('A sender that never answers times out as a network error, with no personal data in the log', async () => {
  const { submitter, logs, confirmed } = harness({ sender: sim.createSimulatedSender('slow'), timeoutMs: 40 })
  const started = Date.now()
  assert.deepEqual(await submitter.submit('diagnostic', input), { status: 'error', kind: 'network', timedOut: true })
  assert.ok(Date.now() - started < 1000)
  assert.equal(confirmed.length, 0)
  assert.equal(submitter.isPending(), false)
  const logged = JSON.stringify(logs)
  for (const value of ['Jane', 'jane@', '412345678', 'Acme']) assert.equal(logged.includes(value), false, value)
})

test('A dropped connection is a network error and the form can resend', async () => {
  const { submitter } = harness({ sender: sim.createSimulatedSender('fail', 5) })
  assert.deepEqual(await submitter.submit('diagnostic', input), { status: 'error', kind: 'network', timedOut: false })
  assert.equal(submitter.isPending(), false)
})

test('Unmounting aborts the request and reports nothing to update', async () => {
  const { submitter, confirmed } = harness({ sender: sim.createSimulatedSender('ok', 200) })
  const controller = new AbortController()
  const pending = submitter.submit('diagnostic', input, controller.signal)
  controller.abort()
  assert.deepEqual(await pending, { status: 'aborted' })
  assert.equal(confirmed.length, 0)
})

test('No automatic retry: one failure, one call', async () => {
  const { submitter, calls } = harness({ results: [{ ok: false, code: '23514' }] })
  await submitter.submit('diagnostic', input)
  assert.equal(calls.length, 1)
})

test('Every revenue option of the form is a string the CHECK and revenueGrade know', () => {
  const migration = fs.readFileSync(new URL('../supabase/migrations/20260721143800_create_leads.sql', import.meta.url), 'utf8')
  assert.equal(content.revenue.options.length, 4)
  for (const { value } of content.revenue.options) {
    assert.notEqual(board.revenueGrade(value), 'unclassified', value)
    assert.ok(lead.REVENUE_VALUES.includes(value), value)
    assert.ok(migration.includes(`'${value}'`), value)
  }
})

test('maxLength matches the CHECKs of public.leads', () => {
  const migration = fs.readFileSync(new URL('../supabase/migrations/20260721143800_create_leads.sql', import.meta.url), 'utf8')
  for (const [field, max] of Object.entries(lead.LEAD_MAX_LENGTH))
    assert.match(migration, new RegExp(`char_length\\(trim\\(${field}\\)\\) between \\d+ and ${max}\\b`), field)
})

// senior-review I2: leadRestSender.ts, a direct fetch to PostgREST, exercised against a fake global `fetch`.
// `t.after` always restores the real globalThis.fetch — without it a failed assertion mid-test (or a changed
// run order) leaves the fake installed for every test that runs after it.
function fakeFetch(t, calls, impl) {
  const real = globalThis.fetch
  t.after(() => { globalThis.fetch = real })
  globalThis.fetch = async (url, init) => { calls.push({ url, init }); return impl(url, init) }
}
const jsonResponse = (status, body) => ({ ok: status >= 200 && status < 300, status, json: async () => body })
// a response with no JSON body at all: response.json() REJECTS (a real SyntaxError, "Unexpected end of JSON
// input"), which is what actually exercises leadRestSender's `.catch(() => undefined)` — jsonResponse(status,
// null) resolves fine and never did.
const noJsonBodyResponse = (status) => ({ ok: status >= 200 && status < 300, status, json: async () => { throw new SyntaxError('Unexpected end of JSON input') } })

test('The real sender POSTs to <url>/rest/v1/leads with apikey + Bearer + return=minimal, no .select()', async (t) => {
  const calls = []
  fakeFetch(t, calls, () => jsonResponse(201, null))
  const send = rest.createLeadRestSender({ url: 'https://fake.supabase.test', key: 'anon-key-123' })
  const row = { id: 'x', name: 'Jane', source: 'brandupadvisory.com', status: 'new' }
  const out = await send(row, new AbortController().signal)
  assert.deepEqual(out, { ok: true })
  assert.equal(calls.length, 1)
  // leadRestSender passes a URL object to fetch (new URL(path, base) normalises a trailing slash/whitespace in
  // the configured base), not a template string — compare its string form.
  assert.equal(String(calls[0].url), 'https://fake.supabase.test/rest/v1/leads')
  assert.equal(calls[0].init.method, 'POST')
  assert.equal(calls[0].init.headers.apikey, 'anon-key-123')
  assert.equal(calls[0].init.headers.Authorization, 'Bearer anon-key-123')
  assert.equal(calls[0].init.headers.Prefer, 'return=minimal')
  assert.equal(calls[0].init.headers['Content-Type'], 'application/json')
  assert.deepEqual(JSON.parse(calls[0].init.body), row)
  assert.equal('select' in calls[0].init, false)
})

test('A 409 (23505, a resend) and a 400 (a CHECK) both come back as { ok:false, code }', async (t) => {
  const real = globalThis.fetch
  t.after(() => { globalThis.fetch = real })
  const send = rest.createLeadRestSender({ url: 'https://fake.supabase.test', key: 'k' })
  globalThis.fetch = async () => jsonResponse(409, { code: '23505', message: 'duplicate key' })
  assert.deepEqual(await send({}, new AbortController().signal), { ok: false, code: '23505' })
  globalThis.fetch = async () => jsonResponse(400, { code: '23514', message: 'check violation' })
  assert.deepEqual(await send({}, new AbortController().signal), { ok: false, code: '23514' })
  // no JSON body at all: response.json() throws, falls back to the HTTP status via the sender's .catch()
  globalThis.fetch = async () => noJsonBodyResponse(500)
  assert.deepEqual(await send({}, new AbortController().signal), { ok: false, code: '500' })
})

test('A rejected fetch (network/DNS/CORS) and an aborted signal both throw, never resolve', async (t) => {
  const real = globalThis.fetch
  t.after(() => { globalThis.fetch = real })
  const send = rest.createLeadRestSender({ url: 'https://fake.supabase.test', key: 'k' })
  globalThis.fetch = async () => { throw new TypeError('Failed to fetch') }
  await assert.rejects(() => send({}, new AbortController().signal), TypeError)
  const controller = new AbortController()
  globalThis.fetch = async (_url, init) => new Promise((_resolve, reject) => {
    init.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))
  })
  const pending = send({}, controller.signal)
  controller.abort()
  await assert.rejects(() => pending, (e) => e.name === 'AbortError')
})

test('Missing env vars throw only when the sender is actually used, not at import', () => {
  assert.throws(() => rest.createLeadRestSender({ url: '', key: '' }), /not configured/)
})

// senior-review I1: production host + ?send= still gets the REAL sender; onConfirmed-worthiness (isReal) follows.
test('?send= on the production host is ignored: the real sender is used, isReal() is true', async () => {
  const calls = []
  const picked = pick.createLazySender({
    env: { dev: false, hostname: 'brandupadvisory.com', search: '?send=fail' },
    loadSimulated: async () => { calls.push('simulated-loaded'); return async () => ({ ok: true }) },
    real: async () => ({ ok: true }),
  })
  assert.equal(picked.isReal(), null) // not resolved yet: nothing has sent
  const out = await picked.send({}, new AbortController().signal)
  assert.deepEqual(out, { ok: true })
  assert.equal(picked.isReal(), true)
  assert.equal(calls.length, 0) // the simulated sender's loader was never even reached
})

test('?send= on a whitelisted local host (localhost, 127.0.0.1, [::1]), and dev regardless of host, get the simulated sender; isReal() is false', async () => {
  for (const env of [
    { dev: false, hostname: 'localhost', search: '?send=ok' },
    { dev: false, hostname: '127.0.0.1', search: '?send=fail' },
    { dev: false, hostname: '[::1]', search: '?send=slow' },
    { dev: true, hostname: 'brandupadvisory.com', search: '' },
  ]) {
    const picked = pick.createLazySender({ env, loadSimulated: async () => async () => ({ ok: true }), real: async () => ({ ok: true }) })
    await picked.send({}, new AbortController().signal)
    assert.equal(picked.isReal(), false, JSON.stringify(env))
  }
})

test('senior-review: a whitelist, not a blacklist — ?send= on ANY non-local host (not just brandupadvisory.com) always uses the real sender', async () => {
  for (const hostname of ['staging.example.com', 'brandupadvisory.com.evil.test', '0.0.0.0', 'brandupadvisory.com']) {
    const picked = pick.createLazySender({ env: { dev: false, hostname, search: '?send=fail' }, loadSimulated: async () => async () => ({ ok: true }), real: async () => ({ ok: true }) })
    await picked.send({}, new AbortController().signal)
    assert.equal(picked.isReal(), true, hostname)
  }
})

test('Without ?send= and outside dev, the real sender is used regardless of host', async () => {
  const picked = pick.createLazySender({ env: { dev: false, hostname: 'localhost', search: '' }, loadSimulated: async () => async () => ({ ok: true }), real: async () => ({ ok: true }) })
  await picked.send({}, new AbortController().signal)
  assert.equal(picked.isReal(), true)
})

test('The FAQ JSON-LD is generated from content.ts, not hand-duplicated (plano-producao §1, SEO item 6)', () => {
  assert.match(content.faqJsonLd, /"@type":"FAQPage"/)
  const parsed = JSON.parse(content.faqJsonLd.replace(/\\u003c/g, '<'))
  assert.equal(parsed.mainEntity.length, content.faq.items.length)
  content.faq.items.forEach(([question, answer], i) => {
    assert.equal(parsed.mainEntity[i].name, question)
    assert.equal(parsed.mainEntity[i].acceptedAnswer.text, answer)
  })
})

// senior-review I1: the actual pick/isReal BEHAVIOUR is tested above, against pickLeadSender.ts directly — Proto.tsx
// itself cannot be loaded by this harness (React, the WebGL engine, `?url` asset imports). This is only a thin
// wiring guard: Proto.tsx must delegate to that tested module, not reimplement the decision inline.
test('Proto.tsx wires the tested sender-picking module, and never statically imports the simulated one', () => {
  const source = fs.readFileSync(new URL('../src/proto/Proto.tsx', import.meta.url), 'utf8')
  const code = source.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '')
  assert.match(code, /import \{ createLazySender \} from '\.\.\/lib\/pickLeadSender'/)
  assert.match(code, /import \{ leadRestSender \} from '\.\.\/lib\/leadRestSender'/)
  assert.match(code, /await import\('\.\.\/lib\/simulatedLeadSender'\)/)
  assert.equal(/^import .*['"]\.\.\/lib\/simulatedLeadSender['"]/m.test(code), false)
  // onConfirmed must check isReal(), not fire unconditionally
  assert.match(code, /onConfirmed:\s*\(eventId\)\s*=>\s*\{\s*if\s*\(sender\?\.isReal\(\)\)/)
})
