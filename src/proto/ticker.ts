// One requestAnimationFrame for the whole page (engine + DOM scenes). A task returns true while it
// still needs frames; scroll/resize/visibility wake the loop, and it sleeps when nobody needs it or
// the tab is hidden.
export type Task = (now: number, dt: number) => boolean

const tasks = new Set<Task>()
let raf = 0
let last = 0

function loop(now: number) {
  raf = 0
  const dt = last ? Math.min(now - last, 100) : 16.7
  last = now
  let keep = false
  for (const task of tasks) if (task(now, dt)) keep = true
  if (keep && !document.hidden) raf = requestAnimationFrame(loop)
  else last = 0
}

function wake() {
  if (!raf && !document.hidden && tasks.size) raf = requestAnimationFrame(loop)
}

// guarded: the module is also loaded by the build-time prerender (no window there)
if (typeof window !== 'undefined') {
  addEventListener('scroll', wake, { passive: true })
  addEventListener('resize', wake)
  document.addEventListener('visibilitychange', wake)
}

export const ticker = {
  add(task: Task) { tasks.add(task); wake() },
  remove(task: Task) { tasks.delete(task) },
  wake,
}
