import { next, assertUrl } from '../../utils/page'

Cypress.Cookies.defaults({
  preserve: ['you-shall'], // preserve the cookie between tests
})

before(() => {
  cy.setCookie('you-shall', 'not-pass') // allow direct access to pages via URL
})

describe('Results page', () => {
  it('has working navigation', () => {
    cy.visit('/vysledky')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/suhrn')

    //  Go back to our page
    cy.visit('/vysledky')

    next()
    assertUrl('/stiahnut')
  })
  it('has working ui', () => {
    cy.visit('/vysledky')

    cy.get('h1').contains('Výpočet dane za rok')
    cy.get('h2').contains('Stručný prehľad')
  })
})
