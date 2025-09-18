const { defineConfig } = require('cypress');
 
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    setupNodeEvents(on, config) {
      // Register mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
   
    },
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    video: true,
    //videoUploadOnPasses: false,
    videosFolder: 'cypress/videos',
    viewportWidth: 1280,
    viewportHeight: 720,
    env: {
      admin_user: 'Admin',
      admin_password: 'admin123'
    }
   
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
    saveJson: true,
    charts: true,
    reportPageTitle: 'OrangeHRM Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
  }
});