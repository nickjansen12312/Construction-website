<script setup>
import { careerBenefits, careers } from '../content/siteContent'
</script>

<template>
  <main>
    <section class="inner-hero careers-hero">
      <div class="inner-hero-content">
        <span>CAREERS</span>
        <h1>Build your<br /><em>future here.</em></h1>
        <p>Join a team solving some of the most interesting challenges in modern construction.</p>
      </div>
    </section>

    <section class="career-intro">
      <span>WHY BEAR MECHANICAL</span>
      <h2>Do meaningful work with people who care.</h2>
      <p>Great projects don't happen by accident. They happen because talented people bring different skills and perspectives together.</p>
    </section>

    <section class="benefits-section">
      <div v-for="benefit in careerBenefits" :key="benefit.name" class="benefit">
        <span>{{ benefit.number }}</span>
        <h3>{{ benefit.name }}</h3>
        <p>{{ benefit.description }}</p>
      </div>
    </section>

    <section class="jobs-section">
      <div class="jobs-heading">
        <span>OPEN POSITIONS</span>
        <h2>Find your place<br />at Bear Mechanical.</h2>
        <span class="find-job-picture">
          <img
            src="/images/3dB.png"
            alt=""
            width="863"
            height="838"
            loading="lazy"
            decoding="async"
          />
        </span>
      </div>

      <div class="job-list">
        <div v-for="career in careers" :key="career.title" class="job">
          <div>
            <span>{{ career.group }}</span>
            <h3>{{ career.title }}</h3>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div>
        <span>DON'T SEE THE RIGHT POSITION?</span>
        <h2>Tell us<br />what you do.</h2>
      </div>
      <router-link to="/contact" class="cta-button">GET IN TOUCH →</router-link>
    </section>
  </main>
</template>
