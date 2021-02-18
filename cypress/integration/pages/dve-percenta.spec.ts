import { with2percentInput } from '../../../__tests__/testCases/with2percentInput'
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

describe('twoPercent page', () => {
  it('has working ui', () => {
    cy.visit('/dve-percenta')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/kupele')

    //  Go back to our page
    cy.visit('/dve-percenta')

    // Shows error, when presses next without interaction
    next()
    getError().should('have.length', 1)

    // When presses yes, additional fields appear
    cy.get('[data-test=XIIoddiel_uplatnujem2percenta-input-yes]').click()

    // All aditional fields should be required
    next()
    getError().should('have.length', 6)

    // Type to input
    typeToInput('r142_obchMeno', with2percentInput)
    typeToInput('r142_ico', with2percentInput)
    typeToInput('r142_pravnaForma', with2percentInput)
    typeToInput('r142_ulica', with2percentInput)
    typeToInput('r142_cislo', with2percentInput)
    typeToInput('r142_psc', with2percentInput)
    typeToInput('r142_obec', with2percentInput)
    cy.get('[data-test="XIIoddiel_suhlasZaslUdaje-input"]').click()

    next()
    assertUrl('/osobne-udaje')
  })
  it('with autoform', () => {
    cy.visit('/dve-percenta')

    // When presses yes, additional fields appear
    cy.get('[data-test=XIIoddiel_uplatnujem2percenta-input-yes]').click()

    /** With autoform */
    getInput('r142_obchMeno').type('starter')

    cy.contains('starter, o.z.').click()

    getInput('r142_obchMeno').should('contain.value', 'starter, o.z.')
    getInput('r142_ico').should('contain.value', '50 825 909')
    getInput('r142_pravnaForma').should('contain.value', 'Občianske združenie')
    getInput('r142_ulica').should('contain.value', 'Ševčenkova')
    getInput('r142_cislo').should('contain.value', '902/25')
    getInput('r142_psc').should('contain.value', '851 01')
    getInput('r142_obec').should('contain.value', 'Bratislava-Petržalka')
    cy.get('[data-test="XIIoddiel_suhlasZaslUdaje-input"]').click()

    next()
    assertUrl('/osobne-udaje')
  })
  it('works with no', () => {
    cy.visit('/dve-percenta')

    cy.get('[data-test=XIIoddiel_uplatnujem2percenta-input-no]').click()
    next()
    getError().should('have.length', 0)

    assertUrl('/osobne-udaje')
  })
  it('works with Slovensko.Digital pre-fill', () => {
    cy.visit('/dve-percenta')
    cy.get('[data-test=prefill-slovensko-digital]').click()

    getInput('r142_obchMeno').should('contain.value', 'Slovensko.Digital')
    getInput('r142_ico').should('contain.value', '50 158 635')
    getInput('r142_pravnaForma').should('contain.value', 'Občianske združenie')
    getInput('r142_ulica').should('contain.value', 'Staré Grunty')
    getInput('r142_cislo').should('contain.value', '205/18')
    getInput('r142_psc').should('contain.value', '841 04')
    getInput('r142_obec').should('contain.value', 'Bratislava')

    next()
    assertUrl('/osobne-udaje')
  })
})
