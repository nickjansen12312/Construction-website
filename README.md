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
npm run test:smoke # Chromium browser smoke suite (builds, then serves dist/ locally)
```

The smoke command runs only against `127.0.0.1`. It intercepts every contact
submission in the browser, so it never contacts recipients or production services.
Run `npx playwright install chromium` once after installing dependencies if the
local Chromium binary is not already available.

## Routing and hosting

The app uses HTML5 history mode with one route per legacy destination:

`/` `/about` `/team` `/culture` `/awards` `/safety` `/services` `/projects` `/careers` `/contact`

Direct navigation and refresh require the host to fall back to `index.html` for unknown paths (a single-page-app rewrite). On a static host, configure a rewrite of all non-asset routes to `/index.html`. The router also redirects the old `.html` URLs (for example `/about.html` → `/about`), which take effect once the fallback serves the app for those paths.

The original static HTML remains under `legacy/` as archived parity reference material. It is not a production entry point; Vite builds only the root `index.html` application shell.

## Directory structure

- `index.html` — Vite SPA entry
- `src/` — application source (`main.js`, `router.js`, `App.vue`, `components/`, `views/`)
- `css/style.css` — the preserved branded stylesheet
- `public/images/` — image assets served at `/images/`
- `legacy/` — the original static `.html` pages, preserved as parity references
- `docs/` — assessment and agent documentation
- `tests/site.smoke.spec.js` — local Chromium route, interaction, and mocked-contact smoke suite

See `docs/APP-752-foundation-handoff.md` for foundation details and `docs/APP-753-spa-handoff.md` for route compatibility, parity notes, and SPA verification.

## Contact submission and deployment handoff

The form sends JSON only to the same-origin `POST /api/contact` path. It never uses form `GET`, URL query parameters, browser history, analytics, or client logging for visitor fields. Client validation, pending, success, validation-error, rate-limit, disabled, and service-failure states are explicit and announced accessibly.

`api/contact.js` is the owned server contract. Vite mounts it as a repository-local mock while running `npm run dev`; the mock accepts valid test submissions but stores and forwards nothing. Production builds are deliberately static, so the production host must mount that handler (or an equivalent owner-approved implementation) at the same-origin `/api/contact` path. A missing handler will surface as a service failure in the browser; a mounted but unconfigured handler returns an explicit disabled response (`503`).

Server-only configuration names (do not put values in the repository or expose them as `VITE_*` variables):

- `CONTACT_DELIVERY_MODE`: use `mock` only for development/testing. The production default is `disabled`.
- `CONTACT_MOCK_OUTCOME=service_failure`: development/test-only failure simulation.

Before production delivery is enabled, the owner must approve a delivery adapter, recipient, retention period, and any provider-specific server-only environment-variable names. The current contract keeps no submissions and logs no visitor fields. The handler applies a per-client in-memory limit of five requests per minute plus a honeypot; a production adapter should provide durable, privacy-reviewed rate limiting and data retention/deletion controls.

See `docs/APP-754-contact-submission-handoff.md` for the precise hosting boundary and production decision gates.

## Contribution scope

Contributors may improve the Vue application, tests, documentation, and local
assets while preserving all ten public routes and the existing brand language.
Do not add a real contact recipient, job destination, business claim, person,
award, project fact, or media asset without owner approval. Do not push, open a
pull request, deploy, or add contributor CI without separate authorization.

## Owner-gated items

Contact destination, career destinations, business claims, and media rights require owner confirmation and are not decided in this repository.
