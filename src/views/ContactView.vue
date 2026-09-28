<script setup>
import { reactive, ref } from 'vue'
import { submitContact } from '../lib/contact-submission'

const form = reactive({ firstName: '', lastName: '', email: '', company: '', projectType: '', message: '', website: '' })
const fields = ref(/** @type {Record<string, string>} */ ({}))
const formStatus = ref('')
const formMessage = ref('')

const messages = {
  pending: 'Sending your message…',
  success: 'Thanks — your message was received. We will be in touch soon.',
  'rate-limit': 'Too many requests. Please wait a moment before trying again.',
  disabled: 'Message delivery is not configured right now. Please try again later.',
  'service-failure': 'We could not send your message right now. Please try again later.',
}

async function onSubmit() {
  fields.value = {}
  formStatus.value = 'pending'
  formMessage.value = messages.pending
  const result = await submitContact(form)
  fields.value = result.fields
  formStatus.value = result.status
  formMessage.value = result.status === 'validation-error'
    ? 'Please correct the highlighted fields and try again.'
    : messages[result.status]
  if (result.status === 'success') {
    Object.assign(form, { firstName: '', lastName: '', email: '', company: '', projectType: '', message: '', website: '' })
  }
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

      <form class="contact-form" id="contactForm" novalidate @submit.prevent="onSubmit">
        <div class="visually-hidden" aria-hidden="true">
          <label for="website">Website</label>
          <input id="website" v-model="form.website" name="website" tabindex="-1" autocomplete="off" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">FIRST NAME</label>
            <input id="firstName" v-model="form.firstName" type="text" name="firstName" autocomplete="given-name" :aria-invalid="Boolean(fields.firstName)" aria-describedby="firstName-error" />
            <p v-if="fields.firstName" id="firstName-error" class="field-error">{{ fields.firstName }}</p>
          </div>
          <div class="form-group">
            <label for="lastName">LAST NAME</label>
            <input id="lastName" v-model="form.lastName" type="text" name="lastName" autocomplete="family-name" :aria-invalid="Boolean(fields.lastName)" aria-describedby="lastName-error" />
            <p v-if="fields.lastName" id="lastName-error" class="field-error">{{ fields.lastName }}</p>
          </div>
        </div>

        <div class="form-group">
          <label for="email">EMAIL</label>
          <input id="email" v-model="form.email" type="email" name="email" autocomplete="email" :aria-invalid="Boolean(fields.email)" aria-describedby="email-error" />
          <p v-if="fields.email" id="email-error" class="field-error">{{ fields.email }}</p>
        </div>

        <div class="form-group">
          <label for="company">COMPANY</label>
          <input id="company" v-model="form.company" type="text" name="company" autocomplete="organization" :aria-invalid="Boolean(fields.company)" aria-describedby="company-error" />
          <p v-if="fields.company" id="company-error" class="field-error">{{ fields.company }}</p>
        </div>

        <div class="form-group">
          <label for="projectType">PROJECT TYPE</label>
          <select id="projectType" v-model="form.projectType" name="projectType" :aria-invalid="Boolean(fields.projectType)" aria-describedby="projectType-error">
            <option value="">Select a project type</option>
            <option>Mechanical</option>
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>Building Automation</option>
            <option>General Inquiry</option>
          </select>
          <p v-if="fields.projectType" id="projectType-error" class="field-error">{{ fields.projectType }}</p>
        </div>

        <div class="form-group">
          <label for="message">MESSAGE</label>
          <textarea id="message" v-model="form.message" name="message" rows="6" :aria-invalid="Boolean(fields.message)" aria-describedby="message-error"></textarea>
          <p v-if="fields.message" id="message-error" class="field-error">{{ fields.message }}</p>
        </div>

        <button type="submit" class="form-button" :disabled="formStatus === 'pending'">{{ formStatus === 'pending' ? 'SENDING…' : 'SEND MESSAGE →' }}</button>

        <p id="formMessage" class="form-message" role="status" aria-live="polite" :data-status="formStatus">
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
