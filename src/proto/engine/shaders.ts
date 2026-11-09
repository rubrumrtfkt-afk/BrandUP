// Our shaders (brief-v4 §2.3 / §7.1). Light is a single scalar intensity rendered at one texel per
// dither cell, then quantised to 4 levels of the brand ramp with an ordered Bayer matrix in CSS-px
// space. No blur, no bloom: hard dots, like a screen print.

const HEADER = /* glsl */ `#version 300 es
precision highp float;
`

/** Every particle is one unit of work. Network (hero) → falls → grid of the night. */
export const POINT_VS = HEADER + /* glsl */ `
in vec3 aNet;
in vec3 aGrid;
in vec4 aInfo;
uniform vec2 uView;      // light-buffer extent in CSS px
uniform float uTime;
uniform vec3 uNetF;      // network centre x, base y (viewport px), px per unit
uniform float uFall;     // 0 network … 1 grid
uniform float uHot;      // agent under pointer, -1 none
uniform vec2 uNodes[10];
uniform vec4 uCam;       // f, horizon y, eye height, plane width
uniform vec2 uZ;         // near, far
uniform float uPortrait;
uniform float uGridOn;
uniform float uGridY;
uniform float uCrest;
uniform float uConv;
uniform vec2 uLead;
uniform float uCell;
uniform float uNetS;     // x stretch of the network (1 in the hero)
uniform float uDim;      // 1 = only the hot agent's wire is lit, the rest at 25% (the phone, v4.1 §4.4)
uniform float uNetI;     // overall network intensity
uniform vec4 uForm;      // the form section (viewport px): after the fall the points settle there as its ground
uniform float uFormMix;  // 1 = flat behind the form, 0 = the night's floor
uniform vec3 uPtr;       // pointer x, y, strength (the points make way, subtly)
out float vI;
out float vG;            // the mint accent: only the agent that is acting right now

const int EF[9] = int[9](0, 1, 2, 3, 4, 5, 6, 7, 8);
const int ET[9] = int[9](6, 6, 8, 8, 7, 7, 9, 9, 9);

void main() {
  float role = aInfo.x; int id = int(aInfo.y + .5); float seed = aInfo.z; float phase = aInfo.w;
  vec2 p; float iNet; float sNet = 2.0;
  int hot = int(uHot + (uHot < 0. ? -.5 : .5));
  int hotBrain = hot >= 0 ? ET[hot] : -1;
  float gNet = 0.;
  if (role < .5) {                       // brain: a dense volume that thinks by slow turbulence
    vec2 o = aNet.xy * (1. + .12 * sin(uTime * .45 + seed * 31.));
    o += .028 * vec2(sin(uTime * .6 + seed * 53. + o.y * 9.), cos(uTime * .5 + seed * 71. + o.x * 9.));
    p = uNodes[id] + o; iNet = .3 + (id == hotBrain ? .15 : 0.);
  } else if (role < 1.5) {               // agent: a smaller cluster with a job title
    p = uNodes[id] + aNet.xy + .006 * vec2(sin(uTime + seed * 40.), cos(uTime * .8 + seed * 20.));
    iNet = .32 + (id == hot ? .55 : 0.); sNet = 2.2;
    if (id == hot) { gNet = .9; iNet *= .35; } // the acting agent's core turns mint (owner 09/11: the accent lives in the light)
  } else if (role < 2.5) {               // you: the vertex, breathing slowly while work waits
    p = uNodes[9] + aNet.xy * (1. + .18 * sin(uTime * 1.6));
    iNet = .55; sNet = 2.4;
  } else {                               // a unit of work running along a named wire, upward
    int a = EF[id]; int b = ET[id];
    float sp = .07 + seed * .05;
    float t = fract(phase + uTime * sp);
    vec2 A = uNodes[a]; vec2 B = uNodes[b];
    vec2 d = normalize(B - A);
    p = mix(A, B, t) + vec2(-d.y, d.x) * aNet.x;
    float lit = (id == hot || (id >= 6 && a == hotBrain)) ? 1.8 : 1.;
    iNet = (id >= 6 ? .62 : .42) * pow(sin(3.14159 * t), .6) * lit; sNet = 2.0;
    if (uDim > .5 && lit < 1.5) iNet *= .4;
  }
  if (uDim > .5) {
    if (role < .5 && id != hotBrain) iNet *= .4;
    else if (role > .5 && role < 1.5 && id != hot) iNet *= .4;
  }
  iNet *= uNetI;
  // the fall: the network tilts back onto the floor (rotation about its base)
  float ang = uFall * 1.35;
  float depth = p.y * sin(ang);
  float persp = 1. / (1. + depth * .55);
  vec2 sN = vec2(uNetF.x + p.x * uNetF.z * uNetS * persp, uNetF.y - p.y * cos(ang) * uNetF.z * persp);

  // the grid: one point per moment of the night; the crest is time passing
  float tc = uPortrait > .5 ? aGrid.y : aGrid.x;
  float d = tc - uCrest;
  float crest = exp(-d * d / .0018);
  float flag = aGrid.z;
  bool work = flag > .5; bool ev = flag > 1.5;
  float done = d < 0. ? 1. : 0.;
  float y = .2 * crest + (work ? .05 * done : 0.);
  float X = (aGrid.x - .5) * uCam.w;
  float Z = mix(uZ.x, uZ.y, aGrid.y);
  vec2 sG = vec2(uView.x * .5 + uCam.x * X / Z, uCam.y + uCam.x * (uCam.z - y) / Z + uGridY);
  float iG = .42 + .07 * sin(uTime * 1.7 + seed * 53.) + .7 * crest + (work ? .38 * done : 0.) + (ev ? .9 * done : 0.);
  if (work) { sG = mix(sG, uLead, uConv * (.6 + .4 * seed)); }
  else iG *= 1. - .75 * uConv;
  float sGs = .7 + 1.6 * uZ.x / Z + (ev ? 1.5 * done : 0.) + crest;

  // behind the form: a flat field of the same points, drifting slowly, parting around the pointer
  vec2 sF = uForm.xy + aGrid.xy * uForm.zw + vec2(sin(uTime * .5 + seed * 40.), cos(uTime * .4 + phase * 30.)) * 2.5;
  vec2 dp = sF - uPtr.xy; float dd = length(dp);
  float push = uPtr.z * exp(-dd * dd / 9000.);
  sF += (dd > .01 ? dp / dd : vec2(0.)) * push * 24.;
  float iF = (.24 + .1 * seed + push * .3) * (work ? 1.2 : 1.);

  float m = smoothstep(.3, 1., uFall);
  vec2 s = mix(sN, mix(sG, sF, uFormMix), m);
  vI = mix(iNet, mix(iG * uGridOn, iF, uFormMix), m);
  vG = gNet * uNetI * (1. - m);
  gl_PointSize = mix(sNet, mix(sGs, 1.7, uFormMix), m) * (2. / uCell);
  vec2 ndc = s / uView * 2. - 1.;
  gl_Position = vec4(ndc.x, -ndc.y, 0., 1.);
}
`

export const POINT_FS = HEADER + /* glsl */ `
in float vI;
in float vG;
out vec4 o;
void main() {
  vec2 c = gl_PointCoord * 2. - 1.;
  float r = dot(c, c);
  if (r > 1.) discard;
  o = vec4(vI * (1. - .55 * r), vG * (1. - .55 * r), 0., 1.);
}
`

export const QUAD_VS = HEADER + /* glsl */ `
in vec2 position;
in vec2 uv;
void main() { gl_Position = vec4(position, 0., 1.); }
`

/** Analytic light (v4.1): the horizon and its beams (to the final logo), the rise after a yes, the
 *  logo triangle (FAQ field → final mark), the dots that rise to its apex, the light that gathers
 *  around an action (?btn=field), the order travelling to the phone, the night's event beams and the
 *  office's desk pools. One scalar into the light buffer; the composite dithers it. */
export const FIELD_FS = HEADER + /* glsl */ `
uniform vec2 uBuf;
uniform float uCell;
uniform float uTime;
uniform vec4 uHz;         // horizon: x0, x1, y, on
uniform float uBeam[5];   // beam heights in px
uniform vec4 uBeamTo;     // beams converge: -, logo centre x, half width, on
uniform vec4 uRise;       // cx, top y, progress 0…1, on
uniform vec4 uTri;        // logo: centre x, apex y, height, on
uniform vec4 uTriL;       // lit fraction from the apex, arrow 0…1, -, column mode
uniform vec3 uFDot[5];    // FAQ dots rising: x, y, on
uniform vec4 uAct[2];     // action rects (viewport px)
uniform vec4 uActP[2];    // reach px, level, speed, on
uniform vec3 uTrav;       // the order travelling to the phone: x, y, on
uniform vec4 uEvB[5];     // night event beams: x, bottom y, top y, on
uniform vec4 uPool[6];    // office desk pools: x, y, r, on
uniform float uActG;      // 1 = the light around the action has a mint core (owner 09/11: the accent)
uniform float uFlyOn;     // 1 while any dot of the dawn flies (skips the loop otherwise)
uniform vec4 uFly[24];    // T3 "the dawn" (brief-v4.2 §5.3): the figures' dots flying to the desks: x, y, size, on
out vec4 o;

float logo(vec2 q) { // 0 outside, 1 body, 2 arrow (public/favicon.svg, 40-unit box)
  if (q.y < 5. || q.y > 33.) return 0.;
  if (abs(q.x - 20.) > (q.y - 5.) * 15. / 28.) return 0.;
  bool head = q.y >= 13. && q.y <= 22. && abs(q.x - 20.) <= (q.y - 13.) * 6. / 9.;
  bool bar = q.y >= 21. && q.y <= 30. && abs(q.x - 20.) <= 2.5;
  return head || bar ? 2. : 1.;
}
float h21(vec2 c) { return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453); }
float sdBox(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.)) + min(max(q.x, q.y), 0.) - r; }
float blob(vec2 p, vec2 c, float s) { vec2 d = p - c; return exp(-dot(d, d) / s); }

void main() {
  vec2 p = vec2(gl_FragCoord.x, uBuf.y - gl_FragCoord.y) * uCell; // CSS px, top-left origin
  float I = 0.;
  float G = 0.; // the accent channel (mint): only the core around an action and the rise of a yes
  float F = 0.; // light that must also show ON the office model (the composite paints it over the render)
  bool grid8 = mod(p.x, 8.) < 2. && mod(p.y, 8.) < 2.;
  // idle life: each dot of the logo field twinkles on its own slow phase (the grain breathing)
  float tw = .78 + .44 * smoothstep(.55, 1., .5 + .5 * sin(uTime * 1.3 + h21(floor(p / 4.)) * 6.2832));

  if (uHz.w > 0.) {
    float dy = p.y - uHz.z;
    float span = smoothstep(uHz.x, uHz.x + 160., p.x) * (1. - smoothstep(uHz.y - 160., uHz.y, p.x));
    I += (exp(-dy * dy / 6.) * .95 + (dy < 0. ? exp(dy / 22.) * .32 : exp(-dy / 5.) * .18)) * span * uHz.w;
    for (int i = 0; i < 5; i++) {
      float h = uBeam[i];
      if (h < 1.) continue;
      float up = -dy;
      if (up <= 0. || up >= h) continue;
      float bx = mix(uHz.x, uHz.y, (float(i) + .5) / 5.);
      if (uBeamTo.w > 0.) bx = mix(bx, uBeamTo.y + (float(i) - 2.) * .4 * uBeamTo.z, up / max(h, 1.));
      float dx = p.x - bx;
      float carrier = step(.38, fract(up / 9. - uTime * .9));
      I += exp(-dx * dx / 4.) * (uBeamTo.w > 0. ? .8 : 1. - up / h) * (.55 + .45 * carrier) * uHz.w;
    }
  }

  if (uRise.w > 0.) {
    float head = uRise.y - uRise.z * (uRise.y + 260.);
    float v = p.y - head;
    if (v > 0. && v < 86. && abs(p.x - uRise.x) < v / 86. * 50.) G += 1.1;
    float bar = p.y - (head + 60.);
    if (bar > 0. && p.y < uRise.y && abs(p.x - uRise.x) < 8.) G += exp(-bar / 220.);
  }

  if (uTri.w > 0.) {
    if (uTriL.w > .5) { // phone FAQ: the triangle seen from the side, a column of dots
      if (abs(p.x - uTri.x) < 1.5 && mod(p.y, 8.) < 2. && p.y > uTri.y && p.y < uTri.y + uTri.z) {
        float f = (p.y - uTri.y) / uTri.z;
        I += (f < uTriL.x ? .7 : .25) * tw * uTri.w;
      }
    } else {
      float unit = uTri.z / 28.;
      vec2 q = (p - uTri.xy) / unit + vec2(20., 5.);
      float l = logo(q);
      float f = (q.y - 5.) / 28.;
      if (l > 1.5 && uTriL.y > .01 && f < 1. - (1. - uTriL.y) * 1.2) I += (.9 + .1 * sin(uTime * 1.6)) * uTri.w; // the arrow lights, bottom → top sweep
      // the answered part (from the apex down) is denser: every 4 px instead of 8 (brief: "o ápice adensa")
      else if (l > .5 && f < uTriL.x && mod(p.x, 4.) < 2. && mod(p.y, 4.) < 2.) I += (.55 + .3 * (1. - f)) * tw * uTri.w;
      else if (l > .5 && grid8) I += .42 * tw * uTri.w;
    }
  }
  for (int k = 0; k < 5; k++) if (uFDot[k].z > 0.) I += blob(p, uFDot[k].xy, 14.) * 1.3 * uFDot[k].z;

  for (int k = 0; k < 2; k++) {
    vec4 P = uActP[k];
    if (P.w <= 0.) continue;
    vec4 r = uAct[k];
    vec2 c = (r.xy + r.zw) * .5;
    vec2 hs = (r.zw - r.xy) * .5 + 10.;
    float d = sdBox(p - c, hs, min(hs.y, 30.));
    if (d <= 0. || d >= P.x) continue;
    float fall = 1. - d / P.x;
    float sk = .5 + .5 * sin(p.x * .032 + 1.6 * sin(p.y * .07 + uTime * P.z * .7) + p.y * .055 + uTime * P.z * 2.4);
    float glow = (.2 + .8 * sk) * P.y * P.w * (.85 + .15 * sin(uTime * 1.2)); // breathes slowly at rest
    if (uActG > .5) { G += pow(fall, 2.6) * glow * 1.05; I += pow(fall, 1.2) * (1. - fall * .8) * glow * .7; }
    else I += pow(fall, 1.5) * glow * .85;
  }

  if (uTrav.z > 0.) G += blob(p, uTrav.xy, 16.) * 1.4 * uTrav.z; // the order on its way to your yes
  if (uFlyOn > 0.) for (int k = 0; k < 24; k++) {
    vec4 d = uFly[k];
    if (d.w <= 0.) continue;
    float v = blob(p, d.xy, d.z) * d.w;
    I += v; F += v;
  }

  for (int k = 0; k < 5; k++) {
    vec4 e = uEvB[k];
    if (e.w <= 0. || p.y < e.z || p.y > e.y || abs(p.x - e.x) > 1.6) continue;
    float carrier = step(.45, fract((e.y - p.y) / 10. + uTime * .9));
    if (p.y < e.z + 10.) G += .8 * e.w; // the tip of each event beam: the action itself, in the accent
    else I += (.35 + .45 * carrier) * e.w;
  }
  for (int k = 0; k < 6; k++) {
    vec4 q = uPool[k];
    if (q.w <= 0.) continue;
    float d = length((p - q.xy) * vec2(1., 1.5));
    I += .62 * (1. - smoothstep(0., q.z, d)) * q.w * (.8 + .2 * sin(uTime * 1.4 + float(k) * 1.7)); // the desk's light breathes
    for (int j = 0; j < 4; j++) { // work rising from an active desk, upward like all light here
      float t = fract(uTime * .22 + float(j) * .25 + float(k) * .137);
      vec2 c = q.xy + vec2(sin(float(j) * 2.3 + float(k)) * q.z * .35, -t * q.z * 1.2);
      I += blob(p, c, 5.) * (1. - t) * .9 * q.w;
    }
  }

  o = vec4(I, G, F, 1.);
}
`

/** Composite: dark zones under titles/labels, then the ordered dither onto the brand ramp. */
export const COMP_FS = HEADER + /* glsl */ `
uniform sampler2D tLight;
uniform vec2 uBuf;
uniform float uCell;
uniform float uDpr;
uniform float uViewH;
uniform vec4 uDark[16];
uniform float uDarkF[16];
uniform int uDarkN;
uniform sampler2D tNight;
uniform sampler2D tDay;
uniform vec4 uOffR;      // office quad, viewport CSS px
uniform vec4 uOffM;      // cover map: ou, ov, su, sv
uniform float uOffOn;    // 0 = no office; else visibility
uniform float uOffLum;   // brightness of the 'off' office (night render, desaturated)
uniform vec3 uDesk[6];   // desk centre uv + reveal radius (uv-x units)
uniform float uDeskK;    // y flattening of the reveal ellipse
uniform float uDayP;     // night → day dissolve, top → bottom
out vec4 o;

const float B[16] = float[16](0., 8., 2., 10., 12., 4., 14., 6., 3., 11., 1., 9., 15., 7., 13., 5.);
const vec3 C0 = vec3(.031, .027, .043);  // ground  #08070B
const vec3 C1 = vec3(.102, .043, .2);    // deep    #1A0B33
const vec3 C2 = vec3(.573, .196, .918);  // brand   #9232EA
const vec3 C3 = vec3(.788, .635, 1.);    // hot     #C9A2FF
const vec3 C4 = vec3(.984, .969, 1.);    // core    #FBF7FF
float h21(vec2 c) { return fract(sin(dot(c, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 css = vec2(gl_FragCoord.x, uViewH * uDpr - gl_FragCoord.y) / uDpr;
  vec2 cell = floor(css / uCell);
  vec2 uv = (cell + .5) / uBuf; uv.y = 1. - uv.y;
  vec4 L = texture(tLight, uv);
  float I = L.r, G = L.g;
  ivec2 bi = ivec2(mod(cell, 4.));
  float b = (B[bi.x + bi.y * 4] + .5) / 16.;
  // the office model, no frame (brief-v4.1 §4.3). v4.6 (owner: "a lit desk in a murky block, the edge still reads as
  // a rectangle"): (1) the edge is a superellipse broken by grain, so no straight side survives; (2) the darkest
  // pixels of the render fall through to the page ground by the same Bayer threshold, so the room's shadow IS the
  // fog and grain around it and only what holds light stays; (3) the unlit room is brighter and less grey, the lit
  // desks get a wider pool and more exposure, so the moving figures read.
  if (uOffOn > 0. && css.x > uOffR.x && css.x < uOffR.z && css.y > uOffR.y && css.y < uOffR.w) {
    vec2 sz = uOffR.zw - uOffR.xy;
    vec2 local = (css - uOffR.xy) / sz;
    vec2 e2 = abs(local - .5) * 2.;
    float se = pow(pow(e2.x, 3.2) + pow(e2.y, 3.2), 1. / 3.2) + (h21(cell * .37) - .5) * .16;
    float edge = 1. - smoothstep(.58, .98, se);
    if (edge * uOffOn > b) {
      vec2 tuv = uOffM.xy + local * uOffM.zw;
      vec3 night = texture(tNight, tuv).rgb;
      float g = dot(night, vec3(.299, .587, .114));
      vec3 col = mix(vec3(g), night, .45) * uOffLum;
      float lit = 0., spill = 0.;
      for (int k = 0; k < 6; k++) {
        float d = length((tuv - uDesk[k].xy) * vec2(1., uDeskK));
        float r = uDesk[k].z;
        lit = max(lit, step(d, r * (.8 + .4 * b)));
        spill = max(spill, r > 0. ? 1. - smoothstep(r * .9, r * 1.9, d) : 0.);
      }
      vec3 hot = min(night * 1.45 + vec3(.012, .008, .02), vec3(1.)); // exposure up on the desks that work
      col = mix(col, mix(night, hot, .5), spill * .4);
      col = mix(col, hot, lit);
      if (local.y < uDayP * 1.25 - .12 + (b - .5) * .1) col = texture(tDay, tuv).rgb;
      float lum = dot(col, vec3(.299, .587, .114));
      if (smoothstep(.03, .12, lum) > b * .92 + .04) {
        // light that travels over the model (the dawn's dots, the order leaving the follow-up desk) stays on top
        float lf = floor(clamp(L.b, 0., 1.) * 4. + b);
        if (lf > 1.5) col = lf < 2.5 ? C2 : lf < 3.5 ? C3 : C4;
        float lg = floor(clamp(G, 0., 1.) * 4. + b);
        if (lg > 1.5) col = lg < 2.5 ? vec3(.184, .816, .561) : lg < 3.5 ? vec3(.345, .965, .694) : vec3(.914, 1., .961);
        o = vec4(col, 1.);
        return;
      }
    }
  }
  // titles and labels stay on dark ground: rounded box, its edge dotted by the same Bayer (no hard cut).
  // v4.5: the unlit ground is TRANSPARENT (the textured CSS ground shows through, proto.css body::before/after);
  // inside a dark box the ground is painted opaque again, so the fog and grain never sit under a title.
  float dk = 1.;
  for (int k = 0; k < 16; k++) {
    if (k >= uDarkN) break;
    vec4 r = uDark[k];
    float f = uDarkF[k];
    vec2 c = (r.xy + r.zw) * .5, hs = (r.zw - r.xy) * .5;
    float rad = min(min(hs.x, hs.y), f * .5);
    vec2 q = abs(css - c) - hs + rad;
    float d = length(max(q, 0.)) + min(max(q.x, q.y), 0.) - rad;
    float m = smoothstep(0., f, d);
    float k2 = f >= 24. ? step(b, m) : m;
    I *= k2; G *= k2; dk *= k2;
  }
  float ga = 1. - dk; // alpha of the unlit ground: 0 in the open, 1 under a title
  if (G > .06 && G >= I * .7) { // the mint accent, same 4-level dither
    float lg = floor(clamp(G, 0., 1.) * 4. + b);
    o = lg < .5 ? vec4(C0, ga) : vec4( lg < 1.5 ? vec3(.055, .231, .165) : lg < 2.5 ? vec3(.184, .816, .561) : lg < 3.5 ? vec3(.345, .965, .694) : vec3(.914, 1., .961), 1.);
    return;
  }
  float lv = floor(clamp(I, 0., 1.) * 4. + b);
  vec3 c = lv < .5 ? C0 : lv < 1.5 ? C1 : lv < 2.5 ? C2 : lv < 3.5 ? C3 : C4;
  o = vec4(c, lv < .5 ? ga : 1.);
}
`
