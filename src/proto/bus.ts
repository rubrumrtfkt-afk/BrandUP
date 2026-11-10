// Plain shared state between the React DOM and the WebGL engine. React writes, the engine reads once
// per frame; no re-render is involved, so this does not need a store library.
export const bus = {
  /** index of the agent under the pointer/focus in the hero, -1 for none */
  hotAgent: -1,
  /** per form id: which of the 5 fields is valid (one light beam each) */
  beams: {} as Record<string, boolean[]>,
  /** one rise at a time (brief-v4.1 §4.5 / §4.10): source point in viewport px is re-read each frame */
  rise: { at: -1, src: 'phone' as 'phone' | 'hero' },
  /** the scroll-driven yes (§4.5): which hero agent sent the order, the dot travelling to the agent after a yes */
  sim: { agent: -1, travel: -1, fill: 0, declined: 0 },
  /** office scene (§4.3), written by domScenes, read by the engine */
  office: { on: 0, offOn: 0, day: 0, litAt: [-1, -1, -1, -1, -1, -1] as number[], dolly: 0, cm: null as null | { su: number; sv: number; ou: number; ov: number } },
  phone: {
    /** 1 = an order is waiting (beams converge on the phone), 0 = nothing waiting */
    lit: 0,
    /** performance.now() of the last approval: the light rises out of the phone; -1 = never */
    riseAt: -1,
    /** performance.now() when "All clear" took the screen (step 7); -1 otherwise. C5 waits CLEAR_READ_MS after it */
    clearAt: -1,
  },
  /** brief-v4.4 §5.3 / §6.2: the two scrubbed seams, 0…1 (domScenes writes them from the scroll, the engine reads):
   *  c4 = the office → the phone (the order crosses the dark), c5 = the phone → the FAQ (it comes apart) */
  c4: 0,
  c5: 0,
  /** brief-v4.4 §8.1: the ignition of each ground, 0…1 (the orla, the horizon); the voice reads it */
  ign: {} as Record<string, number>,
  /** brief-v4.6 §4: the testimonials' scrubbed packets, in document px (testiScene writes, the engine draws minus scrollY):
   *  the entry runs from the FAQ's orla to the 1st node n1 over the scroll a → b; rail = the 390 gesture (bar tip k → k+1) */
  testi: { a: 0, b: 0, n1: null as null | [number, number], rail: null as null | { a: [number, number]; b: [number, number]; t: number } },
}
