---
name: project-context
description: Bear Mechanical website (upstream nickjansen12312/Construction-website). Vue 3 + Vite + Vue Router + Tailwind SPA migration of a ten-page static site on the contributor branch paperclip/app-743-assessment.
---

# Bear Mechanical website

## Stack and package manager

- Vue 3, Vite, Vue Router (history mode), Tailwind CSS v4.
- npm (no lockfile pin to a monorepo; standalone Vite project).

## Authoritative commands

- `npm install`
- `npm run dev` — Vite dev server (history-mode fallback built in).
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the production build.

## Important paths

- `index.html` — Vite SPA entry.
- `src/main.js`, `src/router.js`, `src/App.vue` — app entry, router, shell.
- `src/components/` — shared shell (header, footer).
- `src/views/` — one view per route (home, about, team, culture, awards, safety, services, projects, careers, contact).
- `src/assets/site.css` — the preserved branded stylesheet (design source of truth).
- `legacy/` — the original static `.html` pages, archived after SPA parity.
- `public/images/` — image assets served at `/images/`.

## Invariants

- Preserve the branded look; do not replace it with a stock theme.
- Every legacy destination has a route that works on direct navigation and refresh.
- Owner-gated: contact destination, career links, business claims, media rights.
- Do not push, open a PR, or deploy without separate authorization.

## Verification

- `npm run build` must exit 0 and emit `dist/index.html`.
- Routes render via `npm run dev` / `npm run preview`.
