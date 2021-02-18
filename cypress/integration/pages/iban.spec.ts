import { withBonusInput } from '../../../__tests__/testCases/withBonusInput'
import {
  getInput,
  typeToInput,
  next,
  getError,
  assertUrl,
  skipPage,
} from '../../utils/page'

Cypress.Cookies.defaults({
  preserve: ['you-shall'], // preserve the cookie between tests
})

before(() => {
  cy.setCookie('you-shall', 'not-pass') // allow direct access to pages via URL
})

describe('IBAN page', () => {
  it('has working ui for ineligible applicants', () => {
    cy.visit('/iban')
    cy.get('[data-test=ineligible-message]').should('exist')
  })
  it('has working ui for eligible applicants', () => {
    cy.visit('/prijmy-a-vydavky')
    typeToInput('t1r10_prijmy', { ...withBonusInput, t1r10_prijmy: '3480' })
    typeToInput('priloha3_r11_socialne', withBonusInput)
    typeToInput('priloha3_r13_zdravotne', withBonusInput)
    getInput('r122').type('0')

    next()

    assertUrl('/zamestnanie')
    skipPage()

    assertUrl('/partner')
    skipPage()

    assertUrl('/deti')
    getInput('hasChildren', '-yes').click()
    cy.get('[data-test="children[0].priezviskoMeno-input"]').type(
      withBonusInput.children?.[0]?.priezviskoMeno ?? '',
    )
    cy.get('[data-test="children[0].rodneCislo-input"]').type(
      withBonusInput.children?.[0]?.rodneCislo ?? '',
    )
    next()

    assertUrl('/dochodok')
    skipPage()

    // assertUrl('/hypoteka')
    // skipPage()

    assertUrl('/kupele')
    skipPage()

    assertUrl('/dve-percenta')
    skipPage()

    assertUrl('/osobne-udaje')
    getInput('meno_priezvisko').type('Matej Ledni')
    cy.contains('Matej Lednický').click()
    next()

    assertUrl('/suhrn')
    next()

    assertUrl('/iban')
    cy.get('[data-test=ineligible-message]').should('not.exist')
    next()

    getError().should('have.length', 1)

    getInput('ziadamVyplatitDanovyBonus', '-no').click()
    next()
    getError().should('have.length', 0)

    assertUrl('/vysledky')
    cy.get('.govuk-back-link').click()
    getError().should('have.length', 0)

    getInput('ziadamVyplatitDanovyBonus', '-yes').click()
    getInput('iban').should('exist')
    next()

    getError().should('have.length', 1)

    getInput('iban').type('SK6807200002891987426353')
    next()
    assertUrl('/vysledky')
  })
})
