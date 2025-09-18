describe('OrangeHRM Error Handling Examples', () => {
  it('handles element not found gracefully', () => {
    cy.visit('/web/index.php/auth/login');
 
    cy.get('input[name="username"]').should('exist').type('Admin');
    cy.get('input[name="password"]').should('exist').type('admin123');
 
    cy.get('button[type="submit"]').click();
 
    cy.url().then((url) => {
      if (url.includes('/auth/login')) {
        cy.get('.oxd-alert-content')
          .should('exist')
          .then(($error) => {
            cy.log('Login failed with error: ' + $error.text());
            cy.screenshot('login-error');
          });
      } else {
        cy.url().should('include', '/dashboard');
      }
    });
  });
 
  it('handles network errors gracefully', () => {
    cy.intercept('GET', '**/api/**').as('apiCall');
 
    cy.visit('/web/index.php/auth/login');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
 
    cy.wait('@apiCall', { timeout: 10000 }).then((interception) => {
      if (interception.response && interception.response.statusCode >= 400) {
        cy.log('API call failed: ' + interception.response.statusCode);
        cy.screenshot('api-failure');
      }
    });
  });
});