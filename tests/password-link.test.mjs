import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

// Same loader as leadboard.test.mjs; `replace` points a relative import at an already-loaded module.
const toDataUrl = code => `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`
function transpile(path, replace = {}) {
  let output = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText
  for (const [from, to] of Object.entries(replace)) output = output.replaceAll(`'${from}'`, `'${to}'`)
  return toDataUrl(output)
}
const linkUrl = transpile(new URL('../src/lib/passwordLink.ts', import.meta.url))
const link = await import(linkUrl)
const { createPasswordFlow } = await import(transpile(new URL('../src/lib/passwordFlow.ts', import.meta.url), { './passwordLink': linkUrl }))

const site = 'https://brandupadvisory.com/'
const jwt = (sub, extra = {}) => `h.${Buffer.from(JSON.stringify({ sub, ...extra })).toString('base64url')}.s`
const sessionOf = id => ({ access_token: jwt(`user-${id}`, { iat: Date.now() }), user: { id: `user-${id}`, email: `admin-${id}@example.test` } })
function memoryStorage() {
  const values = new Map()
  return { values, getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, String(value)), removeItem: key => values.delete(key) }
}
// Fake supabase.auth: records the order of calls and lets a test fire events mid-signOut.
function fakeAuth(session) {
  return {
    session, calls: [], duringSignOut: null,
    async getSession() { this.calls.push('getSession'); return { data: { session: this.session } } },
    async signOut(options) { this.calls.push(`signOut:${options.scope}`); this.duringSignOut?.(); this.session = null; return { error: null } },
  }
}

test('Invite and recovery links are recognised with token_hash or access_token', () => {
  for (const [path, expected] of [
    ['?type=recovery&token_hash=x', 'recovery'],
    ['?token_hash=x&type=invite', 'invite'],
    ['?admin=1&TYPE=Recovery&token_hash=x', 'recovery'],
    ['#access_token=a&expires_in=3600&refresh_token=r&token_type=bearer&type=recovery', 'recovery'],
    ['#access_token=a&token_type=bearer&type=invite', 'invite'],
  ]) assert.equal(link.detectPasswordLink(site + path), expected, path)
  assert.deepEqual(link.parsePasswordLink(`${site}?type=recovery&token_hash=hash-b`), { type: 'recovery', tokenHash: 'hash-b', accessToken: null })
})

test('Links without a token, other auth types and look-alike params are not password links', () => {
  for (const path of ['', '?admin=1', '?type=recovery', '?token_hash=x', '?type=signup&token_hash=x', '?subtype=invite&token_hash=x', '#token_type=bearer&type=recovery', '?utm_source=facebook&type=a', '#error=access_denied&error_code=otp_expired'])
    assert.equal(link.detectPasswordLink(site + path), null, path)
})

test('Expired or reused links are detected from the error hash only', () => {
  assert.equal(link.hasAuthLinkError(`${site}?admin=1#error=access_denied&error_code=otp_expired`), true)
  assert.equal(link.hasAuthLinkError(`${site}?error_code=otp_expired`), false)
  assert.equal(link.hasAuthLinkError(site), false)
})

test('The JWT subject is read without trusting anything else in the token', () => {
  assert.equal(link.jwtSubject(jwt('user-b')), 'user-b')
  for (const bad of [null, 'token-b', 'a.%%%.c', `h.${Buffer.from('{"sub":42}').toString('base64url')}.s`, 'h..s']) assert.equal(link.jwtSubject(bad), null, String(bad))
})

test("Admin A's session never counts for admin B's link; a renewed token of B still does", () => {
  const hashLinkB = link.parsePasswordLink(`${site}?type=recovery&token_hash=hash-b`)
  const implicitLinkB = link.parsePasswordLink(`${site}#access_token=${jwt('user-b')}&type=recovery`)
  assert.deepEqual(link.decideInitialLink(hashLinkB, 'user-a'), { signOutExisting: true, allowPasswordSetup: false, linkFailed: false })
  assert.deepEqual(link.decideInitialLink(hashLinkB, null), { signOutExisting: false, allowPasswordSetup: false, linkFailed: false })
  assert.deepEqual(link.decideInitialLink(implicitLinkB, 'user-a'), { signOutExisting: true, allowPasswordSetup: false, linkFailed: true })
  assert.deepEqual(link.decideInitialLink(implicitLinkB, null), { signOutExisting: false, allowPasswordSetup: false, linkFailed: true })
  assert.deepEqual(link.decideInitialLink(implicitLinkB, 'user-b'), { signOutExisting: false, allowPasswordSetup: true, linkFailed: false })
  assert.deepEqual(link.decideInitialLink(null, 'user-a'), { signOutExisting: false, allowPasswordSetup: false, linkFailed: false })
})

test('token_hash link with admin A signed in: A is signed out before any event is honoured', async () => {
  const storage = memoryStorage(), sessionA = sessionOf('a'), sessionB = sessionOf('b')
  const auth = fakeAuth(sessionA)
  const flow = createPasswordFlow(auth, link.parsePasswordLink(`${site}?type=recovery&token_hash=hash-b`), storage)
  const duringSignOut = []
  auth.duringSignOut = () => duringSignOut.push(flow.onAuthEvent('PASSWORD_RECOVERY', sessionA, null).kind, flow.onAuthEvent('SIGNED_IN', sessionA, null).kind)
  const result = await flow.init()
  assert.deepEqual(auth.calls, ['getSession', 'signOut:local'])
  assert.deepEqual(duringSignOut, ['ignore', 'ignore'], 'events of the old session are ignored until the link is resolved')
  assert.deepEqual(result, { session: null, passwordSetup: null, linkFailed: false })
  assert.equal(storage.values.size, 0, 'nothing marked before verifyOtp')
  const setup = flow.acceptVerifiedLink(sessionB)
  assert.deepEqual(setup, { type: 'recovery', userId: 'user-b' })
  assert.equal(link.canSetPassword(setup, 'user-a'), false, "updateUser is blocked with A's session")
  assert.equal(link.canSetPassword(setup, 'user-b'), true)
})

test('Implicit link: only the session of the link account opens the password step', async () => {
  const implicitB = link.parsePasswordLink(`${site}#access_token=${jwt('user-b')}&type=invite`)
  const valid = createPasswordFlow(fakeAuth(sessionOf('b')), implicitB, memoryStorage())
  const ok = await valid.init()
  assert.deepEqual(ok.passwordSetup, { type: 'invite', userId: 'user-b' })

  // supabase-js keeps the old session when the URL token fails: the flow must not.
  const storage = memoryStorage(); storage.setItem(link.PASSWORD_SETUP_KEY, JSON.stringify({ type: 'recovery', userId: 'user-a' }))
  const auth = fakeAuth(sessionOf('a'))
  const failed = await createPasswordFlow(auth, implicitB, storage).init()
  assert.deepEqual(failed, { session: null, passwordSetup: null, linkFailed: true })
  assert.deepEqual(auth.calls, ['getSession', 'signOut:local'])
  assert.equal(storage.values.size, 0)
})

test('Two tabs: a password step marked for B is not honoured for A, and A signing in drops it', async () => {
  const storage = memoryStorage(), setupB = { type: 'recovery', userId: 'user-b' }
  storage.setItem(link.PASSWORD_SETUP_KEY, JSON.stringify(setupB))
  assert.equal((await createPasswordFlow(fakeAuth(sessionOf('a')), null, storage).init()).passwordSetup, null)
  const flowB = createPasswordFlow(fakeAuth(sessionOf('b')), null, storage)
  assert.deepEqual((await flowB.init()).passwordSetup, setupB, 'a reload of B resumes B')
  assert.equal(flowB.onAuthEvent('SIGNED_IN', sessionOf('b'), setupB).keepPasswordSetup, true)
  const other = flowB.onAuthEvent('SIGNED_IN', sessionOf('a'), setupB)
  assert.equal(other.kind, 'signedIn')
  assert.equal(other.keepPasswordSetup, false)
  assert.equal(storage.values.size, 0)
})

test('PASSWORD_RECOVERY marks the step for its own account once the link is resolved; sign-out clears it', async () => {
  const storage = memoryStorage(), sessionB = sessionOf('b')
  const flow = createPasswordFlow(fakeAuth(sessionB), link.parsePasswordLink(`${site}#access_token=${jwt('user-b')}&type=recovery`), storage)
  assert.equal(flow.onAuthEvent('PASSWORD_RECOVERY', sessionB, null).kind, 'ignore')
  await flow.init()
  assert.deepEqual(flow.onAuthEvent('PASSWORD_RECOVERY', sessionB, null).setup, { type: 'recovery', userId: 'user-b' })
  assert.equal(flow.onAuthEvent('TOKEN_REFRESHED', sessionB, null).kind, 'ignore')
  assert.equal(flow.onAuthEvent('SIGNED_OUT', null, null).kind, 'signedOut')
  assert.equal(storage.values.size, 0)
})

test('Unverified markers from older builds and blocked storage are ignored without throwing', () => {
  const storage = memoryStorage()
  for (const legacy of ['1', 'invite', 'recovery', '{"type":"invite"}']) {
    storage.setItem(link.PASSWORD_SETUP_KEY, legacy)
    assert.equal(link.readPasswordSetup(storage, 'user-a'), null, legacy)
  }
  const blocked = () => { throw new Error('blocked') }
  const denied = { getItem: blocked, setItem: blocked, removeItem: blocked }
  assert.doesNotThrow(() => { link.storePasswordSetup(denied, { type: 'invite', userId: 'u' }); link.clearPasswordSetup(denied) })
  assert.equal(link.readPasswordSetup(denied, 'u'), null)
})

test('Every link the router treats as a password link is also kept away from the Meta Pixel', () => {
  const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  const code = html.match(/<script>([\s\S]*?)<\/script>/)[1]
  for (const path of ['?type=recovery&token_hash=x', '?type=invite&token_hash=x', '#access_token=a&token_type=bearer&type=recovery', '#access_token=a&type=invite']) {
    const url = new URL(site + path)
    assert.ok(link.detectPasswordLink(url.href), path)
    const calls = []
    vm.runInNewContext(code, { location: { hostname: url.hostname, search: url.search, hash: url.hash }, URLSearchParams, window: { fbq: () => {} }, document: { createElement: () => ({}), head: { appendChild: () => {} } }, fbq: (...args) => calls.push(args) })
    assert.equal(calls.length, 0, `Pixel fired on ${path}`)
  }
})
