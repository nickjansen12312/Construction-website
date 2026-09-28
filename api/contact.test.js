import { describe, expect, it } from 'vitest'
import { createContactHandler, createRateLimiter } from './contact'

const payload = { firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.test', message: 'Hello' }

async function request(handler, { method = 'POST', body = payload, address = '203.0.113.4' } = {}) {
  const response = { headers: {}, setHeader(name, value) { this.headers[name] = value }, end(value) { this.body = JSON.parse(value) } }
  await handler({ method, body, headers: {}, socket: { remoteAddress: address } }, response)
  return response
}

describe('owned contact endpoint', () => {
  it('uses the local mock only in development and never persists the request', async () => {
    const response = await request(createContactHandler({ env: { NODE_ENV: 'development' } }))
    expect(response.statusCode).toBe(202)
    expect(response.body).toEqual({ status: 'accepted' })
  })

  it('is explicitly unavailable without configured production delivery', async () => {
    const response = await request(createContactHandler({ env: { NODE_ENV: 'production' } }))
    expect(response.statusCode).toBe(503)
    expect(response.body.error).toBe('delivery_unavailable')
  })

  it('returns validation and rate-limit responses without reflecting contact values', async () => {
    let time = 0
    const handler = createContactHandler({
      env: { NODE_ENV: 'development' },
      rateLimiter: createRateLimiter({ now: () => time, maxRequests: 1 }),
    })
    const invalid = await request(handler, { body: { ...payload, email: 'not-an-email' } })
    expect(invalid.statusCode).toBe(422)
    expect(JSON.stringify(invalid.body)).not.toContain('not-an-email')

    time += 1
    const limited = await request(handler)
    expect(limited.statusCode).toBe(429)
  })
})
