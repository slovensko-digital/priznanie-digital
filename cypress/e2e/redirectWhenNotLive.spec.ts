/// <reference types="cypress" />

describe('Redirect when not live', () => {
  describe('isLive=false', () => {
    it('should redirect /prijmy-a-vydavky to home', () => {
      cy.visit('/prijmy-a-vydavky')
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('should redirect /zamestnanie to home', () => {
      cy.visit('/zamestnanie')
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('should redirect /osobne-udaje to home', () => {
      cy.visit('/osobne-udaje')
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('should not redirect home page', () => {
      cy.visit('/')
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })

  describe('isPostponeLive=false', () => {
    it('should redirect /odklad/prijmy-zo-zahranicia to home', () => {
      cy.visit('/odklad/prijmy-zo-zahranicia')
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('should redirect /odklad/osobne-udaje to home', () => {
      cy.visit('/odklad/osobne-udaje')
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })

  describe('debug cookie bypasses guard', () => {
    it('should not redirect when debug cookie is set', () => {
      cy.setCookie('you-shall', 'not-pass')
      cy.visit('/prijmy-a-vydavky')
      cy.url().should('include', '/prijmy-a-vydavky')
    })
  })
})
