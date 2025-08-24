describe('Horse Racing Game', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  
  it('should load the game interface', () => {
    cy.get('#app').should('be.visible')
    cy.get('h1').should('contain', 'Horse Racing Game Trial Day')
    cy.get('.game-controls').should('be.visible')
    cy.get('.horse-list-panel').should('be.visible')
    cy.get('.race-track-panel').should('be.visible')
    cy.get('.race-info-panel').should('be.visible')
  })
  
  it('should generate horses and race program', () => {
    cy.get('.generate-btn').click()
    cy.get('.horse-list-panel').should('contain', 'Horse List')
    cy.get('.race-program').should('contain', 'Program')
    cy.get('.game-status').should('contain', 'Ready to Race')
  })
  
  it('should start and pause races', () => {
    cy.get('.generate-btn').click()
    cy.wait(1000)
    
    cy.get('.start-btn').click()
    cy.get('.game-status').should('contain', 'Race in Progress')
    
    cy.get('.pause-btn').click()
    cy.get('.game-status').should('contain', 'Race Paused')
  })
  
  it('should display race results after completion', () => {
    cy.get('.generate-btn').click()
    cy.wait(1000)
    
    cy.get('.start-btn').click()
    
    cy.wait(15000)
    
    cy.get('.race-results').should('contain', 'Results')
    cy.get('.result-item').should('be.visible')
  })
  
  it('should be responsive on mobile devices', () => {
    cy.viewport('iphone-x')
    cy.get('.game-layout').should('be.visible')
    cy.get('.controls-container').should('be.visible')
  })
})
