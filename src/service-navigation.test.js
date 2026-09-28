// @vitest-environment jsdom

import { createApp, nextTick } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App.vue'
import { createSiteRouter, SERVICE_ANCHORS } from './router'

window.scrollTo = () => {}

const originRoutes = ['/', '/about', '/projects', '/contact']

let app
let host

async function settleView() {
  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 0))
  await nextTick()
}

async function mountAt(path) {
  host = document.createElement('div')
  document.body.append(host)

  const router = createSiteRouter(createMemoryHistory())
  await router.push(path)

  app = createApp(App)
  app.use(router)
  app.mount(host)
  await router.isReady()
  await settleView()

  return router
}

function waitForRoute(router, fullPath) {
  return new Promise((resolve) => {
    const removeGuard = router.afterEach((to) => {
      if (to.fullPath !== fullPath) return
      removeGuard()
      resolve()
    })
  })
}

function expectFocusedService(serviceId) {
  const target = host.querySelector(`#${serviceId}`)

  expect(target).not.toBeNull()
  expect(target.tagName).toBe('ARTICLE')
  expect(target.getAttribute('tabindex')).toBe('-1')
  expect(target.getAttribute('aria-labelledby')).toBe(`${serviceId}-heading`)
  expect(document.activeElement).toBe(target)
}

afterEach(() => {
  app?.unmount()
  host?.remove()
  app = undefined
  host = undefined
})

describe('service-section navigation', () => {
  it.each(SERVICE_ANCHORS)('loads a direct refresh at #%s and focuses its unique target', async (serviceId) => {
    await mountAt(`/services#${serviceId}`)

    const targetIds = SERVICE_ANCHORS.map((id) => host.querySelectorAll(`#${id}`).length)
    expect(targetIds).toEqual([1, 1, 1, 1])
    expectFocusedService(serviceId)
  })

  it.each(SERVICE_ANCHORS.map((serviceId, index) => [serviceId, originRoutes[index]]))(
    'activates #%s with a pointer from %s',
    async (serviceId, originRoute) => {
      const router = await mountAt(originRoute)
      const link = host.querySelector(`[data-service-link="${serviceId}"]`)
      const navigation = waitForRoute(router, `/services#${serviceId}`)

      expect(link.tagName).toBe('A')
      expect(link.getAttribute('href')).toBe(`/services#${serviceId}`)
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }))
      await navigation
      await settleView()

      expectFocusedService(serviceId)
    },
  )

  it.each(SERVICE_ANCHORS.map((serviceId, index) => [serviceId, originRoutes[index]]))(
    'activates #%s from a focused native link on %s',
    async (serviceId, originRoute) => {
      const router = await mountAt(originRoute)
      const link = host.querySelector(`[data-service-link="${serviceId}"]`)
      const navigation = waitForRoute(router, `/services#${serviceId}`)

      link.focus()
      expect(document.activeElement).toBe(link)
      link.click()
      await navigation
      await settleView()

      expectFocusedService(serviceId)
    },
  )

  it.each(SERVICE_ANCHORS)('restores #%s through back and forward navigation', async (serviceId) => {
    const router = await mountAt('/about')

    await router.push(`/services#${serviceId}`)
    await settleView()
    expectFocusedService(serviceId)

    const backNavigation = waitForRoute(router, '/about')
    router.back()
    await backNavigation
    expect(router.currentRoute.value.fullPath).toBe('/about')

    const forwardNavigation = waitForRoute(router, `/services#${serviceId}`)
    router.forward()
    await forwardNavigation
    await settleView()

    expectFocusedService(serviceId)
  })

  it.each(SERVICE_ANCHORS)('exposes #%s in the mobile menu', async (serviceId) => {
    await mountAt('/')

    const link = host.querySelector(`[data-mobile-service-link="${serviceId}"]`)
    expect(link.tagName).toBe('A')
    expect(link.getAttribute('href')).toBe(`/services#${serviceId}`)
  })
})
