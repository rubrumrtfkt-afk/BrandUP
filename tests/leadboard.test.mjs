import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

// Load the actual pure application modules without adding test dependencies.
async function load(path) {
  const output = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText
  return import(`data:text/javascript;base64,${Buffer.from(output).toString('base64')}`)
}
const attribution = await load(new URL('../src/lib/attribution.ts', import.meta.url))
const board = await load(new URL('../src/lib/leadboard.ts', import.meta.url))
function memoryStorage() {
  const values = new Map()
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, String(value)), removeItem: key => values.delete(key), clear: () => values.clear() }
}
function browser(search = '', pathname = '/') {
  globalThis.window = { location: { search, pathname }, fbq: undefined }
  globalThis.document = { referrer: 'https://www.instagram.com/' }
  globalThis.localStorage = memoryStorage()
  globalThis.sessionStorage = memoryStorage()
}
test('UTMs and click identifiers survive a return visit without ad parameters', () => {
  browser('?utm_source=facebook&utm_medium=paid&utm_campaign=Nov&fbclid=test-click')
  attribution.captureAttribution()
  window.location.search = ''; attribution.captureAttribution()
  assert.equal(attribution.readAttribution().utm_campaign, 'Nov')
  assert.equal(attribution.readAttribution().fbclid, 'test-click')
  assert.match(attribution.readAttribution().landing_page, /utm_campaign=Nov/)
})
test('A new campaign replaces prior attribution rather than mixing campaigns', () => {
  browser('?utm_source=facebook&fbclid=old'); attribution.captureAttribution()
  window.location.search = '?utm_source=google&utm_campaign=new'; attribution.captureAttribution()
  assert.equal(attribution.readAttribution().utm_source, 'google')
  assert.equal(attribution.readAttribution().fbclid, undefined)
})
test('Demo aliases map to UTMs and offer labels, not a trusted signature', () => {
  browser('?s=meta&c=nov&m=video&o=review&p=stories&k=partner&r=fake'); attribution.captureAttribution()
  const result = attribution.readAttribution()
  assert.equal(result.utm_campaign, 'nov'); assert.equal(result.offer, 'review')
  assert.equal(result.partner, 'partner'); assert.equal(result.r, undefined)
  assert.equal(board.channelOf(result), 'meta')
})
test('Expired, corrupt and unknown browser values are not submitted', () => {
  browser()
  localStorage.setItem('brandup-attribution', JSON.stringify({ at: Date.now() - 31 * 86400000, attribution: { utm_campaign: 'old' } }))
  assert.deepEqual(attribution.readAttribution(), {})
  localStorage.setItem('brandup-attribution', 'invalid'); assert.deepEqual(attribution.readAttribution(), {})
  localStorage.setItem('brandup-attribution', JSON.stringify({ at: Date.now(), attribution: { status: 'closed', utm_campaign: 'x'.repeat(1000) } }))
  assert.equal(attribution.readAttribution().status, undefined)
  assert.equal(attribution.readAttribution().utm_campaign.length, 300)
})
test('Direct visits to privacy and thank-you do not replace the landing page', () => {
  browser('', '/thank-you'); attribution.captureAttribution(); assert.deepEqual(attribution.readAttribution(), {})
})
test('Direct visits and reloads do not create a Lead; confirmation fires once', () => {
  browser(); const calls = []; window.fbq = (...args) => calls.push(args)
  attribution.trackConfirmedLead(); assert.equal(calls.length, 0)
  attribution.markLeadConfirmed('test-event'); attribution.trackConfirmedLead(); attribution.trackConfirmedLead()
  assert.deepEqual(calls, [['track', 'Lead', {}, { eventID: 'test-event' }]])
})
test('Unavailable tracking keeps the confirmed event for a later attempt', () => {
  browser(); attribution.markLeadConfirmed('confirmed'); attribution.trackConfirmedLead()
  assert.equal(sessionStorage.getItem('brandup-lead-confirmed'), 'confirmed')
})
test('Blocked browser storage does not throw', () => {
  browser(); const blocked = () => { throw Error('blocked') }
  globalThis.localStorage = { getItem: blocked, setItem: blocked }
  globalThis.sessionStorage = { getItem: blocked, setItem: blocked }
  assert.doesNotThrow(() => { attribution.captureAttribution(); attribution.readAttribution(); attribution.markLeadConfirmed('test'); attribution.trackConfirmedLead() })
})
test('Pixel runs only on production public routes, never on admin or Supabase auth links', () => {
  const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  const code = html.match(/<script>([\s\S]*?)<\/script>/)[1]
  for (const [hostname, search, hash, expected] of [['localhost', '', '', false], ['brandupadvisory.com', '?admin=1', '', false], ['brandupadvisory.com', '?%61dmin=1', '', false], ['brandupadvisory.com', '', '#/admin', false], ['brandupadvisory.com', '?token_hash=abc&type=invite', '', false], ['brandupadvisory.com', '?type=recovery&token_hash=abc', '', false], ['brandupadvisory.com', '', '#access_token=abc&type=recovery', false], ['brandupadvisory.com', '?utm_source=facebook&type=a', '', true], ['brandupadvisory.com', '?utm_source=x&type=signup', '', true], ['brandupadvisory.com', '', '#error=access_denied&error_code=otp_expired', false], ['brandupadvisory.com', '?error_code=otp_expired', '', false], ['brandupadvisory.com', '', '', true]]) {
    const calls = [], metas = []; const context = { location: { hostname, search, hash }, URLSearchParams, window: { fbq: () => {} }, document: { createElement: () => ({}), head: { appendChild: meta => metas.push(meta) } }, fbq: (...args) => calls.push(args) }
    vm.runInNewContext(code, context)
    assert.equal(calls.length > 0, expected)
    const authUrl = /token_hash|access_token|error_code/.test(search + hash)
    assert.deepEqual(metas, authUrl ? [{ name: 'referrer', content: 'no-referrer' }] : [], `referrer policy on ${search}${hash}`)
    assert.equal(calls.some(args => args[1] === 'Lead'), false)
  }
})
test('Generated links round-trip special characters, fields and Meta macros', () => {
  const fields = { source: 'facebook', medium: 'paid', campaign: '{{campaign.name}}', content: 'A & B', term: '{{adset.name}}', offer: 'Review', placement: 'stories', partner: 'Café AU' }
  const url = board.buildTrackedLink(fields, 'link-id')
  assert.match(url, /\{\{campaign.name\}\}/)
  const params = new URL(url).searchParams
  assert.equal(params.get('utm_content'), 'A & B'); assert.equal(params.get('partner'), 'Café AU'); assert.equal(params.get('link_id'), 'link-id')
})
test('Attention includes only new leads at or above five elapsed minutes', () => {
  const now = Date.now(); const lead = { created_at: new Date(now - 300000).toISOString(), status: 'new' }
  assert.equal(board.needsAttention(lead, now), true)
  assert.equal(board.needsAttention({ ...lead, status: 'contacted' }, now), false)
  assert.equal(board.needsAttention({ ...lead, created_at: new Date(now - 299999).toISOString() }, now), false)
})
test('Filters combine period, channel, stage, campaign and search', () => {
  const now = Date.now(); const first = { name: 'TESTE', company: 'Cafe', created_at: new Date(now - 600000).toISOString(), status: 'new', utm_source: 'facebook', utm_medium: 'paid', utm_campaign: 'Nov' }
  const filters = { query: 'cafe', days: '7', channel: 'meta', status: 'new', campaign: 'Nov', attention: true }
  assert.equal(board.filterLeads([first, { ...first, status: 'closed' }, { ...first, utm_source: 'google' }], filters, now).length, 1)
})
test('CSV cells escape quotes and neutralise spreadsheet formulas', () => {
  assert.equal(board.csvCell('A "quote"'), '"A ""quote"""')
  assert.equal(board.csvCell('=HYPERLINK("x")'), '"\'=HYPERLINK(""x"")"')
  assert.equal(board.csvCell('+61400000000'), '"\'+61400000000"')
})

test('Revenue grades classify all four form ranges without guessing missing revenue', () => {
  assert.equal(board.revenueGrade('Above AUD 150k'), 'A')
  assert.equal(board.revenueGrade('AUD 80k to AUD 150k'), 'A')
  assert.equal(board.revenueGrade('AUD 30k to AUD 80k'), 'B')
  assert.equal(board.revenueGrade('Up to AUD 30k'), 'C')
  for (const value of [undefined, null, '', 'unknown']) assert.equal(board.revenueGrade(value), 'unclassified')
})

test('Revenue grade filters combine with existing channel and status filters', () => {
  const now = Date.now()
  const base = { name: 'TESTE', status: 'new', created_at: new Date(now).toISOString(), utm_source: 'google' }
  const leads = ['Above AUD 150k', 'AUD 30k to AUD 80k', 'Up to AUD 30k', ''].map(monthly_revenue => ({ ...base, monthly_revenue }))
  const filters = { query: '', days: '', channel: 'google', status: 'new', campaign: '', attention: false, grade: 'A' }
  assert.deepEqual(board.filterLeads(leads, filters, now), [leads[0]])
  assert.deepEqual(board.filterLeads(leads, { ...filters, grade: 'unclassified' }, now), [leads[3]])
  assert.equal(board.filterLeads(leads, { ...filters, channel: 'meta' }, now).length, 0)
})
test('A referrer carrying a Supabase token is never stored for the lead', () => {
  browser('?utm_source=facebook'); document.referrer = 'https://brandupadvisory.com/?admin=1&type=recovery&token_hash=secret'
  attribution.captureAttribution()
  assert.equal(attribution.readAttribution().referrer, undefined)
  assert.equal(attribution.readAttribution().utm_source, 'facebook')
  for (const leaked of ['https://brandupadvisory.com/#access_token=a&type=invite', 'https://brandupadvisory.com/?refresh_token=r'])
    assert.equal(attribution.safeReferrer(leaked), undefined, leaked)
  browser('?utm_source=facebook'); attribution.captureAttribution()
  assert.equal(attribution.readAttribution().referrer, 'https://www.instagram.com/')
})
