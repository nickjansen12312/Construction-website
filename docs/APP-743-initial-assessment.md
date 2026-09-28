# Bear Mechanical website — initial assessment

Baseline reviewed at commit `36506e4` (upstream nickjansen12312/Construction-website).

## What the site is

A ten-page static marketing site for Bear Mechanical, a construction-and-building-systems company. Pages: home, about, team, culture, awards, safety, services, projects, careers, contact. No build system: ten standalone HTML documents, one hand-written stylesheet (`css/style.css`, ~2,437 lines), one script (`js/script.js`, ~119 lines).

## Confirmed defects (as found)

1. Contact form does not send inquiries and, because it has no `method`/`action`, submits via GET and exposes entered fields in the URL.
2. The four service submenu links point to `services.html#mechanical|electrical|plumbing|automation`, but those anchor targets do not exist on the page.
3. Career rows look clickable (arrow affordance) but have no destination.

## Verified working

- All ten pages return HTTP 200 in Chromium; the mobile menu opens/closes; assets load without 4xx/5xx; no page-level JavaScript errors.

## Notes

Git history shows the site arrived as a complete static prototype and then received visual fixes and broad renames (Missouri State/Summit Systems → Cornfield Cogen → Bear Mechanical). It is treated as an early prototype; business name, people, project claims, awards, jobs, contact data, media rights, and production requirements are not validated and remain owner-gated.
