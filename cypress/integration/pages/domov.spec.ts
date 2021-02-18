import { homeRoute } from '../../../src/lib/routes'

Cypress.Cookies.defaults({
  preserve: ['you-shall'], // preserve the cookie between tests
})

before(() => {
  cy.setCookie('you-shall', 'not-pass') // allow direct access to pages via URL
})

describe('Domov', () => {
  describe('Cookie consent', () => {
    it('has working ui', () => {
      // display cookie consent
      cy.visit(homeRoute)
      cy.get('.govuk-main-wrapper')
      cy.get('.cc-message').should('exist')
      cy.get('.cc-message').contains('Tento web používa súbory cookie')
      cy.get('.cc-banner button').contains('OK').click()
      cy.get('.cc-message').should('not.exist')

      // do not display cookie consent on next visit
      cy.visit(homeRoute)
      cy.get('.govuk-main-wrapper')
      cy.get('.cc-message').should('not.exist')
    })
  })

  describe('Feedback', () => {
    it('has working ui', () => {
      cy.visit(homeRoute)
      cy.get('[data-test=feedback]').click()

      cy.get('[data-test=whatWereYouDoing]').type('Cypress tests')
      cy.get('[data-test=whatWentWrong]').type('Testing the spam')
      /** Don't spam the mail */
      // cy.get('[data-test=submit]').click();
    })
  })
})
