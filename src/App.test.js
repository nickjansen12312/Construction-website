// @vitest-environment jsdom

import { createApp, nextTick } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App.vue'
import { createSiteRouter } from './router'

window.scrollTo = () => {}

let app
let host

async function mountAt(path) {
  host = document.createElement('div')
  document.body.append(host)

  const router = createSiteRouter(createMemoryHistory())
  await router.push(path)
  await router.isReady()

  app = createApp(App)
  app.use(router)
  app.mount(host)
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 0))

  return router
}

afterEach(() => {
  app?.unmount()
  host?.remove()
  app = undefined
  host = undefined
})

describe('shared application layout', () => {
  it('renders one shared header and footer around route content', async () => {
    await mountAt('/about')

    expect(host.querySelectorAll('.site-header')).toHaveLength(1)
    expect(host.querySelectorAll('main')).toHaveLength(1)
    expect(host.querySelectorAll('footer')).toHaveLength(1)
    expect(host.querySelector('h1')?.textContent).toContain('Building more than')
  })

  it('exposes and closes the mobile menu accessibly', async () => {
    const router = await mountAt('/about')
    const button = host.querySelector('#menuButton')
    const menu = host.querySelector('#mobileMenu')

    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(menu.hidden).toBe(true)

    button.click()
    await nextTick()
    expect(button.getAttribute('aria-expanded')).toBe('true')
    expect(menu.hidden).toBe(false)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(button)

    button.click()
    await router.push('/services')
    await nextTick()
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })

  it('renders career rows as non-interactive informational content', async () => {
    await mountAt('/careers')

    const rows = [...host.querySelectorAll('.job')]

    expect(rows).toHaveLength(4)
    expect(host.querySelectorAll('.job a, .job button, .job [tabindex]')).toHaveLength(0)
    expect(host.querySelectorAll('.job-arrow')).toHaveLength(0)
    expect(rows.every((row) => row.getAttribute('role') === null)).toBe(true)
  })
})
