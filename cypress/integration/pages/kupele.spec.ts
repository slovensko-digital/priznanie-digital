import { withSpaInput } from '../../../__tests__/testCases/withSpaInput'
import {
  getInput,
  typeToInput,
  next,
  getError,
  assertUrl,
  skipPage,
  navigateEligibleToChildrenPage,
} from '../../utils/page'

Cypress.Cookies.defaults({
  preserve: ['you-shall'], // preserve the cookie between tests
})

before(() => {
  cy.setCookie('you-shall', 'not-pass') // allow direct access to pages via URL
})

describe('Spa page', () => {
  it('works with no', () => {
    cy.visit('/kupele')
    getInput('kupele', '-no').click()
    next()
    getError().should('have.length', 0)
    assertUrl('/dve-percenta')
  })
  it('Links and errors', () => {
    cy.visit('/kupele')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/dochodok')

    //  Go back to our page
    cy.visit('/kupele')

    // Shows error, when presses next without interaction
    next()
    getError().should('have.length', 1)

    // When presses yes, additional fields appear
    getInput('kupele', '-yes').click()

    // All aditional fields should be required
    next()
    cy.get('.govuk-error-summary')
  })

  it('works with both partner and user', () => {
    cy.visit('/kupele')

    getInput('kupele', '-yes').click()

    // Type to input
    getInput('danovnikInSpa').click()
    getInput('r076a_kupele_danovnik')

    getInput('r033_partner_kupele').click()
    getInput('r033_partner_kupele_uhrady')
  })
  it('Spa UI with previously entered spouse and children', () => {
    navigateEligibleToChildrenPage()
    assertUrl('/deti')

    getInput('hasChildren', '-yes').click()

    // Enter child data
    cy.get('[data-test="children[0].priezviskoMeno-input"]').type(
      withSpaInput.children?.[0]?.priezviskoMeno ?? '',
    )
    cy.get('[data-test="children[0].rodneCislo-input"]').type(
      withSpaInput.children?.[0]?.rodneCislo ?? '',
    )

    cy.get('[data-test=add-child]').click()

    cy.get('[data-test="children[1].priezviskoMeno-input"]').type(
      withSpaInput.children?.[1]?.priezviskoMeno ?? '',
    )
    cy.get('[data-test="children[1].rodneCislo-input"]').type(
      withSpaInput.children?.[1]?.rodneCislo ?? '',
    )

    next()
    cy.get('[data-test=platil_prispevky_na_dochodok-input-no]').click()
    next()
    // cy.get('[data-test=r037_uplatnuje_uroky-input-no]').click()
    // next()

    getInput('kupele', '-yes').click()

    // Type to input
    getInput('danovnikInSpa').click()
    getInput('r076a_kupele_danovnik').type('60')

    next()

    cy.get('[data-test=error]')
    getInput('r076a_kupele_danovnik').clear()
    getInput('r076a_kupele_danovnik').type('-1')

    next()
    cy.get('[data-test=error]')

    getInput('r033_partner_kupele').click()
    getInput('r033_partner_kupele_uhrady')

    getInput('childrenInSpa').click()
    getInput('r036_deti_kupele')
  })
  it('Spa UI without previously entered spouse and children', () => {
    cy.visit('/prijmy-a-vydavky')
    typeToInput('t1r10_prijmy', withSpaInput)
    typeToInput('priloha3_r11_socialne', withSpaInput)
    typeToInput('priloha3_r13_zdravotne', withSpaInput)
    getInput('r122').type('0')
    next()

    assertUrl('/zamestnanie')
    skipPage()

    assertUrl('/partner')
    cy.get('[data-test=r032_uplatnujem_na_partnera-input-yes]').click()
    next()
    cy.get('[data-test=partner_spolocna_domacnost-input-no]').click()
    next()
    next()

    assertUrl('/deti')
    skipPage()

    assertUrl('/dochodok')
    skipPage()

    // assertUrl('/hypoteka')
    // skipPage()

    getInput('kupele', '-yes').click()

    // select at least one
    next()
    getError().should('have.length', 1)

    // danovnik
    getInput('danovnikInSpa').click()
    getInput('r076a_kupele_danovnik').type('60')

    next()
    getError().should('have.length', 1)
    getInput('r076a_kupele_danovnik').clear()
    typeToInput('r076a_kupele_danovnik', withSpaInput)

    next()
    assertUrl('/dve-percenta')
    cy.get('[data-test=back]').click()

    // partner
    getInput('r033_partner_kupele').click()
    next()
    getError().should('have.length', 3)

    typeToInput('r031_priezvisko_a_meno', withSpaInput)
    typeToInput('r031_rodne_cislo', withSpaInput)
    typeToInput('r033_partner_kupele_uhrady', withSpaInput)

    next()
    assertUrl('/dve-percenta')
    cy.get('[data-test=back]').click()

    getInput('childrenInSpa').click()

    next()
    getError().should('have.length', 3)

    // Enter child data
    cy.get('[data-test="children[0].priezviskoMeno-input"]').type(
      withSpaInput.children?.[0]?.priezviskoMeno ?? '',
    )
    cy.get('[data-test="children[0].rodneCislo-input"]').type(
      withSpaInput.children?.[0]?.rodneCislo ?? '',
    )

    cy.get('[data-test=add-child]').click()

    cy.get('[data-test="children[1].priezviskoMeno-input"]').type(
      withSpaInput.children?.[1]?.priezviskoMeno ?? '',
    )
    cy.get('[data-test="children[1].rodneCislo-input"]').type(
      withSpaInput.children?.[1]?.rodneCislo ?? '',
    )

    getInput('r036_deti_kupele').type('101')
    next()
    getError().should('have.length', 1)

    getInput('r036_deti_kupele').clear()
    typeToInput('r036_deti_kupele', withSpaInput)
    next()
    assertUrl('/dve-percenta')
  })
})
