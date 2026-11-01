import { copyFileSync, mkdirSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages only serves real files, so each public route gets its own index.html.
function staticRoutes(routes: string[]): Plugin {
  return {
    name: 'static-routes',
    closeBundle() {
      for (const route of routes) {
        mkdirSync(`dist/${route}`, { recursive: true })
        copyFileSync('dist/index.html', `dist/${route}/index.html`)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), staticRoutes(['thank-you', 'privacy'])],
})
