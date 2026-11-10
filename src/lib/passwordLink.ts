// Parsing of Supabase invite/recovery links and the pending-password marker.
// The router (main.tsx) only uses detectPasswordLink to route; the marker is
// written by the admin page on trusted paths only (see passwordFlow.ts).

export type PasswordLinkType = 'invite' | 'recovery'

export type PasswordLink = {
  type: PasswordLinkType
  tokenHash: string | null
  accessToken: string | null
}

// A password step bound to the account whose link was verified.
export type PasswordSetup = { type: PasswordLinkType; userId: string }

// The three Storage methods the marker needs (sessionStorage, or a fake in tests).
export type KeyValueStore = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export const PASSWORD_SETUP_KEY = 'brandup-password-setup'

const linkTypePattern = /[?&#]type=(invite|recovery)(?:&|$)/i
const tokenInHashPattern = /(^|[#&])access_token=/

// An invite/recovery link carries its type plus a token, either as
// `?token_hash=` (OTP template) or `#access_token=` (implicit flow).
export function parsePasswordLink(href: string): PasswordLink | null {
  const url = new URL(href)
  const type = linkTypePattern.exec(url.search + url.hash)?.[1]?.toLowerCase()
  if (type !== 'invite' && type !== 'recovery') return null
  const tokenHash = url.searchParams.get('token_hash')
  const accessToken = tokenInHashPattern.test(url.hash)
    ? new URLSearchParams(url.hash.slice(1)).get('access_token')
    : null
  if (!tokenHash && !accessToken) return null
  return { type, tokenHash, accessToken }
}

export function detectPasswordLink(href: string): PasswordLinkType | null {
  return parsePasswordLink(href)?.type ?? null
}

// Supabase redirects an expired or reused link with `#error_code=...` and no token.
export function hasAuthLinkError(href: string): boolean {
  return new URLSearchParams(new URL(href).hash.slice(1)).has('error_code')
}

// The account a JWT was issued to. Not a signature check: it is only compared with
// the id of the session supabase-js accepted, to tell the link's session from an
// older one (a renewed token differs byte for byte but keeps the same `sub`).
export function jwtSubject(token: string | null): string | null {
  const payload = token?.split('.')[1]
  if (!payload) return null
  try {
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    const sub: unknown = JSON.parse(json).sub
    return typeof sub === 'string' && sub ? sub : null
  } catch {
    return null // Not a JWT: it cannot match any session.
  }
}

export type InitialLinkDecision = {
  // End the session that was already in the browser before using the link.
  signOutExisting: boolean
  // The current session came from this link and may set the new password.
  allowPasswordSetup: boolean
  // The implicit link did not produce its own session (invalid, expired, reused).
  linkFailed: boolean
}

// When a password link opened the page, the link's token always wins. A session
// that was already there (another admin, or a stale one) must never reach
// updateUser: a token_hash link only gets a session from verifyOtp, and an
// implicit link only counts when the session belongs to the link's own account.
export function decideInitialLink(
  link: PasswordLink | null,
  sessionUserId: string | null,
): InitialLinkDecision {
  if (!link) return { signOutExisting: false, allowPasswordSetup: false, linkFailed: false }
  if (link.tokenHash) {
    return { signOutExisting: sessionUserId !== null, allowPasswordSetup: false, linkFailed: false }
  }
  const linkUserId = jwtSubject(link.accessToken)
  const fromLink = sessionUserId !== null && linkUserId !== null && sessionUserId === linkUserId
  return {
    signOutExisting: sessionUserId !== null && !fromLink,
    allowPasswordSetup: fromLink,
    linkFailed: !fromLink,
  }
}

export function storePasswordSetup(storage: KeyValueStore, setup: PasswordSetup): void {
  try {
    storage.setItem(PASSWORD_SETUP_KEY, JSON.stringify(setup))
  } catch {
    // Blocked storage: the password step still works in memory, only a reload loses it.
  }
}

export function clearPasswordSetup(storage: KeyValueStore): void {
  try {
    storage.removeItem(PASSWORD_SETUP_KEY)
  } catch {
    // Blocked storage: nothing was persisted, so there is nothing to clear.
  }
}

// Honoured only for the account it was written for. Anything else, including the
// unverified '1'/'invite' values older builds wrote straight from the URL, is ignored.
export function readPasswordSetup(storage: KeyValueStore, userId: string): PasswordSetup | null {
  try {
    const value: unknown = JSON.parse(storage.getItem(PASSWORD_SETUP_KEY) ?? 'null')
    if (typeof value !== 'object' || value === null) return null
    const { type, userId: owner } = value as Record<string, unknown>
    if ((type !== 'invite' && type !== 'recovery') || owner !== userId) return null
    return { type, userId }
  } catch {
    return null // Blocked storage or a legacy non-JSON value.
  }
}

// The only gate in front of updateUser: the live session must be the link's account.
export function canSetPassword(setup: PasswordSetup | null, sessionUserId: string | null): boolean {
  return setup !== null && sessionUserId !== null && setup.userId === sessionUserId
}
