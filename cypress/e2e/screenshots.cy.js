describe('OrangeHRM Screenshot Examples', () => {
  it('demonstrates screenshot capabilities', () => {
    cy.visit('/web/index.php/auth/login');
 
    // Capture entire page
    cy.get('.orangehrm-login-branding', { timeout: 60000 }).should('be.visible');
    cy.screenshot('login-page');
 
    // Capture specific element
    cy.get('.orangehrm-login-branding').screenshot('login-logo');
 
    // Fill login form
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
 
    // Capture filled form
    cy.screenshot('login-form-filled');
 
    // Submit form
    cy.get('button[type="submit"]').click();
 
    // Verify dashboard and capture
    cy.url({ timeout: 60000 }).should('include', '/dashboard');
    cy.screenshot('dashboard-page');
  });
});