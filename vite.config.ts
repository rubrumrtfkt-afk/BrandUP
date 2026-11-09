import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { createServer, defineConfig, type Plugin, type ViteDevServer } from 'vite'
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

// brief-v4.1 §8 item 8: proto.html ships its content as HTML (readable without JS, crawlable). Dev uses
// the running server; build spins a throwaway SSR server, then maps the dev asset URLs to the hashed ones.
function prerenderProto(): Plugin {
  let dev: ViteDevServer | undefined
  const render = async (server: ViteDevServer) => {
    const mod = (await server.ssrLoadModule('/src/proto/ssr.tsx')) as { render: () => string }
    return mod.render()
  }
  return {
    name: 'prerender-proto',
    configureServer(server) { dev = server },
    async transformIndexHtml(html, ctx) {
      if (!ctx.filename.endsWith('proto.html') || !html.includes('<!--ssr-->')) return html
      let server = dev
      let temp = false
      try {
        if (!server) {
          // Own cacheDir and no dep discovery: sharing node_modules/.vite re-optimized the deps under a
          // different config hash and left a running dev server answering 504 "Outdated Optimize Dep".
          server = await createServer({
            configFile: false,
            plugins: [react()],
            logLevel: 'error',
            cacheDir: 'node_modules/.vite-prerender',
            optimizeDeps: { noDiscovery: true },
            server: { middlewareMode: true, hmr: false },
            appType: 'custom',
          })
          temp = true
        }
        return html.replace('<!--ssr-->', await render(server))
      } catch (error) {
        // the page still works without the prerender (the client renders it); say so loudly
        console.warn('[prerender-proto] failed, serving the client-only shell:', error)
        return html
      } finally {
        if (temp) await server?.close()
      }
    },
    closeBundle() {
      // the SSR pass saw the dev URLs of the ?url assets; point them at the hashed files of the build
      if (!existsSync('dist/proto.html')) return
      let html = readFileSync('dist/proto.html', 'utf8')
      const files = readdirSync('dist/assets')
      html = html.replace(/\/src\/proto\/assets\/([\w-]+)\.(\w+)/g, (m, name: string, ext: string) => {
        const hit = files.find((f) => f.startsWith(`${name}-`) && f.endsWith(`.${ext}`))
        if (hit) return `/assets/${hit}`
        // below assetsInlineLimit the client bundle inlined it too: inline the same bytes
        const src = `src/proto/assets/${name}.${ext}`
        if (!existsSync(src)) return m
        const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'application/octet-stream'
        return `data:${mime};base64,${readFileSync(src).toString('base64')}`
      })
      writeFileSync('dist/proto.html', html)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), staticRoutes(['thank-you', 'privacy']), prerenderProto()],
  build: {
    rollupOptions: {
      // proto.html is the v4 lab (brief-v4 §8): a separate entry so App.tsx in production is untouched.
      input: { main: 'index.html', proto: 'proto.html' },
    },
  },
})
