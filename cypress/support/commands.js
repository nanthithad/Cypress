// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom login command
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/web/index.php/auth/login');
  cy.get('input[name="username"]').clear().type(username);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('button[type="submit"]').click();
});
 
// Safe element getter with timeout
Cypress.Commands.add('getSafely', (selector, timeout = 10000) => {
  return cy.get(selector, { timeout }).should('exist');
});
 
// Safe login with error handling
Cypress.Commands.add('loginSafely', (username, password) => {
  cy.visit('/web/index.php/auth/login');
  cy.getSafely('input[name="username"]').type(username);
  cy.getSafely('input[name="password"]').type(password);
  cy.getSafely('button[type="submit"]').click();
 
  cy.url().then((url) => {
    if (url.includes('/auth/login')) {
      throw new Error('Login failed - check credentials');
    }
  });
});