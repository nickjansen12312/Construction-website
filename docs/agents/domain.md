# Domain

## Product

Bear Mechanical is a construction-and-building-systems company. The site markets mechanical, electrical, plumbing, and building-automation services plus the company story, team, culture, awards, safety, projects, and careers.

Ten public destinations: home, about, team, culture, awards, safety, services, projects, careers, contact.

## Technical shape (after migration)

- Vue 3 + Vite + Vue Router (history mode) + Tailwind CSS.
- Shared shell: header, navigation with dropdowns, mobile menu, footer.
- Existing branded design (`css/style.css` values: text `#5f0008`, background `#F5F1E8`, accent `#65694f`) is preserved as the visual source of truth.

## Invariants

- One production build serves a routed SPA; every legacy destination has a route and works on direct navigation and refresh.
- Owner-gated facts (contact destination, career links, business claims, media rights) are never chosen by an agent.
- No push, pull request, or deploy without separate owner authorization.
