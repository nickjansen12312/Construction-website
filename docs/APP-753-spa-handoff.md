# APP-753 SPA handoff

The ten Bear Mechanical destinations now render from one Vue application entry with a shared header, mobile navigation, footer, route metadata, and data-backed repeated content.

## Routes and compatibility

Canonical routes are `/`, `/about`, `/team`, `/culture`, `/awards`, `/safety`, `/services`, `/projects`, `/careers`, and `/contact`.

Vue Router redirects the corresponding legacy `.html` paths to those routes, including `/index.html` to `/`. The production host must rewrite non-asset requests to `/index.html` before the router can apply those redirects. Vite's development and preview servers provide this fallback; another host needs the equivalent SPA rewrite.

The files under `legacy/` are archived source references. They are excluded from linting and are not Vite entry documents. The obsolete root vanilla-JavaScript bundle was removed after its menu, header, and statistics behavior moved into Vue components.

## Shared implementation

- `SiteHeader.vue` owns header scroll state and the accessible mobile menu, including route-change close, Escape close, focus restoration, and listener cleanup.
- `SiteFooter.vue` is the single footer implementation.
- `StatsGrid.vue` owns the animated and static statistics variants, observes visibility, respects reduced motion, and cancels scheduled animation frames on teardown.
- `siteContent.js` is the shared source for service, project, team, award, career, and statistics structures.
- Route records own page titles and description metadata.

## Intentional parity differences and owner gates

- Career rows remain non-actionable while their destinations are owner-gated. They retain the reviewed visual treatment but do not invent links.
- Contact submission remains locally intercepted so form values never enter a URL, browser history, analytics, or client logs. No submission destination is invented.
- Existing business claims, people, awards, projects, contact details, and media are preserved as migration source content; this refactor does not validate or revise them.
- Service section IDs are retained so existing hash destinations survive the SPA conversion.

## Verification

Run `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build`. The focused tests cover canonical and legacy routes, service hashes, route metadata, the shared shell, mobile-menu accessibility, and route-change cleanup.
