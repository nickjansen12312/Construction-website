<script setup>
import { awards } from '../content/siteContent'
</script>

<template>
  <main>
    <section class="inner-hero awards-hero">
      <div class="inner-hero-content">
        <p>OUR WORK</p>
        <h1>Awards &amp; Recognition</h1>
      </div>
    </section>

    <section class="awards-intro">
      <p class="section-label">RECOGNIZED FOR THE WORK</p>
      <h2>Excellence is built one project at a time.</h2>
      <p>
        We are proud of the work our teams accomplish and the relationships we build along the way.
        Recognition is a reflection of the people, planning, and craftsmanship behind every project.
      </p>
    </section>

    <section class="awards-list">
      <article v-for="award in awards" :key="`${award.year}-${award.name}`" class="award">
        <div class="award-year">{{ award.year }}</div>
        <div class="award-content">
          <p>{{ award.category }}</p>
          <h2>{{ award.name }}</h2>
          <span>{{ award.detail }}</span>
        </div>
      </article>
    </section>

    <section class="large-statement">
      <p>GOOD WORK</p>
      <p>GETS NOTICED.</p>
    </section>

    <section class="page-cta">
      <div>
        <p class="section-label">START A PROJECT</p>
        <h2>Let's build something worth recognizing.</h2>
      </div>
      <router-link to="/contact" class="button">CONTACT US</router-link>
    </section>
  </main>
</template>
