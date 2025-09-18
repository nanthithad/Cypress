// Ignore uncaught exceptions during logout (known OrangeHRM bug)
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  if (err.message.includes('Cannot read properties of undefined (reading \'response\')')) {
    return false;
  }
  // Allow other exceptions to fail the test
});
describe('OrangeHRM CI/CD Tests', () => {
  const username = Cypress.env('admin_user');
  const password = Cypress.env('admin_password');
 
  it('completes critical path smoke test', () => {
    // Login
    cy.visit('/web/index.php/auth/login');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
 
    // Verify dashboard
    cy.url({ timeout: 10000 }).should('include', '/dashboard');
 
    // Navigate through key sections
    cy.get('.oxd-sidepanel').contains('Admin').click();
    cy.url().should('include', '/admin/viewSystemUsers');
 
    cy.get('.oxd-sidepanel').contains('PIM').click();
    cy.url().should('include', '/pim/viewEmployeeList');
 
    cy.get('.oxd-sidepanel').contains('Leave').click();
    cy.url().should('include', '/leave/viewLeaveList');
 
    // Logout
    cy.get('.oxd-userdropdown-tab').click();
    cy.get('.oxd-dropdown-menu').contains('Logout').click();
    cy.url().should('include', '/auth/login');
  });
});