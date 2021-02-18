import { baseInput } from '../../../__tests__/testCases/baseInput'
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

describe('osobne-udaje page', () => {
  it('Back and next', () => {
    cy.visit('/osobne-udaje')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/dve-percenta')

    //  Go back to our page
    cy.visit('/osobne-udaje')

    // Shows error, when presses next without interaction
    next()
    getError()
  })
  it('with autoform', () => {
    cy.visit('/osobne-udaje')

    /** With autoform */
    typeToInput('r001_dic', baseInput)
    typeToInput('r003_nace', baseInput)
    getInput('meno_priezvisko').type('urban ayurveda')

    cy.contains('PhDr. Pavel Urban, PhD., PhD. - AYURVÉDA').click() // use a name that needs to be parsed

    getInput('meno_priezvisko').should(
      'contain.value',
      'PhDr. Pavel Urban, PhD., PhD. - AYURVÉDA',
    )
    getInput('r006_titul').should('contain.value', 'PhDr. / PhD., PhD.')
    getInput('r004_priezvisko').should('contain.value', 'Urban, - AYURVÉDA')
    getInput('r005_meno').should('contain.value', 'Pavel')
    getInput('r007_ulica').should('contain.value', 'Národná')
    getInput('r008_cislo').should('contain.value', '10')
    getInput('r009_psc').should('contain.value', '010 01')
    getInput('r010_obec').should('contain.value', 'Žilina')
    getInput('r011_stat').should('contain.value', 'Slovenská republika')

    next()
  })
  it('with NACE', () => {
    cy.visit('/osobne-udaje')

    /** With autoform */
    getInput('r003_nace').type('ryža')

    cy.contains('01120').click({ force: true })

    getInput('r003_nace').should('have.value', '01120 - Pestovanie ryže')
  })
  it('with posta api', () => {
    cy.visit('/osobne-udaje')

    typeToInput('r009_psc', baseInput)
    getInput('r010_obec').should('have.value', baseInput.r010_obec)
  })
  it('Manual entry', () => {
    cy.visit('/osobne-udaje')

    /** With autoform */
    typeToInput('r001_dic', baseInput)
    typeToInput('r003_nace', baseInput)
    typeToInput('r005_meno', baseInput)
    typeToInput('r004_priezvisko', baseInput)
    typeToInput('r007_ulica', baseInput)
    typeToInput('r008_cislo', baseInput)
    typeToInput('r009_psc', baseInput)
    getInput('r010_obec').clear() // clear value from PSC autocomplete via Posta API
    typeToInput('r010_obec', baseInput)
    typeToInput('r011_stat', baseInput)

    next()
  })
})
