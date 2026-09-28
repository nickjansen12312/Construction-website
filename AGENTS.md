# Contributor guidance

This repository is the Bear Mechanical construction website. Work is tracked in Paperclip under the Construction Website project, rooted at `APP-743`.

## Read first

- `docs/APP-743-initial-assessment.md`
- `docs/agents/domain.md`
- `docs/agents/issue-tracker.md`
- `.hermes/skills/project-context/SKILL.md`

## Agent skills

- Load `.hermes/skills/project-context/SKILL.md` for repository-specific commands and invariants.
- Use the shared Hermes development skills on demand; issue tracking and domain context are recorded in `docs/agents/`.

## Working rules

- Work on the contributor branch; preserve unrelated changes and the original assessment.
- Use npm and the Vue 3, Vite, Vue Router, and Tailwind stack recorded in the project context.
- Preserve the existing Bear Mechanical visual language. Extract and reuse deliberate design values from the current stylesheet instead of introducing a stock theme.
- Keep every legacy public destination reachable, including direct navigation and refresh.
- Do not invent or publish contact destinations, career links, business claims, team identities, awards, project facts, or media rights. Those decisions remain owner-gated on their assigned Paperclip issues.
- Do not put contact-form values in URLs, browser history, analytics, or client logs.
- Add focused automated coverage for changed behavior and run the smallest relevant checks first. Before declaring the modernization complete, run the production build, unit/static checks, and browser smoke suite.
- Do not push, open a pull request, or deploy unless the owner separately authorizes it.

## Expected commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run typecheck`
- `npm test`

As the migration adds lint, typecheck, unit, and browser commands, keep this file and the contributor README synchronized with the actual package scripts.
