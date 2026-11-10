// The single contract between the router (main.tsx) and the admin page for
// Supabase invite/recovery links. main.tsx reads the link before supabase-js
// strips the URL and stores its type here; AdminPage reads it back to open the
// "set a password" screen. Both sides must go through these helpers.

export type PasswordLinkType = 'invite' | 'recovery'

export const PASSWORD_SETUP_KEY = 'brandup-password-setup'

const linkTypePattern = /[?&#]type=(invite|recovery)(?:&|$)/i
const tokenInHashPattern = /(^|[#&])access_token=/

export type PasswordLink = {
  type: PasswordLinkType
  tokenHash: string | null
  accessToken: string | null
}

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
// implicit link only counts when supabase-js stored the link's own access token.
export function decideInitialLink(
  link: PasswordLink | null,
  sessionAccessToken: string | null,
): InitialLinkDecision {
  if (!link) return { signOutExisting: false, allowPasswordSetup: false, linkFailed: false }
  if (link.tokenHash) {
    return { signOutExisting: sessionAccessToken !== null, allowPasswordSetup: false, linkFailed: false }
  }
  const fromLink = sessionAccessToken !== null && sessionAccessToken === link.accessToken
  return {
    signOutExisting: sessionAccessToken !== null && !fromLink,
    allowPasswordSetup: fromLink,
    linkFailed: !fromLink,
  }
}

// Supabase redirects an expired or reused link with `#error_code=...` and no token.
export function hasAuthLinkError(href: string): boolean {
  return new URLSearchParams(new URL(href).hash.slice(1)).has('error_code')
}

export function storePasswordSetup(storage: Storage, type: PasswordLinkType): void {
  try {
    storage.setItem(PASSWORD_SETUP_KEY, type)
  } catch {
    // Blocked storage (private mode, disabled site data): the admin page still
    // reaches the password screen through verifyOtp/PASSWORD_RECOVERY in memory.
  }
}

export function clearPasswordSetup(storage: Storage): void {
  try {
    storage.removeItem(PASSWORD_SETUP_KEY)
  } catch {
    // Blocked storage: nothing was persisted, so there is nothing to clear.
  }
}

// '1' is the value the previous build wrote (invite only). A tab opened before
// the deploy must still land on the invite password screen, so it maps to 'invite'.
export function readPasswordSetup(storage: Storage): PasswordLinkType | null {
  let value: string | null
  try {
    value = storage.getItem(PASSWORD_SETUP_KEY)
  } catch {
    return null
  }
  if (value === 'recovery') return 'recovery'
  if (value === 'invite' || value === '1') return 'invite'
  return null
}
