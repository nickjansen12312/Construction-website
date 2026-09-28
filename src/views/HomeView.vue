<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const stats = [
  { target: 90, label: 'YEARS OF EXPERIENCE' },
  { target: 250, label: 'PROJECTS COMPLETED' },
  { target: 500, label: 'TEAM MEMBERS' },
  { target: 12, label: 'MARKETS SERVED' },
]

const statValues = ref(stats.map(() => '0'))
const statsStarted = ref(false)
const statsSection = ref(null)

function animateStats() {
  if (statsStarted.value) return
  if (!statsSection.value) return
  if (statsSection.value.getBoundingClientRect().top < window.innerHeight * 0.8) {
    statsStarted.value = true
    stats.forEach((stat, i) => {
      const increment = stat.target / 60
      let current = 0
      function tick() {
        current += increment
        if (current >= stat.target) {
          statValues.value[i] = stat.target + '+'
          return
        }
        statValues.value[i] = Math.floor(current) + '+'
        requestAnimationFrame(tick)
      }
      tick()
    })
  }
}

onMounted(() => {
  window.addEventListener('scroll', animateStats, { passive: true })
  animateStats()
})
onBeforeUnmount(() => window.removeEventListener('scroll', animateStats))
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
        <router-link to="/services" class="service-card">
          <div class="service-number">01</div>
          <h3>Mechanical</h3>
          <p>HVAC and mechanical systems engineered for performance, efficiency, and reliability.</p>
          <span class="service-arrow">↗</span>
        </router-link>

        <router-link to="/services" class="service-card">
          <div class="service-number">02</div>
          <h3>Electrical</h3>
          <p>Electrical infrastructure designed to support modern buildings and demanding environments.</p>
          <span class="service-arrow">↗</span>
        </router-link>

        <router-link to="/services" class="service-card">
          <div class="service-number">03</div>
          <h3>Plumbing</h3>
          <p>Complete plumbing systems built with precision from planning through installation.</p>
          <span class="service-arrow">↗</span>
        </router-link>

        <router-link to="/services" class="service-card">
          <div class="service-number">04</div>
          <h3>Automation</h3>
          <p>Smart building controls that connect systems and improve how buildings operate.</p>
          <span class="service-arrow">↗</span>
        </router-link>
      </div>
    </section>

    <section class="stats-section" ref="statsSection">
      <div class="stat" v-for="(stat, i) in stats" :key="stat.label">
        <strong>{{ statValues[i] }}</strong>
        <span>{{ stat.label }}</span>
      </div>
    </section>

    <section class="projects-section">
      <div class="projects-heading">
        <div>
          <span>FEATURED WORK</span>
          <h2>Projects that<br />move us forward.</h2>
        </div>
        <router-link to="/projects" class="text-link">VIEW ALL PROJECTS →</router-link>
      </div>

      <div class="projects-grid">
        <router-link to="/projects" class="project-card large">
          <img src="/images/project-1.jpg" alt="Modern construction project" />
          <div class="project-overlay">
            <span>HEALTHCARE</span>
            <h3>Springfield Medical Center</h3>
          </div>
        </router-link>

        <router-link to="/projects" class="project-card">
          <img src="/images/project-2.jpg" alt="Commercial building project" />
          <div class="project-overlay">
            <span>COMMERCIAL</span>
            <h3>Downtown Innovation Hub</h3>
          </div>
        </router-link>

        <router-link to="/projects" class="project-card">
          <img src="/images/project-3.jpg" alt="Industrial construction project" />
          <div class="project-overlay">
            <span>INDUSTRIAL</span>
            <h3>Bear Mechanical Manufacturing Campus</h3>
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
