import { createRouter, createWebHistory } from 'vue-router'

/** @type {import('vue-router').RouteRecordRaw[]} */
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/HomeView.vue'),
    meta: { title: 'Bear Mechanical | Building What Comes Next' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('./views/AboutView.vue'),
    meta: { title: 'About | Bear Mechanical' },
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('./views/TeamView.vue'),
    meta: { title: 'Meet the Team | Bear Mechanical' },
  },
  {
    path: '/culture',
    name: 'culture',
    component: () => import('./views/CultureView.vue'),
    meta: { title: 'Culture & Values | Bear Mechanical' },
  },
  {
    path: '/awards',
    name: 'awards',
    component: () => import('./views/AwardsView.vue'),
    meta: { title: 'Awards | Bear Mechanical' },
  },
  {
    path: '/safety',
    name: 'safety',
    component: () => import('./views/SafetyView.vue'),
    meta: { title: 'Safety | Bear Mechanical' },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('./views/ServicesView.vue'),
    meta: { title: 'Services | Bear Mechanical' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('./views/ProjectsView.vue'),
    meta: { title: 'Projects | Bear Mechanical' },
  },
  {
    path: '/careers',
    name: 'careers',
    component: () => import('./views/CareersView.vue'),
    meta: { title: 'Careers | Bear Mechanical' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('./views/ContactView.vue'),
    meta: { title: 'Contact | Bear Mechanical' },
  },
  // Legacy .html compatibility redirects (preserve old links)
  { path: '/index.html', redirect: '/' },
  { path: '/about.html', redirect: '/about' },
  { path: '/team.html', redirect: '/team' },
  { path: '/culture.html', redirect: '/culture' },
  { path: '/awards.html', redirect: '/awards' },
  { path: '/safety.html', redirect: '/safety' },
  { path: '/services.html', redirect: '/services' },
  { path: '/projects.html', redirect: '/projects' },
  { path: '/careers.html', redirect: '/careers' },
  { path: '/contact.html', redirect: '/contact' },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (typeof to.meta.title === 'string') document.title = to.meta.title
})

export default router
