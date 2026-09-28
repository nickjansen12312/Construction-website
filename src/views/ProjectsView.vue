<script setup>
import { projects } from '../content/siteContent'
</script>

<template>
  <main>
    <section class="inner-hero projects-hero">
      <div class="inner-hero-content">
        <span>OUR PROJECTS</span>
        <h1>Work that makes<br />an <em>impact.</em></h1>
        <p>Explore a selection of projects where engineering and construction come together.</p>
      </div>
    </section>

    <section class="projects-intro">
      <span>SELECTED WORK</span>
      <h2>Built for the people who use them.</h2>
    </section>

    <section class="all-projects">
      <article
        v-for="(project, index) in projects"
        :key="project.name"
        class="project-large"
        :class="{ reverse: index % 2 === 1 }"
      >
        <div class="project-image">
          <img :src="project.image" :alt="project.alt" />
        </div>
        <div class="project-info">
          <span>{{ project.category }}</span>
          <h2>{{ project.name }}</h2>
          <p>{{ project.summary }}</p>
          <router-link to="/contact" class="text-link">PROJECT DETAILS →</router-link>
        </div>
      </article>
    </section>

    <section class="cta-section">
      <div>
        <span>YOUR PROJECT</span>
        <h2>Let's build<br />what's next.</h2>
      </div>
      <router-link to="/contact" class="cta-button">CONTACT US →</router-link>
    </section>
  </main>
</template>
