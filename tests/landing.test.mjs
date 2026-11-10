import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

// plano-producao §1 / admin-crm-inventario §9.3 item 4: after the MPA split there are two Pixel guards, one per
// shell. index.html (the landing) also diverts ?admin=1, #/admin and a Supabase invite/recovery link to /admin/
// BEFORE it would ever reach the Pixel; app.html (thank-you, privacy, admin) has no diversion (it already IS the
// route) but must still never fire the Pixel on /admin/, by path or by a direct ?admin=1/#/admin/token hit.
function firstScript(html) {
  return html.match(/<script>([\s\S]*?)<\/script>/)[1]
}
const indexCode = firstScript(fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8'))
const appCode = firstScript(fs.readFileSync(new URL('../app.html', import.meta.url), 'utf8'))

function run(code, { hostname, pathname = '/', search = '', hash = '' }) {
  const fbqCalls = []
  const replaceCalls = []
  const href = `http://${hostname}${pathname}${search}${hash}`
  const context = {
    location: { hostname, pathname, search, hash, href, replace: (url) => replaceCalls.push(url) },
    URLSearchParams,
    window: { fbq: () => {} },
    document: {},
    fbq: (...args) => fbqCalls.push(args),
  }
  vm.runInNewContext(code, context)
  return { fbqCalls, replaceCalls }
}

test('index.html diverts the admin and Supabase-auth cases to /admin/, before the Pixel ever runs', () => {
  const cases = [
    // [search, hash, expectReplace]
    ['?admin=1', '', '/admin/?admin=1'],
    ['?%61dmin=1', '', '/admin/?%61dmin=1'], // percent-encoded key: URLSearchParams still decodes it to "admin"
    ['', '#/admin', '/admin/#/admin'],
    ['?token_hash=abc&type=invite', '', '/admin/?token_hash=abc&type=invite'],
    ['?type=recovery&token_hash=abc', '', '/admin/?type=recovery&token_hash=abc'], // order swapped: still matches
    ['', '#access_token=abc&type=recovery', '/admin/#access_token=abc&type=recovery'],
  ]
  for (const [search, hash, expected] of cases) {
    const { fbqCalls, replaceCalls } = run(indexCode, { hostname: 'brandupadvisory.com', search, hash })
    assert.deepEqual(replaceCalls, [expected], `${search}${hash}`)
    assert.equal(fbqCalls.length, 0, `${search}${hash}`)
  }
})
test('index.html sets window.__buLeaving before diverting to /admin/ (senior-review I3)', () => {
  const context = {
    location: { hostname: 'brandupadvisory.com', pathname: '/', search: '?admin=1', hash: '', href: 'http://brandupadvisory.com/?admin=1', replace: () => undefined },
    URLSearchParams,
    window: {},
    document: {},
    fbq: () => undefined,
  }
  vm.runInNewContext(indexCode, context)
  assert.equal(context.window.__buLeaving, true)
})

test('index.html fires the Pixel only on brandupadvisory.com, outside the admin and auth cases', () => {
  const cases = [
    [{ hostname: 'localhost' }, false],
    [{ hostname: 'brandupadvisory.com' }, true],
    [{ hostname: 'brandupadvisory.com', search: '?utm_source=facebook&type=a' }, true], // "type=a" is not invite/recovery
  ]
  for (const [args, expectPixel] of cases) {
    const { fbqCalls, replaceCalls } = run(indexCode, args)
    assert.equal(fbqCalls.length > 0, expectPixel, JSON.stringify(args))
    assert.equal(replaceCalls.length, 0, JSON.stringify(args))
    assert.equal(fbqCalls.some((call) => call[1] === 'Lead'), false)
  }
})

test('app.html never fires the Pixel on /admin/, by path, query, hash or a Supabase auth token', () => {
  const cases = [
    { pathname: '/admin' },
    { pathname: '/admin/' },
    { pathname: '/admin/index.html' }, // senior-review S4: the literal file GitHub Pages also serves
    { pathname: '/', search: '?admin=1' },
    { pathname: '/', hash: '#/admin' },
    { pathname: '/thank-you', search: '?token_hash=abc&type=recovery' },
    { pathname: '/privacy', hash: '#access_token=abc&type=invite' },
  ]
  for (const args of cases) {
    const { fbqCalls } = run(appCode, { hostname: 'brandupadvisory.com', ...args })
    assert.equal(fbqCalls.length, 0, JSON.stringify(args))
  }
})

test('app.html fires the Pixel on its public routes (thank-you, privacy), on brandupadvisory.com only', () => {
  const cases = [
    [{ hostname: 'localhost', pathname: '/thank-you' }, false],
    [{ hostname: 'brandupadvisory.com', pathname: '/thank-you' }, true],
    [{ hostname: 'brandupadvisory.com', pathname: '/privacy' }, true],
  ]
  for (const [args, expectPixel] of cases) {
    const { fbqCalls } = run(appCode, args)
    assert.equal(fbqCalls.length > 0, expectPixel, JSON.stringify(args))
    assert.equal(fbqCalls.some((call) => call[1] === 'Lead'), false)
  }
})
