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
      <article class="project-large">
        <div class="project-image">
          <img src="/images/project-1.jpg" alt="Healthcare construction project" />
        </div>
        <div class="project-info">
          <span>HEALTHCARE</span>
          <h2>Springfield Medical Center</h2>
          <p>A modern healthcare facility designed around efficiency, comfort, and reliable building systems.</p>
          <router-link to="/contact" class="text-link">PROJECT DETAILS →</router-link>
        </div>
      </article>

      <article class="project-large reverse">
        <div class="project-image">
          <img src="/images/project-2.jpg" alt="Commercial construction project" />
        </div>
        <div class="project-info">
          <span>COMMERCIAL</span>
          <h2>Downtown Innovation Hub</h2>
          <p>A flexible commercial environment built to support collaboration, technology, and future growth.</p>
          <router-link to="/contact" class="text-link">PROJECT DETAILS →</router-link>
        </div>
      </article>

      <article class="project-large">
        <div class="project-image">
          <img src="/images/project-3.jpg" alt="Industrial construction project" />
        </div>
        <div class="project-info">
          <span>INDUSTRIAL</span>
          <h2>Bear Mechanical Manufacturing Campus</h2>
          <p>A high-performance industrial facility designed around demanding production requirements.</p>
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
