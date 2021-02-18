import { Route } from '../../../src/lib/routes'
import { getInput, next, assertUrl } from '../../utils/page'

Cypress.Cookies.defaults({
  preserve: ['you-shall'], // preserve the cookie between tests
})

before(() => {
  cy.setCookie('you-shall', 'not-pass') // allow direct access to pages via URL
})

describe('Summary page', () => {
  it('has working navigation', () => {
    cy.visit('/suhrn')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/osobne-udaje')

    //  Go back to our page
    cy.visit('/vysledky')
  })
  it('has working ui', () => {
    cy.visit('/suhrn')

    cy.get('h1').contains('Súhrn a kontrola vyplnených údajov')
    cy.get('h2').contains('Príjmy a odvody')
  })
  it('displays correct first & last name', () => {
    cy.visit('/osobne-udaje')

    getInput('meno_priezvisko').type('Matej Ledni')
    cy.contains('Matej Lednický').click()
    getInput('meno_priezvisko').clear()
    getInput('meno_priezvisko').type('Jozef Mrkva') // write different name into search input
    next()

    assertUrl('/suhrn')
    cy.get('[data-test=r005_meno]').contains('Matej')
    cy.get('[data-test=r004_priezvisko]').contains('Lednický')
  })
  ;[
    '/prijmy-a-vydavky',
    '/zamestnanie',
    '/partner',
    '/deti',
    '/dochodok',
    // '/hypoteka',
    '/kupele',
    '/osobne-udaje',
  ].forEach((link: Route, index) => {
    it(`has working edit link to ${link}`, () => {
      cy.visit('/suhrn')
      cy.get('h2 > a').eq(index).click()
      assertUrl(link)

      // Back button should navigate back to summary page
      cy.get('[data-test=back]').click()
      cy.visit('/suhrn')
    })
  })
})
