describe('My Vue App', () => {

  beforeEach(() => {
    cy.visit('/')  // visit home page before every test
  })

  it('loads the home page', () => {
    cy.get('body').should('exist')
    cy.get('img[alt="Women Rugby World Cup Logo"]').should('exist')
    cy.get('h1.text-h3.font-weight-bold').should('exist')
    cy.contains('button', 'Login').should('be.visible')
  })

  it('renders all pool names', () => {
    cy.contains('Pool A').should('be.visible')
    cy.contains('Pool B').should('be.visible')
    cy.contains('Pool C').should('be.visible')
    cy.contains('Pool D').should('be.visible')
  })

  it('renders at least one team in Pool A', () => {
    cy.contains('Pool A')
      .parent()
      .find('.team-name')
      .should('exist')
      .and('contain.text', 'England')
  })

  it('shows the Host Cities & Venues heading and input', () => {
    cy.contains('h2', 'Host Cities & Venues').should('exist')
    cy.get('input[placeholder="Select city or stadium..."]').should('exist')
    cy.get('.leaflet-container').should('exist') // the main map div
    cy.get('.leaflet-tile-loaded').should('have.length.greaterThan', 0) // at least one map tile loaded
  })

  it('renders all matches', () => {
    cy.get('.matches-grid').should('exist') // Check the matches grid exists
    cy.contains('.match h3', 'Semi-final 1').should('exist')
    cy.contains('.match h3', 'Final').should('exist')
  })

  it('makes 4 weather API calls (one per match)', () => {
    // Intercept both forecast and history API calls
    cy.intercept('GET', '**/(forecast|history).json*').as('getWeather')

    cy.visit('/')

    // Wait for 4 requests to complete
    cy.wait(['@getWeather', '@getWeather', '@getWeather', '@getWeather'], { timeout: 60000 })

    // Check there were exactly 4 total calls
    cy.get('@getWeather.all').then((calls) => {
      expect(calls.length).to.eq(4)
    })
  })

})
