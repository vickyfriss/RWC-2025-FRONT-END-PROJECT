import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/', // <-- your dev server URL
    supportFile: 'cypress/support/e2e.js', // default support file
  },
})
