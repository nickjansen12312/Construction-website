<script setup>
import StatsGrid from '../components/StatsGrid.vue'
import { stats } from '../content/siteContent'
</script>

<template>
  <main>
    <section class="inner-hero">
      <div class="inner-hero-content">
        <span>ABOUT BEAR MECHANICAL</span>
        <h1>Building more than <em>structures.</em></h1>
        <p>We bring people, technology, and construction together to create systems built for the future.</p>
      </div>
    </section>

    <section class="about-story">
      <div class="about-label">OUR STORY</div>

      <div class="about-story-content">
        <h2>Engineering what comes next.</h2>
        <p>Bear Mechanical was created around a simple idea: complicated projects deserve simple, thoughtful solutions.</p>
        <p>Our teams work across mechanical, electrical, plumbing, and building automation systems to help turn ambitious ideas into functioning spaces.</p>
        <p>From the earliest stages of planning through construction and long-term service, we work alongside our clients to solve problems and deliver dependable results.</p>
      </div>
    </section>

    <section class="values-section">
      <div class="section-heading">
        <span>WHAT DRIVES US</span>
        <h2>The way we<br />approach work.</h2>
      </div>

      <div class="values-grid">
        <div class="value-card">
          <span>01</span>
          <h3>People First</h3>
          <p>Strong projects begin with strong relationships. We believe in communication, respect, and teamwork.</p>
        </div>
        <div class="value-card">
          <span>02</span>
          <h3>Think Ahead</h3>
          <p>We look beyond today's problems to find solutions that continue working tomorrow.</p>
        </div>
        <div class="value-card">
          <span>03</span>
          <h3>Own the Work</h3>
          <p>We take responsibility for the details, the challenges, and the finished result.</p>
        </div>
        <div class="value-card">
          <span>04</span>
          <h3>Keep Improving</h3>
          <p>Better technology and better processes help us build smarter and more efficiently.</p>
        </div>
      </div>
    </section>

    <StatsGrid :stats="stats" variant="about" />

    <section class="cta-section">
      <div>
        <span>WORK WITH US</span>
        <h2>Let's build<br />something better.</h2>
      </div>
      <router-link to="/contact" class="cta-button">CONTACT US →</router-link>
    </section>
  </main>
</template>
