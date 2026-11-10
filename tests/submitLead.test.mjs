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

test('The real sender inserts without .select() and loads Supabase lazily', () => {
  const source = fs.readFileSync(new URL('../src/lib/supabaseLeadSender.ts', import.meta.url), 'utf8')
  const code = source.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '')
  assert.equal(code.includes('.select('), false)
  assert.match(code, /await import\('\.\/supabase'\)/)
  assert.equal(/^import .*['"]\.\/supabase['"]/m.test(code), false)
})
