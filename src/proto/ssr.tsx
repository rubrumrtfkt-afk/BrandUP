import { renderToString } from 'react-dom/server'
import { Proto } from './Proto'

/** Build/dev-time prerender of the lab page (vite.config.ts → prerenderProto). No window here. */
export function render(): string {
  return renderToString(<Proto />)
}
