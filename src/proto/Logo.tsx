/** The brand mark. Shared (juri-v58 item 1): /thank-you and /privacy (StaticPage.tsx, no WebGL, no engine) show
 *  the exact same SVG the landing's header uses, not a re-declared copy. Zero dependencies on purpose — this file
 *  must stay safe to import from the light shell (app.html) without dragging in anything proto-specific. */
export function Logo() {
  return (
    // width/height in the markup (brief-v4.5 §4.5): before the stylesheet (dev injects it from JS) an SVG without them
    // paints at the width of the screen: the giant purple triangle of the 1st frame of a reload
    // v55 the intro builds it (index.html): the triangle, then the word, then the arrow rises from under the base, clipped
    // to the triangle (the clip never cuts the arrow at rest: it sits inside)
    <svg className="logo" viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
      <defs><clipPath id="logo-clip"><path d="M20 5 L35 33 L5 33 Z" /></clipPath></defs>
      <path className="logo-tri" d="M20 5 L35 33 L5 33 Z" fill="#9232EA" stroke="#9232EA" strokeWidth="2" strokeLinejoin="round" />
      <g clipPath="url(#logo-clip)">
        <g className="logo-arw">
          <path d="M20 13 L26 22 L14 22 Z" fill="#FFFFFF" />
          <rect x="17.5" y="21" width="5" height="9" rx="2.5" fill="#FFFFFF" />
        </g>
      </g>
    </svg>
  )
}
