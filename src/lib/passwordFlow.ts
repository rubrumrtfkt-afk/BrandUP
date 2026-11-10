// Session decisions of the admin page for invite/recovery links, kept out of the
// React effect so they can be tested with a fake auth client.
import {
  clearPasswordSetup,
  decideInitialLink,
  readPasswordSetup,
  storePasswordSetup,
} from './passwordLink'
import type { KeyValueStore, PasswordLink, PasswordSetup } from './passwordLink'

export type AuthSession = { user: { id: string; email?: string | null } }

export type AuthClient<S extends AuthSession> = {
  getSession(): Promise<{ data: { session: S | null } }>
  signOut(options: { scope: 'local' }): Promise<unknown>
}

export type InitialResult<S extends AuthSession> = {
  // The session the page may use, or null when it starts signed out.
  session: S | null
  passwordSetup: PasswordSetup | null
  linkFailed: boolean
}

export type AuthEventAction<S extends AuthSession> =
  | { kind: 'ignore' }
  | { kind: 'signedOut' }
  | { kind: 'passwordSetup'; setup: PasswordSetup; session: S }
  // keepPasswordSetup is false when the signed-in account is not the one of the
  // password step on screen (e.g. another tab signed in as someone else).
  | { kind: 'signedIn'; session: S; keepPasswordSetup: boolean }

export function createPasswordFlow<S extends AuthSession>(
  auth: AuthClient<S>,
  link: PasswordLink | null,
  storage: KeyValueStore,
) {
  // Until the link is resolved, session events belong to the browser's previous session.
  let resolved = link === null

  async function init(): Promise<InitialResult<S>> {
    const {
      data: { session },
    } = await auth.getSession()
    const decision = decideInitialLink(link, session?.user.id ?? null)

    if (decision.linkFailed) {
      clearPasswordSetup(storage)
    }

    if (decision.signOutExisting) {
      // Local scope: end this browser's session only (supabase-js clears it even if the
      // network call fails); that admin's other devices stay signed in.
      await auth.signOut({ scope: 'local' })
    }

    resolved = true
    const usable = decision.signOutExisting || decision.linkFailed ? null : session

    if (!usable) {
      return { session: null, passwordSetup: null, linkFailed: decision.linkFailed }
    }

    if (decision.allowPasswordSetup && link) {
      const setup: PasswordSetup = { type: link.type, userId: usable.user.id }
      storePasswordSetup(storage, setup)
      return { session: usable, passwordSetup: setup, linkFailed: false }
    }

    // No link in the URL: resume a password step only for the account it was verified for.
    return {
      session: usable,
      passwordSetup: link ? null : readPasswordSetup(storage, usable.user.id),
      linkFailed: false,
    }
  }

  function onAuthEvent(
    event: string,
    session: S | null,
    current: PasswordSetup | null,
  ): AuthEventAction<S> {
    if (event === 'SIGNED_OUT' || !session) {
      clearPasswordSetup(storage)
      return { kind: 'signedOut' }
    }

    if (!resolved) {
      return { kind: 'ignore' }
    }

    // Only fired by supabase-js for a session it created from the recovery link itself.
    if (event === 'PASSWORD_RECOVERY') {
      const setup: PasswordSetup = { type: 'recovery', userId: session.user.id }
      storePasswordSetup(storage, setup)
      return { kind: 'passwordSetup', setup, session }
    }

    if (event === 'SIGNED_IN') {
      const keepPasswordSetup = current === null || current.userId === session.user.id
      if (!keepPasswordSetup) clearPasswordSetup(storage)
      return { kind: 'signedIn', session, keepPasswordSetup }
    }

    return { kind: 'ignore' }
  }

  // After verifyOtp: the only way a token_hash link opens the password step.
  function acceptVerifiedLink(session: S): PasswordSetup | null {
    if (!link) return null
    const setup: PasswordSetup = { type: link.type, userId: session.user.id }
    storePasswordSetup(storage, setup)
    return setup
  }

  return { init, onAuthEvent, acceptVerifiedLink }
}
