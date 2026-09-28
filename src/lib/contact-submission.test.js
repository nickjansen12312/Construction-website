import { describe, expect, it, vi } from 'vitest'
import { CONTACT_ENDPOINT, submitContact, validateContactPayload } from './contact-submission'
import { createContactHandler } from '../../api/contact'

const validContact = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.test',
  company: 'Analytical Engines',
  projectType: 'Mechanical',
  message: 'Please contact me about a project.',
}

describe('contact submission client', () => {
  it('uses the local same-origin mock POST and never serializes visitor values into the URL', async () => {
    const handler = createContactHandler({ env: { NODE_ENV: 'development', CONTACT_DELIVERY_MODE: 'mock' } })
    const fetchImpl = vi.fn(async (url, options) => {
      const response = { setHeader() {}, end(value) { this.body = value } }
      await handler({ method: options.method, body: options.body, headers: {}, socket: {} }, response)
      return new Response(response.body, { status: response.statusCode })
    })
    const result = await submitContact(validContact, { fetchImpl })

    expect(result.status).toBe('success')
    expect(fetchImpl).toHaveBeenCalledWith(CONTACT_ENDPOINT, expect.objectContaining({ method: 'POST' }))
    const [url, options] = fetchImpl.mock.calls[0]
    expect(url).toBe('/api/contact')
    expect(url).not.toContain(validContact.email)
    expect(options.body).toContain(validContact.email)
  })

  it('returns explicit validation, rate-limit, disabled, and service-failure states', async () => {
    expect(validateContactPayload({}).valid).toBe(false)
    expect((await submitContact({}, { fetchImpl: vi.fn() })).status).toBe('validation-error')

    const outcomes = [
      { status: 429, expected: 'rate-limit' },
      { status: 503, expected: 'disabled' },
      { status: 502, expected: 'service-failure' },
    ]
    for (const { status, expected } of outcomes) {
      const fetchImpl = vi.fn().mockResolvedValue(new Response('{}', { status }))
      expect((await submitContact(validContact, { fetchImpl })).status).toBe(expected)
    }
  })
})
