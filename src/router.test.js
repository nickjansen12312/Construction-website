// @vitest-environment jsdom

import { createMemoryHistory } from 'vue-router'
import { afterEach, describe, expect, it, vi } from 'vitest'
import router, {
  createSiteRouter,
  getHeaderScrollOffset,
  SERVICE_ANCHORS,
  siteScrollBehavior,
} from './router'

window.scrollTo = () => {}

afterEach(() => {
  vi.unstubAllGlobals()
})

const publicRoutes = [
  '/',
  '/about',
  '/team',
  '/culture',
  '/awards',
  '/safety',
  '/services',
  '/projects',
  '/careers',
  '/contact',
]

describe('public routes', () => {
  it.each(publicRoutes)('resolves %s without falling through', (path) => {
    const resolved = router.resolve(path)

    expect(resolved.matched.at(-1)?.path).toBe(path)
  })

  it.each(publicRoutes)('keeps the legacy %s.html destination reachable', (path) => {
    const legacyPath = path === '/' ? '/index.html' : `${path}.html`
    const target = path === '/' ? '/' : path
    const record = router.getRoutes().find((route) => route.path === legacyPath)

    if (path === '/services') {
      expect(record?.redirect).toEqual(expect.any(Function))
    } else {
      expect(record?.redirect).toBe(target)
    }
  })

  it('retains the four service anchors', () => {
    for (const hash of SERVICE_ANCHORS.map((id) => `#${id}`)) {
      expect(router.resolve(`/services${hash}`).hash).toBe(hash)
    }
  })

  it.each(SERVICE_ANCHORS)('preserves #%s through the legacy services redirect', async (serviceId) => {
    const memoryRouter = createSiteRouter(createMemoryHistory())

    await memoryRouter.push(`/services.html?source=legacy#${serviceId}`)

    expect(memoryRouter.currentRoute.value.path).toBe('/services')
    expect(memoryRouter.currentRoute.value.hash).toBe(`#${serviceId}`)
    expect(memoryRouter.currentRoute.value.query.source).toBe('legacy')
  })

  it('applies an intentional fixed-header offset to fragment scrolling', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })))

    expect(getHeaderScrollOffset()).toBe(116)
    expect(siteScrollBehavior({ hash: '#mechanical' }, {}, null)).toEqual({
      el: '#mechanical',
      top: 116,
      behavior: 'smooth',
    })
  })

  it('uses the smaller fixed-header offset at the mobile breakpoint', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))

    expect(getHeaderScrollOffset()).toBe(96)
  })

  it('restores browser history positions before applying fragment scrolling', () => {
    const savedPosition = { left: 0, top: 480 }

    expect(siteScrollBehavior({ hash: '#mechanical' }, {}, savedPosition)).toBe(savedPosition)
  })

  it.each(publicRoutes)('provides route-aware title and description metadata for %s', (path) => {
    const meta = router.resolve(path).meta

    expect(meta.title).toEqual(expect.any(String))
    expect(meta.description).toEqual(expect.any(String))
  })

  it('updates essential document metadata after navigation', async () => {
    const memoryRouter = createSiteRouter(createMemoryHistory())

    await memoryRouter.push('/services')
    await memoryRouter.isReady()

    expect(document.title).toBe('Services | Bear Mechanical')
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain('Mechanical')
  })
})
