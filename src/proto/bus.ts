// Plain shared state between the React DOM and the WebGL engine. React writes, the engine reads once
// per frame; no re-render is involved, so this does not need a store library.
export const bus = {
  /** index of the agent under the pointer/focus in the hero, -1 for none */
  hotAgent: -1,
  /** per form id: which of the 5 fields is valid (one light beam each) */
  beams: {} as Record<string, boolean[]>,
  /** one rise at a time (brief-v4.1 §4.5 / §4.10): source point in viewport px is re-read each frame */
  rise: { at: -1, src: 'phone' as 'phone' | 'hero' },
  /** the scroll-driven yes (§4.5): which hero agent sent the order, the dot travelling to the phone */
  sim: { agent: -1, travel: -1, fill: 0, declined: 0 },
  /** office scene (§4.3), written by domScenes, read by the engine */
  office: { on: 0, offOn: 0, day: 0, litAt: [-1, -1, -1, -1, -1, -1] as number[], dolly: 0, cm: null as null | { su: number; sv: number; ou: number; ov: number } },
  /** FAQ → logo (§4.8 / §4.7) */
  faq: { answered: 0, current: -1, riseAt: [-1, -1, -1, -1, -1] as number[], anchorY: [0, 0, 0, 0, 0] as number[] },
  phone: {
    /** 1 = an order is waiting (beams converge on the phone), 0 = nothing waiting */
    lit: 0,
    /** performance.now() of the last approval: the light rises out of the phone; -1 = never */
    riseAt: -1,
  },
}
