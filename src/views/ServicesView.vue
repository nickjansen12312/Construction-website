<script setup>
import { nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { services } from '../content/siteContent'
import { SERVICE_ANCHORS } from '../router'

const route = useRoute()

watch(
  () => route.hash,
  async (hash) => {
    const serviceId = hash.slice(1)
    if (!SERVICE_ANCHORS.includes(serviceId)) return

    await nextTick()
    document.getElementById(serviceId)?.focus({ preventScroll: true })
  },
  { immediate: true, flush: 'post' },
)
</script>

<template>
  <main>
    <section class="inner-hero services-hero">
      <div class="inner-hero-content">
        <span>OUR SERVICES</span>
        <h1>One team.<br /><em>Every system.</em></h1>
        <p>From engineering and installation to controls and service, we bring the pieces together.</p>
      </div>
    </section>

    <section class="services-intro">
      <span>WHAT WE DO</span>
      <h2>The systems inside every great space.</h2>
      <p>
        Modern buildings depend on thousands of connected components working together. Our job is to
        make those systems work as one.
      </p>
    </section>

    <section class="service-list">
      <article
        v-for="service in services"
        :id="service.id"
        :key="service.id"
        class="service-detail"
        tabindex="-1"
        :aria-labelledby="`${service.id}-heading`"
      >
        <div class="service-detail-number">{{ service.number }}</div>
        <div>
          <h2 :id="`${service.id}-heading`">{{ service.name }}</h2>
          <p>{{ service.detail }}</p>
          <ul>
            <li v-for="capability in service.capabilities" :key="capability">{{ capability }}</li>
          </ul>
        </div>
      </article>
    </section>

    <section class="cta-section">
      <div>
        <span>HAVE A PROJECT?</span>
        <h2>Let's solve it<br />together.</h2>
      </div>
      <router-link to="/contact" class="cta-button">START A CONVERSATION →</router-link>
    </section>
  </main>
</template>
