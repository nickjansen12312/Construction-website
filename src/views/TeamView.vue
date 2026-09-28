<script setup>
import { teamMembers } from '../content/siteContent'
</script>

<template>
  <main>
    <section class="inner-hero team-hero">
      <div class="inner-hero-content">
        <p>OUR PEOPLE</p>
        <h1>Meet The Team</h1>
      </div>
    </section>

    <section class="team-intro">
      <div>
        <p class="section-label">THE PEOPLE BEHIND THE WORK</p>
        <h2>Great work starts with great people.</h2>
      </div>

      <div>
        <p>
          At Bear Mechanical, our people are at the center of everything we do. From the field to
          the office, our team brings experience, knowledge, and a commitment to doing the job right.
        </p>
        <p>
          We believe the strongest projects come from people who work together, communicate clearly,
          and take pride in what they build.
        </p>
      </div>
    </section>

    <section class="team-grid-section">
      <div class="team-grid">
        <article v-for="member in teamMembers" :key="member.name" class="team-member">
          <div class="team-photo" aria-hidden="true"></div>
          <div class="team-info">
            <p>{{ member.group }}</p>
            <h3>{{ member.name }}</h3>
            <span>{{ member.role }}</span>
          </div>
        </article>
      </div>
    </section>

    <section class="large-statement">
      <p>ONE TEAM.</p>
      <p>ONE STANDARD.</p>
      <p>BUILT TOGETHER.</p>
    </section>

    <section class="page-cta">
      <div>
        <p class="section-label">WORK WITH US</p>
        <h2>Want to be part of the team?</h2>
      </div>
      <router-link to="/careers" class="button">VIEW CAREERS</router-link>
    </section>
  </main>
</template>
