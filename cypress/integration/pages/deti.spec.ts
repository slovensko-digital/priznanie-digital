import { withChildrenInput } from '../../../__tests__/testCases/withChildrenInput'
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

describe('Children page', () => {
  it('has working ui for ineligible applicants', () => {
    cy.visit('/deti')
    cy.get('[data-test=ineligible-message]').should('exist')
  })
  it('has working navigation for ineligible applicants', () => {
    cy.visit('/partner')
    skipPage()
    assertUrl('/dochodok')
  })
  it('has working validation', () => {
    navigateEligibleToChildrenPage()
    assertUrl('/deti')

    next()
    getError()

    // When presses yes, additional fields appears
    getInput('hasChildren', '-yes').click()

    // Try to add 2nd child
    next()

    // Show errors when trying to add 2nd child
    getError().should('have.length', 2)

    // Enter child data
    cy.get('[data-test="children[0].priezviskoMeno-input"]').type(
      withChildrenInput.children?.[0]?.priezviskoMeno ?? '',
    )
    cy.get('[data-test="children[0].rodneCislo-input"]').type(
      withChildrenInput.children?.[0]?.rodneCislo ?? '',
    )

    next()
    assertUrl('/dochodok')
  })
  it('has working ui for adding children', () => {
    cy.visit('/prijmy-a-vydavky')
    typeToInput('t1r10_prijmy', { ...withChildrenInput, t1r10_prijmy: '3480' })
    typeToInput('priloha3_r11_socialne', withChildrenInput)
    typeToInput('priloha3_r13_zdravotne', withChildrenInput)
    getInput('r122').type('0')

    next()

    assertUrl('/zamestnanie')
    getInput('employed', '-yes').click()
    typeToInput('r038', { ...withChildrenInput, r038: '3480' }) // eligible via employment income
    typeToInput('r039', { ...withChildrenInput, r039: '1000' })
    typeToInput('r120', { ...withChildrenInput, r120: '0' }) // eligible via employment income
    typeToInput('r108', { ...withChildrenInput, r108: '0' })
    next()

    assertUrl('/partner')
    skipPage()

    assertUrl('/deti')

    // When presses yes, additional fields appears
    getInput('hasChildren', '-yes').click()

    // Try to add 2nd child
    cy.get('[data-test="add-child"]').click()

    // Show errors when trying to add 2nd child
    getError().should('have.length', 2)

    // Enter 1st child data
    cy.get('[data-test="children[0].priezviskoMeno-input"]').type(
      withChildrenInput.children?.[0]?.priezviskoMeno ?? '',
    )
    cy.get('[data-test="children[0].rodneCislo-input"]').type(
      withChildrenInput.children?.[0]?.rodneCislo ?? '',
    )

    // Add 2nd child
    cy.get('[data-test="add-child"]').click()

    next()

    // Show errors for 2nd child
    getError().should('have.length', 2)

    // Enter 2nd child data
    cy.get('[data-test="children[1].priezviskoMeno-input"]').type(
      withChildrenInput.children?.[1]?.priezviskoMeno ?? '',
    )
    cy.get('[data-test="children[1].rodneCislo-input"]').type(
      withChildrenInput.children?.[1]?.rodneCislo ?? '',
    )

    // Add 3rd child
    cy.get('[data-test="add-child"]').click()

    next()

    // Show errors for 3rd child
    getError().should('have.length', 2)

    // Remove 2rd child
    cy.get('[data-test="remove-child-2"]').click()

    next()
    assertUrl('/dochodok')
  })
  it('has working validation for child form months', () => {
    navigateEligibleToChildrenPage()
    assertUrl('/deti')

    // When presses yes, additional fields appears
    getInput('hasChildren', '-yes').click()

    // Enter invalid months (November - April)
    cy.get('[data-test="children[0].monthFrom-select"]').select('10')
    cy.get('[data-test="children[0].monthTo-select"]').select('3')

    // Try to add 2nd child
    next()

    // Should have error for invalid months
    getError().should('have.length', 3)

    // Enter valid months (November - April)
    cy.get('[data-test="children[0].monthFrom-select"]').select('3')
    cy.get('[data-test="children[0].monthTo-select"]').select('10')

    // Try to continue
    next()

    // Should not have error for invalid months
    getError().should('have.length', 2)

    // Check checkbox for whole year
    cy.get('[data-test="children[0].wholeYear-input"]').click()

    next()

    // Should not have error for invalid months
    getError().should('have.length', 2)
  })
})
