import { defineConfig } from 'cypress'
import validateXml from './cypress/tasks/validateXml'

export default defineConfig({
  defaultCommandTimeout: 8000,
  viewportWidth: 1100,
  viewportHeight: 1000,
  video: false,
  projectId: 'ivst8i',
  downloadsFolder: 'cypress/downloads',
  fileServerFolder: 'cypress/fileServer',
  trashAssetsBeforeRuns: true,
  retries: 1,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on) {
      on("task", { validateXml });
    },
  },
})
