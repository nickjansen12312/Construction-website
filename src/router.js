import { createRouter, createWebHistory } from 'vue-router'

export const SERVICE_ANCHORS = ['mechanical', 'electrical', 'plumbing', 'automation']

const DESKTOP_HEADER_HEIGHT = 100
const MOBILE_HEADER_HEIGHT = 80
const HEADER_SCROLL_GAP = 16
const MOBILE_BREAKPOINT = 900

/** @type {import('vue-router').RouteRecordRaw[]} */
export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/HomeView.vue'),
    meta: {
      title: 'Bear Mechanical | Building What Comes Next',
      description: 'Engineering and construction solutions designed for the future.',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/AboutView.vue'),
    meta: { title: 'About | Bear Mechanical', description: 'Learn how Bear Mechanical approaches people, technology, and construction.' },
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('./views/TeamView.vue'),
    meta: { title: 'Meet the Team | Bear Mechanical', description: 'Meet the people behind Bear Mechanical projects.' },
  },
  {
    path: '/culture',
    name: 'culture',
    component: () => import('./views/CultureView.vue'),
    meta: { title: 'Culture & Values | Bear Mechanical', description: 'Explore the values that guide how Bear Mechanical works.' },
  },
  {
    path: '/awards',
    name: 'awards',
    component: () => import('./views/AwardsView.vue'),
    meta: { title: 'Awards | Bear Mechanical', description: 'Recognition presented for Bear Mechanical teams and projects.' },
  },
  {
    path: '/safety',
    name: 'safety',
    component: () => import('./views/SafetyView.vue'),
    meta: { title: 'Safety | Bear Mechanical', description: 'How Bear Mechanical plans, trains, and works with safety in mind.' },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('./views/ServicesView.vue'),
    meta: { title: 'Services | Bear Mechanical', description: 'Mechanical, electrical, plumbing, and building-automation services.' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('./views/ProjectsView.vue'),
    meta: { title: 'Projects | Bear Mechanical', description: 'Explore selected Bear Mechanical construction projects.' },
  },
  {
    path: '/careers',
    name: 'careers',
    component: () => import('./views/CareersView.vue'),
    meta: { title: 'Careers | Bear Mechanical', description: 'Explore careers and opportunities at Bear Mechanical.' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('./views/ContactView.vue'),
    meta: { title: 'Contact | Bear Mechanical', description: 'Start a conversation with Bear Mechanical about a project or question.' },
  },
  // Legacy .html compatibility redirects (preserve old links)
  { path: '/index.html', redirect: '/' },
  { path: '/about.html', redirect: '/about' },
  { path: '/team.html', redirect: '/team' },
  { path: '/culture.html', redirect: '/culture' },
  { path: '/awards.html', redirect: '/awards' },
  { path: '/safety.html', redirect: '/safety' },
  {
    path: '/services.html',
    redirect: (to) => ({ path: '/services', hash: to.hash, query: to.query }),
  },
  { path: '/projects.html', redirect: '/projects' },
  { path: '/careers.html', redirect: '/careers' },
  { path: '/contact.html', redirect: '/contact' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

function setNamedMeta(name, content) {
  let element = document.head.querySelector(`meta[name="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('name', name)
    document.head.append(element)
  }
  element.setAttribute('content', content)
}

export function createSiteRouter(history = createWebHistory()) {
  const router = createRouter({
    history,
    routes,
    scrollBehavior: siteScrollBehavior,
  })

  router.afterEach((to) => {
    if (typeof to.meta.title === 'string') document.title = to.meta.title
    if (typeof to.meta.description === 'string') setNamedMeta('description', to.meta.description)
  })

  return router
}

export function getHeaderScrollOffset() {
  const headerHeight =
    typeof window !== 'undefined' && window.matchMedia?.(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
      ? MOBILE_HEADER_HEIGHT
      : DESKTOP_HEADER_HEIGHT

  return headerHeight + HEADER_SCROLL_GAP
}

export function siteScrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition
  if (to.hash) {
    return {
      el: to.hash,
      top: getHeaderScrollOffset(),
      behavior: 'smooth',
    }
  }
  return { top: 0 }
}

const router = createSiteRouter()

export default router
