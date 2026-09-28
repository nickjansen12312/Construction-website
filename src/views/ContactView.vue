<script setup>
import { ref } from 'vue'

const formMessage = ref('')
const formStatus = ref('')

function onSubmit() {
  // Privacy fix: intercept submission so visitor data is never written into the URL
  // (the legacy form defaulted to a GET submit). The actual POST destination is
  // owner-gated (APP-754); until the owner connects an approved endpoint, no data
  // leaves the browser and the user sees an explicit, accessible status.
  formStatus.value = 'pending-destination'
  formMessage.value =
    'Thanks — your message is ready, but the send service has not been connected yet. Please contact the site owner to configure a submission destination.'
}
</script>

<template>
  <main>
    <section class="inner-hero contact-hero">
      <div class="inner-hero-content">
        <span>CONTACT</span>
        <h1>Let's start<br /><em>something.</em></h1>
        <p>Have a project, question, or idea? We'd like to hear from you.</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="contact-information">
        <span>GET IN TOUCH</span>
        <h2>Let's talk about your project.</h2>
        <p>Tell us a little about what you're working on and someone from our team will get back to you.</p>

        <div class="contact-details">
          <div>
            <span>PHONE</span>
            <p>(417) 555-0142</p>
          </div>
          <div>
            <span>EMAIL</span>
            <p>hello@bearmechanical.com</p>
          </div>
          <div>
            <span>OFFICE</span>
            <p>3700 <br />Springfield, MO 65803</p>
          </div>
        </div>
      </div>

      <form class="contact-form" id="contactForm" @submit.prevent="onSubmit">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">FIRST NAME</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>
          <div class="form-group">
            <label for="lastName">LAST NAME</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>
        </div>

        <div class="form-group">
          <label for="email">EMAIL</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div class="form-group">
          <label for="company">COMPANY</label>
          <input type="text" id="company" name="company" />
        </div>

        <div class="form-group">
          <label for="projectType">PROJECT TYPE</label>
          <select id="projectType" name="projectType">
            <option value="">Select a project type</option>
            <option>Mechanical</option>
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>Building Automation</option>
            <option>General Inquiry</option>
          </select>
        </div>

        <div class="form-group">
          <label for="message">MESSAGE</label>
          <textarea id="message" name="message" rows="6" required></textarea>
        </div>

        <button type="submit" class="form-button">SEND MESSAGE →</button>

        <p id="formMessage" class="form-message" role="status" :data-status="formStatus">
          {{ formMessage }}
        </p>
      </form>
    </section>

    <section class="cta-section">
      <div>
        <span>Bear Mechanical</span>
        <h2>Building what<br />comes next.</h2>
      </div>
      <router-link to="/projects" class="cta-button">SEE OUR WORK →</router-link>
    </section>
  </main>
</template>
