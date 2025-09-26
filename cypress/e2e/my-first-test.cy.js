describe('My Vue App', () => {
    it('loads the home page', () => {
      cy.visit('/')               // goes to baseUrl from cypress.config.js
      cy.get('body').should('exist')  // simplest check
    })
  })
  