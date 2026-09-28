<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { SERVICE_ANCHORS } from '../router'

const mobileOpen = ref(false)
const scrolled = ref(false)
const menuButton = ref(null)
const route = useRoute()
const serviceLinks = SERVICE_ANCHORS.map((id) => ({
  id,
  label: id.charAt(0).toUpperCase() + id.slice(1),
}))

function onScroll() {
  scrolled.value = window.scrollY > 50
}

function closeMenu() {
  mobileOpen.value = false
}

function toggleMenu() {
  mobileOpen.value = !mobileOpen.value
}

function onKeydown(event) {
  if (event.key !== 'Escape' || !mobileOpen.value) return
  closeMenu()
  nextTick(() => menuButton.value?.focus())
}

watch(() => route.fullPath, closeMenu)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="site-header" :style="{ boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none' }">
    <div class="logo-area">
      <router-link to="/" class="logo">
        <span class="logo-symbol">
          <img src="/images/logo.png" alt="Bear Mechanical Logo" />
        </span>
        <span>Bear Mechanical</span>
      </router-link>
    </div>

    <nav class="main-nav" aria-label="Primary navigation">
      <div class="nav-dropdown">
        <router-link to="/about">ABOUT</router-link>
        <div class="dropdown-menu">
          <router-link to="/about">Our Story</router-link>
          <router-link to="/team">Meet the Team</router-link>
          <router-link to="/culture">Culture &amp; Values</router-link>
          <router-link to="/awards">Awards</router-link>
        </div>
      </div>

      <router-link to="/safety">SAFETY</router-link>

      <div class="nav-dropdown">
        <router-link to="/services">SERVICES</router-link>
        <div class="dropdown-menu">
          <router-link to="/services">All Services</router-link>
          <router-link
            v-for="service in serviceLinks"
            :key="service.id"
            :to="{ path: '/services', hash: `#${service.id}` }"
            :data-service-link="service.id"
          >
            {{ service.label }}
          </router-link>
        </div>
      </div>

      <router-link to="/projects">PROJECTS</router-link>
      <router-link to="/careers">WORK WITH US</router-link>
      <router-link to="/contact">CONTACT</router-link>
    </nav>

    <button
      id="menuButton"
      ref="menuButton"
      type="button"
      class="menu-button"
      aria-controls="mobileMenu"
      :aria-expanded="mobileOpen"
      :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
      @click="toggleMenu"
    >
      ☰
    </button>
  </header>

  <nav
    id="mobileMenu"
    class="mobile-menu"
    :class="{ open: mobileOpen }"
    :hidden="!mobileOpen"
    aria-label="Mobile navigation"
  >
    <router-link to="/about" @click="closeMenu">ABOUT</router-link>
    <router-link to="/services" @click="closeMenu">SERVICES</router-link>
    <div class="mobile-service-links" aria-label="Service sections">
      <router-link
        v-for="service in serviceLinks"
        :key="service.id"
        :to="{ path: '/services', hash: `#${service.id}` }"
        :data-mobile-service-link="service.id"
        @click="closeMenu"
      >
        {{ service.label }}
      </router-link>
    </div>
    <router-link to="/projects" @click="closeMenu">PROJECTS</router-link>
    <router-link to="/careers" @click="closeMenu">CAREERS</router-link>
    <router-link to="/contact" @click="closeMenu">CONTACT</router-link>
  </nav>
</template>
