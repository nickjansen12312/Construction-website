import { validateContactPayload } from '../src/lib/contact-submission.js'

const WINDOW_MS = 60_000
const MAX_REQUESTS = 5

export function createRateLimiter({ now = () => Date.now(), windowMs = WINDOW_MS, maxRequests = MAX_REQUESTS } = {}) {
  const entries = new Map()

  return {
    check(key) {
      const current = now()
      const recent = (entries.get(key) ?? []).filter((time) => current - time < windowMs)
      if (recent.length >= maxRequests) {
        entries.set(key, recent)
        return { allowed: false, retryAfterSeconds: Math.ceil((windowMs - (current - recent[0])) / 1000) }
      }
      recent.push(current)
      entries.set(key, recent)
      return { allowed: true }
    },
  }
}

async function requestBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') return JSON.parse(req.body)

  let raw = ''
  for await (const chunk of req) {
    raw += chunk
    if (raw.length > 12_000) throw new Error('payload_too_large')
  }
  return JSON.parse(raw || '{}')
}

function clientKey(req) {
  const forwarded = req.headers?.['x-forwarded-for']
  return String(forwarded ?? req.socket?.remoteAddress ?? 'unknown').split(',')[0].trim()
}

function respond(res, status, body, headers = {}) {
  for (const [name, value] of Object.entries(headers)) res.setHeader?.(name, value)
  if (typeof res.status === 'function' && typeof res.json === 'function') return res.status(status).json(body)
  res.statusCode = status
  res.setHeader?.('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

/**
 * @param {{ env?: Record<string, string | undefined>, rateLimiter?: ReturnType<typeof createRateLimiter> }} options
 */
export function createContactHandler({ env = {}, rateLimiter = createRateLimiter() } = {}) {
  return async function contactHandler(req, res) {
    if (req.method !== 'POST') {
      return respond(res, 405, { error: 'method_not_allowed' }, { Allow: 'POST' })
    }

    const rate = rateLimiter.check(clientKey(req))
    if (!rate.allowed) {
      return respond(res, 429, { error: 'rate_limited' }, { 'Retry-After': String(rate.retryAfterSeconds) })
    }

    try {
      const validation = validateContactPayload(await requestBody(req))
      if (!validation.valid) return respond(res, 422, { error: 'validation_error', fields: validation.fields })

      // A filled honeypot is acknowledged without retaining or delivering its content.
      if (validation.payload.website) return respond(res, 202, { status: 'accepted' })

      const mode = env.CONTACT_DELIVERY_MODE ?? (env.NODE_ENV === 'production' ? 'disabled' : 'mock')
      if (mode !== 'mock' || env.NODE_ENV === 'production') {
        return respond(res, 503, { error: 'delivery_unavailable' })
      }
      if (env.CONTACT_MOCK_OUTCOME === 'service_failure') {
        return respond(res, 502, { error: 'delivery_failed' })
      }

      // The mock deliberately stores and forwards nothing. A production adapter must be owner-approved.
      return respond(res, 202, { status: 'accepted' })
    } catch {
      return respond(res, 400, { error: 'invalid_request' })
    }
  }
}

// Deployment adapters must explicitly pass their server-only environment object.
// The safe default is disabled, including when this module is mounted without configuration.
export default createContactHandler({ env: { NODE_ENV: 'production' } })
