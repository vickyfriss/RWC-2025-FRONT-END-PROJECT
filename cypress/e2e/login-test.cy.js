describe('Login UI', () => {
    
    it('logs in via homepage login button', () => {
        cy.visit('/')  // Start on home page
    
        // Click the Login button in the header
        cy.contains('button', 'Login').click()
  
      cy.get('input[type="email"]').clear().type('vicky_friss@hotmail.com')
      cy.get('input[type="password"]').clear().type('holahola')
      cy.get('button[type="submit"]').click() 
      // Wait for home page to load after Firebase auth
    cy.url({ timeout: 10000 }).should('eq', Cypress.config().baseUrl + '/')
})
  
      // Assert redirection to home page
    it('loads the home page', () => {
        cy.get('body').should('exist')
        cy.get('img[alt="Women Rugby World Cup Logo"]').should('exist')
        cy.get('h1.text-h3.font-weight-bold').should('exist')
        cy.contains('button', 'Login').should('be.visible')
      })


    it('shows the user menu with profile and logout', () => {
        // Login button should be gone
        cy.contains('button', 'Login').should('not.exist')
    
        // Click user icon
        cy.get('button[aria-label="User menu"]').click() // replace with proper selector
    
        // Menu options visible
        cy.contains('Profile').should('be.visible')
        cy.contains('Logout').should('be.visible')
        cy.contains(email).should('be.visible')
      })
  })
  