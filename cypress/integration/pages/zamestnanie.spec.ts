import { withEmploymentInput } from '../../../__tests__/testCases/withEmploymentInput'
import {
  getInput,
  typeToInput,
  next,
  getError,
  assertUrl,
} from '../../utils/page'

Cypress.Cookies.defaults({
  preserve: ['you-shall'], // preserve the cookie between tests
})

before(() => {
  cy.setCookie('you-shall', 'not-pass') // allow direct access to pages via URL
})

describe('Employment page', () => {
  it('has working ui', () => {
    cy.visit('/zamestnanie')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/prijmy-a-vydavky')

    //  Go back to our page
    cy.visit('/zamestnanie')

    // Shows error, when presses next without interaction
    next()
    getError().should('have.length', 1)

    // When presses yes, additional fields appears
    cy.get('[data-test=employed-input-yes]').click()

    next()
    getError().should('have.length', 4)

    // Type to input
    typeToInput('r038', withEmploymentInput)

    next()
    getError().should('have.length', 3)

    typeToInput('r039', withEmploymentInput)
    getInput('r120').type('0')
    getInput('r108').type('0')

    // When presses no, the fields disappear
    cy.get('[data-test=employed-input-no]').click()

    getInput('r038').should('not.exist')
    getInput('r039').should('not.exist')

    // When presses yes, additional fields appears
    cy.get('[data-test=employed-input-yes]').click()

    getInput('r038').should('have.value', withEmploymentInput?.r038?.toString())
    getInput('r039').should('have.value', withEmploymentInput?.r039?.toString())

    // Should submit and next page should be parter
    next()
    assertUrl('/partner')
  })
  it('should erase previous answers when answer is changed to "no"', () => {
    cy.visit('/zamestnanie')

    // fill out and submit the form
    getInput('employed', '-yes').click()
    typeToInput('r038', withEmploymentInput)
    typeToInput('r039', withEmploymentInput)
    getInput('r120').type('10')
    getInput('r108').type('20')
    next()

    // go back
    assertUrl('/partner')
    cy.get('[data-test=back]').click()
    assertUrl('/zamestnanie')

    // form should preserve values when navigated back to it
    getInput('r038').should('have.value', withEmploymentInput?.r038?.toString())
    getInput('r039').should('have.value', withEmploymentInput?.r039?.toString())
    getInput('r120').should('have.value', '10')
    getInput('r108').should('have.value', '20')

    // form should hide
    getInput('employed', '-no').click()
    getInput('r038').should('not.exist')
    getInput('r039').should('not.exist')
    getInput('r120').should('not.exist')
    getInput('r108').should('not.exist')

    // form should display and preserve values until it is submitted
    getInput('employed', '-yes').click()
    getInput('r038').should('have.value', withEmploymentInput?.r038?.toString())
    getInput('r039').should('have.value', withEmploymentInput?.r039?.toString())
    getInput('r120').should('have.value', '10')
    getInput('r108').should('have.value', '20')

    // submit form
    getInput('employed', '-no').click()
    next()

    // go back
    assertUrl('/partner')
    cy.get('[data-test=back]').click()
    assertUrl('/zamestnanie')

    // form should no preserve answers because it was submitted with additional fields hidden
    getInput('employed', '-yes').click()
    getInput('r038').should('have.value', '')
    getInput('r039').should('have.value', '')
    getInput('r120').should('have.value', '')
    getInput('r108').should('have.value', '')
  })
})
