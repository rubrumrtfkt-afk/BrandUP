/** v4.5 (owner: "the background is completely black"): the page ground has grain, a vignette and a low purple fog
 *  (proto.css body::before / body::after). The fog follows the light of the scene under the middle of the screen:
 *  this only names that scene on <html data-ground>; the CSS owns the values and the cross-fade (opacity and
 *  transform, compositor-only). One IntersectionObserver, no per-frame work. Not run with reduced motion: the
 *  ground stays at its static default. */
export function initGround(): () => void {
  const root = document.documentElement
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-scene], [data-ground-scene]'))
  if (!els.length || typeof IntersectionObserver === 'undefined') return () => {}
  // a 1-px band across the middle of the viewport: the scene crossing it is the one on screen
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      const el = e.target as HTMLElement
      const name = el.dataset.groundScene ?? el.dataset.scene
      if (name && root.dataset.ground !== name) root.dataset.ground = name
    }
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 })
  els.forEach((el) => io.observe(el))
  return () => { io.disconnect(); delete root.dataset.ground }
}
