

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Raport Testów Automation Test Store (Zadanie 3)',
    embeddedScreenshots: true,
    inlineAssets: true, 
    saveAllAttempts: false,
    
    reportDir: 'cypress/reports/html', 
  },
  
  
  e2e: {
    setupNodeEvents(on, config) {
     
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://automationteststore.com', 
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});