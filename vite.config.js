import { configDefaults, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { createContactHandler } from './api/contact.js'

const contactHandler = createContactHandler({ env: { NODE_ENV: 'development', CONTACT_DELIVERY_MODE: 'mock' } })

function contactApiMock() {
  return {
    name: 'contact-api-mock',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res, next) => {
        if (req.method === 'POST') return contactHandler(req, res)
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [vue(), tailwindcss(), contactApiMock()],
  test: {
    // Browser-only Playwright specs are intentionally outside the Vitest suite.
    exclude: [...configDefaults.exclude, 'tests/**'],
  },
})
