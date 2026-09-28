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
      <div class="benefit">
        <span>01</span>
        <h3>Grow Your Skills</h3>
        <p>Work alongside experienced professionals while developing skills that can grow with you.</p>
      </div>
      <div class="benefit">
        <span>02</span>
        <h3>Work Together</h3>
        <p>Our best work happens when engineers, technicians, builders, and clients collaborate.</p>
      </div>
      <div class="benefit">
        <span>03</span>
        <h3>Make an Impact</h3>
        <p>The systems we build become part of the communities and spaces people depend on.</p>
      </div>
    </section>

    <section class="jobs-section">
      <div class="jobs-heading">
        <span>OPEN POSITIONS</span>
        <h2>Find your place<br />at Bear Mechanical.</h2>
        <span class="find-job-picture">
          <img src="/images/3dB.png" alt="3d bear" />
        </span>
      </div>

      <div class="job-list">
        <router-link to="/contact" class="job">
          <div>
            <span>ENGINEERING</span>
            <h3>Mechanical Engineer</h3>
          </div>
          <span class="job-arrow">→</span>
        </router-link>

        <router-link to="/contact" class="job">
          <div>
            <span>TECHNOLOGY</span>
            <h3>Building Automation Specialist</h3>
          </div>
          <span class="job-arrow">→</span>
        </router-link>

        <router-link to="/contact" class="job">
          <div>
            <span>PROJECT MANAGEMENT</span>
            <h3>Project Coordinator</h3>
          </div>
          <span class="job-arrow">→</span>
        </router-link>

        <router-link to="/contact" class="job">
          <div>
            <span>CONSTRUCTION</span>
            <h3>Field Technician</h3>
          </div>
          <span class="job-arrow">→</span>
        </router-link>
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
