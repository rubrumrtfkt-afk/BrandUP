// The single contract between the router (main.tsx) and the admin page for
// Supabase invite/recovery links. main.tsx reads the link before supabase-js
// strips the URL and stores its type here; AdminPage reads it back to open the
// "set a password" screen. Both sides must go through these helpers.

export type PasswordLinkType = 'invite' | 'recovery'

export const PASSWORD_SETUP_KEY = 'brandup-password-setup'

const linkTypePattern = /[?&#]type=(invite|recovery)(?:&|$)/i
const tokenInHashPattern = /(^|[#&])access_token=/

// An invite/recovery link carries its type plus a token, either as
// `?token_hash=` (OTP template) or `#access_token=` (implicit flow).
export function detectPasswordLink(href: string): PasswordLinkType | null {
  const url = new URL(href)
  const type = linkTypePattern.exec(url.search + url.hash)?.[1]?.toLowerCase()
  if (type !== 'invite' && type !== 'recovery') return null
  const hasToken = url.searchParams.has('token_hash') || tokenInHashPattern.test(url.hash)
  return hasToken ? type : null
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
