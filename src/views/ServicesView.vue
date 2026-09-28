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
      <div class="service-detail" id="mechanical">
        <div class="service-detail-number">01</div>
        <div>
          <h2>Mechanical</h2>
          <p>We design and install mechanical systems that keep buildings comfortable, efficient, and reliable.</p>
          <ul>
            <li>HVAC Systems</li>
            <li>Heating and Cooling</li>
            <li>Air Distribution</li>
            <li>Mechanical Piping</li>
          </ul>
        </div>
      </div>

      <div class="service-detail" id="electrical">
        <div class="service-detail-number">02</div>
        <div>
          <h2>Electrical</h2>
          <p>Our electrical teams provide infrastructure that powers everything from everyday workplaces to complex facilities.</p>
          <ul>
            <li>Power Distribution</li>
            <li>Lighting</li>
            <li>Electrical Infrastructure</li>
            <li>Emergency Systems</li>
          </ul>
        </div>
      </div>

      <div class="service-detail" id="plumbing">
        <div class="service-detail-number">03</div>
        <div>
          <h2>Plumbing</h2>
          <p>We install dependable plumbing systems designed around the needs of each building.</p>
          <ul>
            <li>Water Systems</li>
            <li>Drainage</li>
            <li>Process Piping</li>
            <li>Plumbing Fixtures</li>
          </ul>
        </div>
      </div>

      <div class="service-detail" id="automation">
        <div class="service-detail-number">04</div>
        <div>
          <h2>Automation</h2>
          <p>Smart controls connect building systems, helping facilities operate more efficiently and intelligently.</p>
          <ul>
            <li>Building Controls</li>
            <li>Energy Management</li>
            <li>Monitoring</li>
            <li>System Integration</li>
          </ul>
        </div>
      </div>
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
