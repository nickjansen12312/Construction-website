<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const mobileOpen = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 50
}

function closeMenu() {
  mobileOpen.value = false
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
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

    <nav class="main-nav">
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
          <router-link :to="{ path: '/services', hash: '#mechanical' }">Mechanical</router-link>
          <router-link :to="{ path: '/services', hash: '#electrical' }">Electrical</router-link>
          <router-link :to="{ path: '/services', hash: '#plumbing' }">Plumbing</router-link>
          <router-link :to="{ path: '/services', hash: '#automation' }">Automation</router-link>
        </div>
      </div>

      <router-link to="/projects">PROJECTS</router-link>
      <router-link to="/careers">WORK WITH US</router-link>
      <router-link to="/contact">CONTACT</router-link>
    </nav>

    <button class="menu-button" id="menuButton" aria-label="Toggle menu" @click="mobileOpen = !mobileOpen">
      ☰
    </button>
  </header>

  <div class="mobile-menu" id="mobileMenu" :class="{ open: mobileOpen }">
    <router-link to="/about" @click="closeMenu">ABOUT</router-link>
    <router-link to="/services" @click="closeMenu">SERVICES</router-link>
    <router-link to="/projects" @click="closeMenu">PROJECTS</router-link>
    <router-link to="/careers" @click="closeMenu">CAREERS</router-link>
    <router-link to="/contact" @click="closeMenu">CONTACT</router-link>
  </div>
</template>
