import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { createServer, defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'

type Route = { path: string; title: string; description: string; robots?: 'noindex' }
const SITE = 'https://brandupadvisory.com'
// plano-producao §1: app.html is the light shell (no prerender, no WebGL, no Pixel on /admin/) of these three
// routes; the landing is index.html (the former proto.html). GitHub Pages only serves real files, so each route
// still gets its own dist/<route>/index.html: a copy of the built app.html with its own title, description,
// canonical and robots.
const ROUTES: Route[] = [
  { path: 'thank-you', title: 'Thank you | BrandUp', description: 'Your details are in. BrandUp will call within 5 minutes, business hours.', robots: 'noindex' },
  { path: 'privacy', title: 'Privacy policy | BrandUp', description: 'How BrandUp collects, uses and protects the personal information of people who contact us through brandupadvisory.com.' },
  { path: 'admin', title: 'Lead dashboard | BrandUp', description: 'BrandUp agency lead dashboard.', robots: 'noindex' },
]

function staticRoutes(routes: Route[]): Plugin {
  const isRoute = (pathname: string) => routes.some((r) => pathname === `/${r.path}` || pathname === `/${r.path}/`)
  return {
    name: 'static-routes',
    configureServer(server) {
      // dev has no dist/: the same three routes are served from the running app.html instead.
      server.middlewares.use((req, _res, next) => {
        const [pathname, query] = (req.url ?? '').split(/\?(.*)/s, 2)
        if (isRoute(pathname)) req.url = `/app.html${query ? `?${query}` : ''}`
        next()
      })
    },
    closeBundle() {
      const shell = readFileSync('dist/app.html', 'utf8')
      if (!shell.includes('<!--route-meta-->')) throw new Error('[static-routes] app.html lost its <!--route-meta--> marker')
      if (!shell.includes('<!--og-meta-->')) throw new Error('[static-routes] app.html lost its <!--og-meta--> marker')
      for (const route of routes) {
        const meta = [`<link rel="canonical" href="${SITE}/${route.path}/" />`, route.robots ? `<meta name="robots" content="${route.robots}" />` : '']
        // juri-v58 item 4: OG/Twitter tags for the app shell's routes, templated from the same title/description
        // (one source, like the rest of this route config) — a static replace, no prerender for these three pages.
        const ogUrl = `${SITE}/${route.path}/`
        const ogImage = `${SITE}/og-brandup.jpg`
        const og = [
          '<meta property="og:type" content="website" />',
          '<meta property="og:site_name" content="BrandUp" />',
          `<meta property="og:url" content="${ogUrl}" />`,
          `<meta property="og:title" content="${route.title}" />`,
          `<meta property="og:description" content="${route.description}" />`,
          `<meta property="og:image" content="${ogImage}" />`,
          '<meta name="twitter:card" content="summary_large_image" />',
          `<meta name="twitter:title" content="${route.title}" />`,
          `<meta name="twitter:description" content="${route.description}" />`,
          `<meta name="twitter:image" content="${ogImage}" />`,
        ]
        const html = shell
          .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
          .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${route.description}" />`)
          .replace('<!--route-meta-->', meta.filter(Boolean).join('\n    '))
          .replace('<!--og-meta-->', og.join('\n    '))
        mkdirSync(`dist/${route.path}`, { recursive: true })
        writeFileSync(`dist/${route.path}/index.html`, html)
      }
      // the bare shell is not a page on its own: /app.html would render nothing useful (no route matches it)
      rmSync('dist/app.html')
    },
  }
}

// brief-v4.1 §8 item 8 / plano-producao §1: the landing (index.html, the former proto.html) ships its content as
// HTML (readable without JS, crawlable). Dev uses the running server; build spins a throwaway SSR server, then
// maps the dev asset URLs to the hashed ones.
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
      if (!ctx.filename.endsWith('/index.html') || !html.includes('<!--ssr-->')) return html
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
        // dev: the client still renders the page over an empty shell, so warn and move on. Build: a landing
        // without its prerendered HTML (the H1 is both the LCP and the crawlable copy) must never ship.
        if (dev) {
          console.warn('[prerender-proto] failed, serving the client-only shell:', error)
          return html
        }
        throw new Error('[prerender-proto] the landing prerender failed; refusing to build', { cause: error })
      } finally {
        if (temp) await server?.close()
      }
    },
    closeBundle() {
      // the SSR pass saw the dev URLs of the ?url assets; point them at the hashed files of the build
      if (!existsSync('dist/index.html')) return
      let html = readFileSync('dist/index.html', 'utf8')
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
      writeFileSync('dist/index.html', html)
    },
  }
}

// juri-v57 §6 item 5: the landing's one CSS file (type.css + proto.css, Vite bundles them together since
// index.html links both) was a render-blocking request Lighthouse estimated at ~130-150 ms (juri-v57 §2,
// render-blocking-insight). Dev keeps the <link> tags (proto.css/type.css edits still hot-reload); the build
// inlines the bundled file's content into index.html's <head> and drops the file — nothing else in dist/
// references it (verified: only index.html's own <link> did, grep across dist/*.html and dist/*/*.html).
function inlineLandingCss(): Plugin {
  return {
    name: 'inline-landing-css',
    closeBundle() {
      if (!existsSync('dist/index.html')) return
      const html = readFileSync('dist/index.html', 'utf8')
      const match = html.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/)
      // senior-review S2: a silent skip here would ship the landing with NEITHER the inline <style> NOR the
      // <link> (the replace below would just no-op on a string that still has the tag) — unstyled in production
      // and nobody would notice until a screenshot. Fail the build instead.
      if (!match) throw new Error('[inline-landing-css] no <link rel="stylesheet"> found in dist/index.html to inline')
      const cssPath = `dist${match[1]}`
      if (!existsSync(cssPath)) throw new Error(`[inline-landing-css] ${cssPath} (referenced by index.html) does not exist`)
      const css = readFileSync(cssPath, 'utf8')
      // a string replacement would read $&, $1, $` etc. in the CSS as backreference patterns; a function
      // replacer inserts its return value literally, whatever the CSS contains.
      writeFileSync('dist/index.html', html.replace(match[0], () => `<style>${css}</style>`))
      rmSync(cssPath)
    },
  }
}

// senior-review I2: the build must fail loudly if these are missing, not discover it only when a visitor submits
// the form (leadRestSender.ts throws then, too, as the last-resort guard — this is the first one). `apply:
// 'build'` means `vite dev`/`vite preview` never need them (the dev sender is always the simulated one).
// loadEnv (not process.env directly) reads the same .env files Vite itself would for this mode, merged with the
// real process env (how the CI workflow passes them) — the same source VITE_SUPABASE_URL will be read from.
function requireSupabaseEnv(): Plugin {
  return {
    name: 'require-supabase-env',
    apply: 'build',
    config(_config, { mode }) {
      const env = loadEnv(mode, process.cwd(), 'VITE_')
      const url = env.VITE_SUPABASE_URL
      const key = env.VITE_SUPABASE_PUBLISHABLE_KEY
      if (!url || !key) {
        throw new Error(
          '[require-supabase-env] VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY must be set to build: ' +
          'the landing\'s real lead sender (src/lib/leadRestSender.ts) needs them (plano-producao §2).',
        )
      }
      try {
        new URL(url)
      } catch {
        throw new Error(`[require-supabase-env] VITE_SUPABASE_URL is not a valid URL: "${url}"`)
      }
    },
  }
}

// go-live content rule: <Todo> (src/StaticPage.tsx) already renders null outside dev, so this should never find
// anything — it is the backstop, not the mechanism, in case a future edit puts owner-only placeholder text
// somewhere Todo isn't (a literal string, a different component). Scans every .html in dist/ (the three route
// folders too) and every .js in dist/assets/ — exactly `dist/**/*.html` and `dist/assets/*.js`, no further.
function forbidOwnerTodos(): Plugin {
  return {
    name: 'forbid-owner-todos',
    closeBundle() {
      if (!existsSync('dist')) return
      const hasOwnerTodo = (path: string) => {
        const text = readFileSync(path, 'utf8')
        return text.includes('data-todo') || text.includes('TODO(dono)')
      }
      const offenders: string[] = []
      for (const name of readdirSync('dist', { recursive: true }) as string[]) {
        if (name.endsWith('.html') && hasOwnerTodo(`dist/${name}`)) offenders.push(`dist/${name}`)
      }
      if (existsSync('dist/assets')) {
        for (const name of readdirSync('dist/assets')) {
          if (name.endsWith('.js') && hasOwnerTodo(`dist/assets/${name}`)) offenders.push(`dist/assets/${name}`)
        }
      }
      if (offenders.length) {
        throw new Error(`[forbid-owner-todos] an owner-only placeholder ("data-todo" or "TODO(dono)") reached: ${offenders.join(', ')}`)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), staticRoutes(ROUTES), prerenderProto(), inlineLandingCss(), requireSupabaseEnv(), forbidOwnerTodos()],
  build: {
    rollupOptions: {
      // two shells (plano-producao §1): the landing (index.html) and the light app shell of /thank-you, /privacy
      // and /admin/ (app.html). App.tsx (the former home) stays out of both for now (rollback window, plano §1).
      input: { main: 'index.html', app: 'app.html' },
    },
  },
})
