# Bear Mechanical website

A ten-page marketing site for Bear Mechanical (mechanical, electrical, plumbing, and building-automation services), migrated from static HTML into a single-page application.

- Framework: Vue 3
- Build tool: Vite
- Routing: Vue Router (HTML5 history mode)
- Styling: Tailwind CSS (brand tokens) over the preserved custom stylesheet

## Install and run

Requires Node.js 20.19+ or 22.12+ and npm 10+ (tested on Node 24 and npm 11).

```sh
npm install
npm run dev        # local dev server
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npm run lint       # ESLint static checks
npm run typecheck  # Vue template and JavaScript type checks
npm test           # focused unit tests
```

## Routing and hosting

The app uses HTML5 history mode with one route per legacy destination:

`/` `/about` `/team` `/culture` `/awards` `/safety` `/services` `/projects` `/careers` `/contact`

Direct navigation and refresh require the host to fall back to `index.html` for unknown paths (a single-page-app rewrite). On a static host, configure a rewrite of all non-asset routes to `/index.html`. The router also redirects the old `.html` URLs (for example `/about.html` → `/about`), which take effect once the fallback serves the app for those paths.

The original static HTML remains under `legacy/` while route-by-route parity is reviewed. It is source reference material rather than the production entry point.

## Directory structure

- `index.html` — Vite SPA entry
- `src/` — application source (`main.js`, `router.js`, `App.vue`, `components/`, `views/`)
- `css/style.css` — the preserved branded stylesheet
- `public/images/` — image assets served at `/images/`
- `legacy/` — the original static `.html` pages, preserved as parity references
- `docs/` — assessment and agent documentation

See `docs/APP-752-foundation-handoff.md` for exact validation commands, hosting requirements, and migration guardrails.

## Configuration

No environment variables are required to build or run the site.

The contact form is privacy-conscious by default: it does not place visitor input into the URL. Its submission destination is owner-gated and not yet connected; when the owner approves an endpoint, wire it in `src/views/ContactView.vue` (and expose it as `VITE_CONTACT_ENDPOINT` if you prefer environment configuration) without committing any secret.

## Owner-gated items

Contact destination, career destinations, business claims, and media rights require owner confirmation and are not decided in this repository.
