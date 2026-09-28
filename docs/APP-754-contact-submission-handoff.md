# APP-754 contact submission handoff

## What is implemented

- The Vue contact form validates in the client and sends a JSON `POST` only to the same-origin `/api/contact` contract.
- It exposes accessible pending, success, validation-error, rate-limit, disabled, and service-failure states.
- `api/contact.js` validates again at the boundary, rejects non-`POST` requests, uses a honeypot, and limits each client to five requests per minute in development.
- The Vite development server mounts a repository-local mock. It acknowledges valid submissions without storing, forwarding, logging, or contacting anyone.

## Production deployment requirement

This Vite build is static. Before production traffic is enabled, the hosting runtime must mount `api/contact.js` (or an equivalent owner-approved handler) at the same-origin `/api/contact` path, separately from the SPA rewrite to `index.html`.

The safe default is disabled: an unconfigured production handler responds `503` with `delivery_unavailable`, which the browser presents as an explicit disabled state. A missing route produces an explicit service-failure state. Do not route this path to an SPA fallback.

## Configuration and privacy gate

Only server-side, named configuration is permitted:

- `CONTACT_DELIVERY_MODE=mock` is development/test-only.
- `CONTACT_MOCK_OUTCOME=service_failure` is development/test-only.

No provider, recipient, key, or delivery transport is configured. Before replacing the mock, the owner must separately approve the delivery adapter, recipient, provider-specific server-only variable names, retention/deletion schedule, durable rate limit, and abuse-monitoring policy. Do not add those values to source control, a `VITE_*` variable, client analytics, or logs.

The current mock retains no submissions. Its in-memory rate limit and honeypot are development safeguards only; production needs durable controls at the owned API boundary.

## Verification

- `npm test` — 66 passing tests, including the client-to-local-mock flow and explicit failure states.
- `npm run lint`
- `npm run typecheck`
- `npm run build`
