// @vitest-environment jsdom

import { describe, expect, it } from 'vitest'
import router from './router'

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

    expect(record?.redirect).toBe(target)
  })

  it('retains the four service anchors', () => {
    for (const hash of ['#mechanical', '#electrical', '#plumbing', '#automation']) {
      expect(router.resolve(`/services${hash}`).hash).toBe(hash)
    }
  })
})
