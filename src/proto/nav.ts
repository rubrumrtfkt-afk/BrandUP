import { scrollToY } from './smoothScroll'

/** v57 (owner: conversion, Meta Ads traffic on phones).
 *
 *  1. In-page anchors never write the hash. A plain click on `a[href^="#"]` glides to the target (smoothScroll.ts; a jump
 *     with reduced motion), moves the focus there and leaves the URL as it was, so F5 starts at the top. The hrefs stay
 *     real: without JS, with the middle button or "open in new tab" they are ordinary links.
 *  2. A link from OUTSIDE with a hash (`/proto.html#diagnostic` in an ad or an e-mail) skips the intro (proto.html, the
 *     head script) and opens on the target with the header shown; the hash is then dropped from the URL, so a reload of
 *     that tab starts at the top with the short intro, like any reload.
 *  3. The header is fixed: shown at the top of the page, during the intro and above the fold; past the fold it hides
 *     after 8 px going down and comes back after 6 px going up (data-hidden, a transform in proto.css). While the office
 *     occupies the header's band it stays hidden whatever the direction: the office's title rises to 9 px from the top at
 *     1440 (42 px at 390) and the header would cover "Never late." (probe v57 stages.mjs: the only text of the three
 *     pinned stages under the band; night and "you" have none). The stage keeps its approved composition. */

const HIDE_AFTER = 8
const SHOW_AFTER = 6

type Landing = { y: number; focus: HTMLElement | null }

const docTop = (el: Element) => el.getBoundingClientRect().top + scrollY

/** Where an anchor lands and what takes the focus. A heading inside a pinned stage (the footer's links) has no fixed
 *  document y (sticky): the landing is the start of its scene, where the stage pins. A form lands under the header's
 *  height; its focus goes to the first field with a fine pointer (type at once), to the section's heading on touch (no
 *  keyboard thrown over the form). */
function resolve(id: string, barH: number): Landing | null {
  if (id === 'top' || id === '') return { y: 0, focus: null }
  const el = document.getElementById(id)
  if (!el) return null
  const scene = el.closest<HTMLElement>('[data-scene]')
  const off = barH + 16
  let y: number
  if (scene && el.closest('.stage')) y = docTop(scene)
  else if (scene && el.closest('.faq-head')) y = docTop(scene) - off
  else y = docTop(el) - off
  let focus: HTMLElement | null = el
  if (el instanceof HTMLFormElement) {
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
    const headId = scene?.getAttribute('aria-labelledby')
    const head = headId ? document.getElementById(headId) : null
    // stacked (phone): the section's title and promise sit above the form; land on the title (the form follows below,
    // its first fields on screen) so the focused title is not above the screen. Side by side (1440) both tops are equal.
    if (head && !el.contains(head)) y = Math.min(y, docTop(head) - off)
    focus = fine ? el.querySelector<HTMLElement>('input:not([type="hidden"]):not([tabindex="-1"])') : head ?? el
  }
  return { y: Math.max(0, Math.round(y)), focus }
}

function focusOn(el: HTMLElement | null) {
  if (!el) return
  const focusable = el.matches('a[href], button, input, select, textarea, [tabindex]')
  if (!focusable) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

const stripHash = () => {
  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search)
}

export function initNav(reduced: boolean) {
  const root = document.documentElement
  const bar = document.querySelector<HTMLElement>('.bar')
  if (!bar) return undefined

  // ---- the header
  let lastY = scrollY
  let acc = 0
  let hidden = false
  let top: boolean | null = null
  const setHidden = (h: boolean) => { if (h !== hidden) { hidden = h; bar.dataset.hidden = String(h) } }
  const setTop = (t: boolean) => { if (t !== top) { top = t; bar.dataset.top = String(t) } }
  const quiet = Array.from(document.querySelectorAll<HTMLElement>('[data-scene="office"]'))
  const inQuiet = () => {
    const h = bar.offsetHeight
    return quiet.some((el) => { const r = el.getBoundingClientRect(); return r.top < h && r.bottom > h })
  }
  const show = () => { acc = 0; lastY = scrollY; setHidden(inQuiet()) }
  const onScroll = () => {
    const y = scrollY
    const dy = y - lastY
    lastY = y
    setTop(y < 8)
    if (y < innerHeight || root.classList.contains('intro')) { acc = 0; setHidden(false); return }
    if (inQuiet()) { acc = 0; setHidden(true); return }
    if (dy === 0) return
    if ((dy > 0) !== (acc > 0)) acc = 0
    acc += dy
    if (acc > HIDE_AFTER) setHidden(true)
    else if (acc < -SHOW_AFTER) setHidden(false)
  }
  // the wheel's intent comes back at once: the smooth scroll (smoothScroll.ts) pays a 10-px flick over ~8 frames, so the
  // scroll events alone showed the header ~150 ms after the hand (probe v57). Touch and keys scroll natively (scroll events).
  const onWheel = (e: WheelEvent) => {
    if (e.deltaY >= 0 || !hidden || scrollY < innerHeight || inQuiet()) return
    if (acc > 0) acc = 0
    acc += e.deltaY * (e.deltaMode === 1 ? 16 : 1)
    if (acc < -SHOW_AFTER) setHidden(false)
  }
  setTop(scrollY < 8)
  bar.dataset.hidden = 'false'

  // ---- anchors
  const land = (t: Landing, glide: boolean) => {
    const arrive = () => { focusOn(t.focus); show() }
    if (glide && !reduced) scrollToY(t.y, arrive)
    else { scrollTo(0, t.y); arrive() }
  }
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[href^="#"]') : null
    if (!a) return
    const t = resolve(decodeURIComponent(a.getAttribute('href')!.slice(1)), bar.offsetHeight)
    if (!t) return
    e.preventDefault()
    stripHash()
    land(t, true)
  }
  // a hash typed in the address bar (or written by anything else): the browser has jumped; land precisely, drop it
  const onHash = () => {
    const t = resolve(decodeURIComponent(location.hash.slice(1)), bar.offsetHeight)
    stripHash()
    if (t) land(t, false)
  }

  // ---- arriving from outside with a hash (once: the URL is clean after it, so StrictMode's second mount finds nothing)
  const id = decodeURIComponent(location.hash.slice(1))
  if (id) {
    const t = resolve(id, bar.offsetHeight)
    stripHash()
    if (t) {
      land(t, false)
      // the display face and late layout can move the target after this first landing: land again while nobody has
      // scrolled (the page still sits where we put it). Not cancelled on unmount: it only ever re-lands an untouched page.
      const again = () => {
        if (Math.abs(scrollY - t.y) > 2) return
        const n = resolve(id, bar.offsetHeight)
        if (n && Math.abs(n.y - t.y) > 1) { t.y = n.y; scrollTo(0, n.y); show() }
      }
      document.fonts?.ready.then(again, () => undefined)
      addEventListener('load', again, { once: true })
    }
  }

  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('wheel', onWheel, { passive: true })
  addEventListener('hashchange', onHash)
  document.addEventListener('click', onClick)
  return () => {
    removeEventListener('scroll', onScroll)
    removeEventListener('wheel', onWheel)
    removeEventListener('hashchange', onHash)
    document.removeEventListener('click', onClick)
  }
}
