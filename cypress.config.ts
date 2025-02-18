import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 8000,
  viewportWidth: 1100,
  viewportHeight: 1000,
  video: false,
  projectId: 'ivst8i',
  downloadsFolder: 'cypress/downloads',
  trashAssetsBeforeRuns: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    retries: 1,
  },
})
