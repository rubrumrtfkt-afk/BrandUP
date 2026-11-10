import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

// Same loader as leadboard.test.mjs: transpile the real module, no test dependencies.
async function load(path) {
  const output = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText
  return import(`data:text/javascript;base64,${Buffer.from(output).toString('base64')}`)
}
const link = await load(new URL('../src/lib/passwordLink.ts', import.meta.url))
const source = name => fs.readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8')
function memoryStorage() {
  const values = new Map()
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, String(value)), removeItem: key => values.delete(key) }
}
const site = 'https://brandupadvisory.com/'

test('Invite and recovery links are recognised with token_hash or access_token', () => {
  for (const [path, expected] of [
    ['?type=recovery&token_hash=x', 'recovery'],
    ['?token_hash=x&type=invite', 'invite'],
    ['?admin=1&TYPE=Recovery&token_hash=x', 'recovery'],
    ['#access_token=a&expires_in=3600&refresh_token=r&token_type=bearer&type=recovery', 'recovery'],
    ['#access_token=a&token_type=bearer&type=invite', 'invite'],
  ]) assert.equal(link.detectPasswordLink(site + path), expected, path)
})

test('Links without a token, other auth types and look-alike params are not password links', () => {
  for (const path of ['', '?admin=1', '?type=recovery', '?token_hash=x', '?type=signup&token_hash=x', '?subtype=invite&token_hash=x', '#token_type=bearer&type=recovery', '?utm_source=facebook&type=a', '#error=access_denied&error_code=otp_expired'])
    assert.equal(link.detectPasswordLink(site + path), null, path)
})

test('Expired or reused links are detected from the error hash only', () => {
  assert.equal(link.hasAuthLinkError(`${site}?admin=1#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid`), true)
  assert.equal(link.hasAuthLinkError(`${site}#error_code=otp_expired`), true)
  assert.equal(link.hasAuthLinkError(`${site}?error_code=otp_expired`), false)
  assert.equal(link.hasAuthLinkError(site), false)
})

test('The value the router stores is the value the admin page reads', () => {
  const storage = memoryStorage()
  for (const type of ['invite', 'recovery']) {
    link.storePasswordSetup(storage, link.detectPasswordLink(`${site}?type=${type}&token_hash=x`))
    assert.equal(storage.getItem(link.PASSWORD_SETUP_KEY), type)
    assert.equal(link.readPasswordSetup(storage), type)
  }
  link.clearPasswordSetup(storage)
  assert.equal(link.readPasswordSetup(storage), null)
})

test('A tab from the previous build ("1") still opens the invite screen; junk opens nothing', () => {
  const storage = memoryStorage()
  storage.setItem(link.PASSWORD_SETUP_KEY, '1')
  assert.equal(link.readPasswordSetup(storage), 'invite')
  storage.setItem(link.PASSWORD_SETUP_KEY, 'true')
  assert.equal(link.readPasswordSetup(storage), null)
})

test('Blocked storage does not throw on the password-link contract', () => {
  const blocked = () => { throw new Error('blocked') }
  const storage = { getItem: blocked, setItem: blocked, removeItem: blocked }
  assert.doesNotThrow(() => { link.storePasswordSetup(storage, 'invite'); link.clearPasswordSetup(storage) })
  assert.equal(link.readPasswordSetup(storage), null)
})

test('Router and admin page share one contract: no raw key and no "1" comparison', () => {
  for (const name of ['main.tsx', 'AdminPage.tsx']) {
    const code = source(name)
    assert.match(code, /from '\.\/lib\/passwordLink'/, `${name} imports the contract`)
    assert.doesNotMatch(code, /brandup-password-setup/, `${name} must not use the raw storage key`)
    assert.doesNotMatch(code, /sessionStorage\.(getItem|setItem|removeItem)/, `${name} must go through the helpers`)
  }
  const main = source('main.tsx')
  assert.match(main, /storePasswordSetup\(sessionStorage, passwordLinkType\)/)
  assert.match(main, /passwordLinkType !== null/, 'password links route to the admin page')
  assert.match(main, /hasAuthLinkError\(window\.location\.href\)/, 'expired links route to the admin page')
})

test('Every link the router treats as a password link is also kept away from the Meta Pixel', () => {
  const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  const code = html.match(/<script>([\s\S]*?)<\/script>/)[1]
  for (const path of ['?type=recovery&token_hash=x', '?type=invite&token_hash=x', '#access_token=a&token_type=bearer&type=recovery', '#access_token=a&type=invite']) {
    const url = new URL(site + path)
    assert.ok(link.detectPasswordLink(url.href), path)
    const calls = []
    vm.runInNewContext(code, { location: { hostname: url.hostname, search: url.search, hash: url.hash }, URLSearchParams, window: { fbq: () => {} }, document: {}, fbq: (...args) => calls.push(args) })
    assert.equal(calls.length, 0, `Pixel fired on ${path}`)
  }
})
