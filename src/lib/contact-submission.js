export const CONTACT_ENDPOINT = '/api/contact'

const MAX_LENGTHS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  company: 160,
  projectType: 80,
  message: 4000,
}

function text(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function validateContactPayload(values = {}) {
  const payload = {
    firstName: text(values.firstName),
    lastName: text(values.lastName),
    email: text(values.email),
    company: text(values.company),
    projectType: text(values.projectType),
    message: text(values.message),
    website: text(values.website),
  }
  const fields = {}

  for (const field of ['firstName', 'lastName', 'email', 'message']) {
    if (!payload[field]) fields[field] = 'This field is required.'
  }
  if (payload.email && !validEmail(payload.email)) fields.email = 'Enter a valid email address.'
  for (const [field, maximum] of Object.entries(MAX_LENGTHS)) {
    if (payload[field].length > maximum) fields[field] = `Use ${maximum} characters or fewer.`
  }

  return { valid: Object.keys(fields).length === 0, payload, fields }
}

export async function submitContact(values, { endpoint = CONTACT_ENDPOINT, fetchImpl = globalThis.fetch } = {}) {
  const validation = validateContactPayload(values)
  if (!validation.valid) return { status: 'validation-error', fields: validation.fields }

  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validation.payload),
    })
    const body = await response.json().catch(() => ({}))

    if (response.status === 202) return { status: 'success', fields: {} }
    if (response.status === 422) return { status: 'validation-error', fields: body.fields ?? {} }
    if (response.status === 429) return { status: 'rate-limit', fields: {} }
    if (response.status === 503) return { status: 'disabled', fields: {} }
    return { status: 'service-failure', fields: {} }
  } catch {
    return { status: 'service-failure', fields: {} }
  }
}
