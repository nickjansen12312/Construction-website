<script setup>
import StatsGrid from '../components/StatsGrid.vue'
import { projects, services, stats } from '../content/siteContent'
</script>

<template>
  <main>
    <section class="hero">
      <div class="hero-background"></div>

      <div class="hero-content">
        <h1>Building For<br />What Lies Ahead</h1>
        <p>Engineering and construction solutions designed for the future.</p>
        <router-link to="/projects" class="hero-button">EXPLORE OUR WORK</router-link>
      </div>

      <div class="scroll-indicator">
        <span></span>
        SCROLL
      </div>
    </section>

    <section class="intro section">
      <div class="intro-small">Bear Mechanical</div>

      <div class="intro-content">
        <h2>We build the systems <em>behind</em> extraordinary spaces.</h2>
        <p>
          Bear Mechanical brings engineering, construction, technology, and craftsmanship together
          to create reliable solutions for complex projects.
        </p>
        <router-link to="/about" class="text-link">DISCOVER BEAR MECHANICAL <span>→</span></router-link>
      </div>
    </section>

    <section class="services-section">
      <div class="section-heading">
        <span>WHAT WE DO</span>
        <h2>Built around<br />your project.</h2>
      </div>

      <div class="services-grid">
        <router-link
          v-for="service in services"
          :key="service.id"
          to="/services"
          class="service-card"
        >
          <div class="service-number">{{ service.number }}</div>
          <h3>{{ service.name }}</h3>
          <p>{{ service.summary }}</p>
          <span class="service-arrow">↗</span>
        </router-link>
      </div>
    </section>

    <StatsGrid :stats="stats" animated />

    <section class="projects-section">
      <div class="projects-heading">
        <div>
          <span>FEATURED WORK</span>
          <h2>Projects that<br />move us forward.</h2>
        </div>
        <router-link to="/projects" class="text-link">VIEW ALL PROJECTS →</router-link>
      </div>

      <div class="projects-grid">
        <router-link
          v-for="(project, index) in projects"
          :key="project.name"
          to="/projects"
          class="project-card"
          :class="{ large: index === 0 }"
        >
          <div class="project-visual" aria-hidden="true"></div>
          <div class="project-overlay">
            <span>{{ project.category }}</span>
            <h3>{{ project.name }}</h3>
          </div>
        </router-link>
      </div>
    </section>

    <section class="cta-section">
      <div>
        <span>CONTACT US</span>
        <h2>Have a project<br />in mind?</h2>
      </div>
      <router-link to="/contact" class="cta-button">LET'S TALK →</router-link>
    </section>
  </main>
</template>
