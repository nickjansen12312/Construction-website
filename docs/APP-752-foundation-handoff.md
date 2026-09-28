# SPA foundation handoff

The contributor branch uses Vue 3, Vite, Vue Router in HTML5 history mode, and Tailwind CSS v4. The owner confirmed support for current evergreen Chrome, Edge, Safari, and Firefox, so Tailwind v4 is the selected major.

## Supported toolchain

- Node.js `^20.19.0 || >=22.12.0`
- npm `>=10` (`packageManager` records npm 11.13.0)
- Exact dependency versions are locked in `package-lock.json`.

## Commands

```sh
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
```

The focused unit suite asserts all ten public routes, all ten legacy `.html` redirects, and the four service hashes. A production verification should start `npm run preview` and request at least one clean route and its legacy equivalent directly, such as `/services` and `/services.html`.

## Migration notes

- `src/App.vue` owns the shared header/router/footer shell.
- `src/router.js` is the canonical route and legacy-redirect table.
- `src/tailwind.css` exposes the deliberate brand colors `#5f0008`, `#f5f1e8`, and `#65694f`; `css/style.css` remains the broader visual source of truth.
- The original static pages remain under `legacy/` as parity references. Do not remove them until the full migration task verifies route-by-route content and behavior.
- Production hosting must rewrite non-asset requests to `/index.html`. Without that fallback, direct navigation and refresh on history-mode routes will fail before Vue Router runs.
- Contact submission, career destinations, business claims, identities, awards, project facts, and media rights remain owner-gated. Foundation work must not choose or publish replacements.
- The current branch already contains view files for all ten destinations. The next migration task should audit those views against `legacy/` rather than recreating them blindly.
