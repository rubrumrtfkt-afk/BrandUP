// The office as VIDEO (owner 09/11): an animated loop of the resin figures rendered in Blender with the SAME
// camera as the masters (docs/redesign/render/v2/loop/: 6 s, 24 fps, seamless; H.264 High yuv420p + VP9
// profile 0). 1600×1384 = the 2080×1800 master at 1600/2080; 780×1120 = 2/3 of the 1170×1680 portrait, so
// the desk coordinates (normalised by the still's size) hold for the video too. The stills stay the poster.
import nightLoop1600Webm from '../assets/office-night-loop-1600.webm?url'
import nightLoop1600Mp4 from '../assets/office-night-loop-1600.mp4?url'
import dayLoop1600Webm from '../assets/office-day-loop-1600.webm?url'
import dayLoop1600Mp4 from '../assets/office-day-loop-1600.mp4?url'
import nightLoop780Webm from '../assets/office-night-loop-780.webm?url'
import nightLoop780Mp4 from '../assets/office-night-loop-780.mp4?url'
import dayLoop780Webm from '../assets/office-day-loop-780.webm?url'
import dayLoop780Mp4 from '../assets/office-day-loop-780.mp4?url'

export type LoopSrc = { webm?: string; mp4?: string }
export type OfficeLoop = Record<'master' | 'portrait', Partial<Record<'night' | 'day', LoopSrc>>>
export const OFFICE_LOOP: OfficeLoop = {
  master: { night: { webm: nightLoop1600Webm, mp4: nightLoop1600Mp4 }, day: { webm: dayLoop1600Webm, mp4: dayLoop1600Mp4 } },
  portrait: { night: { webm: nightLoop780Webm, mp4: nightLoop780Mp4 }, day: { webm: dayLoop780Webm, mp4: dayLoop780Mp4 } },
}
