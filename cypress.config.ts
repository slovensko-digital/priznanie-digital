import { defineConfig } from 'cypress'

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
      on("task", {
        validateXml: async (args) => {
          const { validateXml } = require("./tasks/validateXml");
          return validateXml(args);
        },
      });
    },
  },
})
