import type { ReactNode } from 'react'
import { Logo } from './proto/Logo'
import './StaticPage.css'

/** A fact only the owner can state (ABN, where data lives, which AI providers, a retention period). Loud and
 *  greppable (`data-todo`, plano-producao "O que bloqueia o go-live") in dev, so it never ships as a guessed fact —
 *  and nothing at all in production (go-live content rule): the build itself refuses to ship if `data-todo` or
 *  the text `TODO(dono)` ever reaches dist/**\/*.html or dist/assets/*.js (vite.config.ts, forbidOwnerTodos). Every
 *  place this is used keeps the surrounding sentence complete with it gone (Privacy.tsx): no half sentence. */
export function Todo({ children }: { children: ReactNode }) {
  if (!import.meta.env.DEV) return null
  return <span data-todo="true">TODO(dono): {children}</span>
}

/** /thank-you and /privacy share this shell (componentizar-sempre): an eyebrow, a title, the body, and the one
 *  way back. plano-producao §4: the v4 tokens (StaticPage.css), no WebGL, no prerender. */
export function StaticPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <main className="static-page">
      <div className="static-page-inner">
        {/* juri-v58 item 1: the same brand mark the landing's header uses, so a secondary page still reads as
            part of the finished site, not a bare document */}
        <a className="static-page-brand" href="/" aria-label="BrandUp"><Logo /><span aria-hidden="true">BrandUp</span></a>
        <p className="static-page-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children}
        <a className="static-page-link" href="/">Back to the website</a>
      </div>
    </main>
  )
}
