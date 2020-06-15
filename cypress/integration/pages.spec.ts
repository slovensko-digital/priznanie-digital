/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { withEmploymentInput } from '../../__tests__/testCases/withEmploymentInput'
import { withChildrenInput } from '../../__tests__/testCases/withChildrenInput'
import { baseInput } from '../../__tests__/testCases/baseInput'
import { foreignIncomeInput } from '../../__tests__/testCases/postpone/foreignIncomeInput'
import { withEmailInput } from '../../__tests__/testCases/postpone/withEmailInput'
import { with2percentInput } from '../../__tests__/testCases/with2percentInput'
import { withSpaInput } from '../../__tests__/testCases/withSpaInput'

import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'
import { Route, PostponeRoute } from '../../src/lib/routes'
import { PostponeUserInput } from '../../src/types/PostponeUserInput'
import { withPensionInput } from '../../__tests__/testCases/withPensionInput'
import { withPartnerInput } from '../../__tests__/testCases/withPartnerInput'

function getInput<K extends keyof TaxFormUserInput>(key: K, suffix = '') {
  return cy.get(`[data-test="${key}-input${suffix}"]`)
}

function getInputPostpone<K extends keyof PostponeUserInput>(
  key: K,
  suffix = '',
) {
  return cy.get(`[data-test="${key}-input${suffix}"]`)
}

function typeToInput<K extends keyof TaxFormUserInput>(
  key: K,
  userInput: TaxFormUserInput,
) {
  const value = userInput[key]
  if (typeof value === 'string') {
    return getInput(key).type(value)
  }
  throw new Error(`Incorrect type of input: ${value}`)
}

function typeToInputPostpone<K extends keyof PostponeUserInput>(
  key: K,
  userInput: PostponeUserInput,
) {
  const value = userInput[key]
  if (typeof value === 'string') {
    return getInputPostpone(key).type(value)
  }
  throw new Error(`Incorrect type of input: ${value}`)
}

function next() {
  return cy.contains('Pokračovať').click()
}

const getError = () => cy.get('[data-test=error]')
function assertUrl(url: Route | PostponeRoute) {
  cy.url().should('include', url)
}

Cypress.Cookies.defaults({
  whitelist: ['you-shall'], // preserve the cookie between tests
})

describe('Employment page', function () {
  it('has working ui', function () {
    cy.setCookie('you-shall', 'not-pass') // allow direct access to pages via URL
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
    getError().should('have.length', 2)

    // Type to input
    typeToInput('r038', withEmploymentInput)

    next()
    getError().should('have.length', 1)

    typeToInput('r039', withEmploymentInput)

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
})
describe('Partner page', function () {
  it('has working ui', function () {
    cy.visit('/partner')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/zamestnanie')

    //  Go back to our page
    cy.visit('/partner')

    // Shows error, when presses next without interaction
    next()
    getError().should('have.length', 1)

    // When presses no, can continue to next page
    cy.get('[data-test=r032_uplatnujem_na_partnera-input-no]').click()
    next()
    assertUrl('/deti')
  })

  it('determines eligibility', function () {
    cy.visit('/partner')

    // When presses yes, additional fields appears
    cy.get('[data-test=r032_uplatnujem_na_partnera-input-yes]').click()
    getInput('r032_partner_vlastne_prijmy').should('exist')

    // Should show error if field is empty
    next()
    getError().should('have.length', 1)

    // Fill out input with incorrect value (too high), continue to see ineligible message
    typeToInput('r032_partner_vlastne_prijmy', {
      ...withPartnerInput,
      r032_partner_vlastne_prijmy: '4000',
    })
    next()
    cy.get('[data-test=inelligible-message]').should('exist')

    // Go back and change answer, continue to see more fields
    cy.get('button').contains('Späť').click()
    cy.get('[data-test=r032_partner_vlastne_prijmy-input]').clear()
    typeToInput('r032_partner_vlastne_prijmy', withPartnerInput)
    next()
    cy.get('[data-test=inelligible-message]').should('not.exist')
    getInput('partner_spolocna_domacnost', '-yes').should('exist')

    // Should show error if not filled in
    next()
    getError().should('have.length', 1)

    // Click radio, continue to see ineligible message
    cy.get('[data-test=partner_spolocna_domacnost-input-no]').click()
    next()
    cy.get('[data-test=inelligible-message]').should('exist')

    // Go back and change answer, continue to see more fields
    cy.get('button').contains('Späť').click()
    cy.get('[data-test=partner_spolocna_domacnost-input-yes]').click()
    next()
    cy.get('[data-test=inelligible-message]').should('not.exist')
    getInput('partner_bonus_uplatneny', '-yes').should('exist')

    // Click radio, continue to see ineligible message
    cy.get('[data-test=partner_bonus_uplatneny-input-yes]').click()
    next()
    cy.get('[data-test=inelligible-message]').should('exist')

    // Go back and change answer, continue to see more fields
    cy.get('button').contains('Späť').click()
    cy.get('[data-test=partner_bonus_uplatneny-input-no]').click()
    next()
    cy.get('[data-test=inelligible-message]').should('not.exist')
    cy.get('[data-test="partner_podmienky.1-input"]').should('exist')

    // Continue to see ineligible message
    next()
    cy.get('[data-test=inelligible-message]').should('exist')

    // Go back and change answer, continue to see more fields
    cy.get('button').contains('Späť').click()
    cy.get('[data-test="partner_podmienky.1-input"]').click()
    next()
    getInput('r031_priezvisko_a_meno').should('exist')
    getInput('r031_rodne_cislo').should('exist')
    getInput('r032_partner_pocet_mesiacov').should('exist')

    // Continue to see error
    next()
    getError().should('have.length', 3)

    // Fill out the form and continue to next page
    typeToInput('r031_priezvisko_a_meno', withPartnerInput)
    typeToInput('r031_rodne_cislo', withPartnerInput)
    typeToInput('r032_partner_pocet_mesiacov', withPartnerInput)
    next()
    assertUrl('/deti')
  })
})

describe('osobne-udaje page', function () {
  it('Back and next', function () {
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
  it('with autoform', function () {
    cy.visit('/osobne-udaje')

    /** With autoform */
    typeToInput('r001_dic', baseInput)
    typeToInput('r003_nace', baseInput)
    getInput('meno_priezvisko').type('Július Ret')

    cy.contains('Július Retzer').click()

    getInput('meno_priezvisko').should('contain.value', 'Július Retzer')
    getInput('r007_ulica').should('contain.value', 'Mierová')
    getInput('r008_cislo').should('contain.value', '4')
    getInput('r009_psc').should('contain.value', '821 05')
    getInput('r010_obec').should('contain.value', 'Bratislava')
    getInput('r011_stat').should('contain.value', 'Slovenská republika')

    next()
  })
  it('with NACE', function () {
    cy.visit('/osobne-udaje')

    /** With autoform */
    getInput('r003_nace').type('ryža')

    cy.contains('ryže').click({ force: true })

    getInput('r003_nace').should(
      'have.value',
      '01110 - Pestovanie obilnín (okrem ryže), strukovín a olejnatých semien',
    )
  })
  it('with posta api', function () {
    cy.visit('/osobne-udaje')

    typeToInput('r009_psc', baseInput)
    getInput('r010_obec').should('have.value', baseInput.r010_obec)
  })
  it('Manual entry', function () {
    cy.visit('/osobne-udaje')

    /** With autoform */
    typeToInput('r001_dic', baseInput)
    typeToInput('r003_nace', baseInput)
    typeToInput('meno_priezvisko', baseInput)
    typeToInput('r007_ulica', baseInput)
    typeToInput('r008_cislo', baseInput)
    typeToInput('r009_psc', baseInput)
    typeToInput('r010_obec', baseInput)
    typeToInput('r011_stat', baseInput)

    next()
  })
})

describe('Children page', function () {
  it('has working navigation', function () {
    cy.visit('/deti')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/partner')
  })
  it('has working validation for checkbox', function () {
    cy.visit('/deti')

    // Shows error, when presses next without interaction
    next()
    getError()
  })
  it('has working validation for child form', function () {
    cy.visit('/deti')

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
  it('has working ui for adding children', function () {
    cy.visit('/deti')

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
  it('has working validation for child form months', function () {
    cy.visit('/deti')

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

describe('Pension page', function () {
  it('has working ui', function () {
    cy.visit('/dochodok')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/deti')

    //  Go back to our page
    cy.visit('/dochodok')

    // Shows error, when presses next without interaction
    next()
    getError().should('have.length', 1)

    // When presses no, continues to next page
    cy.get('[data-test=platil_prispevky_na_dochodok-input-no]').click()
    next()
    assertUrl('/kupele')

    //  Go back to our page
    cy.visit('/dochodok')

    // When presses yes, additional fields appear
    cy.get('[data-test=platil_prispevky_na_dochodok-input-yes]').click()

    // All aditional fields should be required
    next()
    getError().should('have.length', 1)

    typeToInput('r075_zaplatene_prispevky_na_dochodok', withPensionInput)

    next()
    assertUrl('/kupele')
  })
})

describe('twoPercent page', function () {
  it('has working ui', function () {
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
    typeToInput('r142_ulica', with2percentInput)
    typeToInput('r142_cislo', with2percentInput)
    typeToInput('r142_psc', with2percentInput)
    typeToInput('r142_obec', with2percentInput)
    cy.get('[data-test="XIIoddiel_suhlasZaslUdaje-input"]').click()

    next()
    assertUrl('/osobne-udaje')
  })
  it('with autoform', function () {
    cy.visit('/dve-percenta')

    // When presses yes, additional fields appear
    cy.get('[data-test=XIIoddiel_uplatnujem2percenta-input-yes]').click()

    /** With autoform */
    getInput('r142_obchMeno').type('starter')

    cy.contains('starter, o.z.').click()

    getInput('r142_obchMeno').should('contain.value', 'starter, o.z.')
    getInput('r142_ico').should('contain.value', '50 825 909')
    getInput('r142_ulica').should('contain.value', 'Ševčenkova')
    getInput('r142_cislo').should('contain.value', '902/25')
    getInput('r142_psc').should('contain.value', '851 01')
    getInput('r142_obec').should('contain.value', 'Bratislava-Petržalka')
    cy.get('[data-test="XIIoddiel_suhlasZaslUdaje-input"]').click()

    next()
    assertUrl('/osobne-udaje')
  })
  it('works with no', function () {
    cy.visit('/dve-percenta')

    cy.get('[data-test=XIIoddiel_uplatnujem2percenta-input-no]').click()
    next()
    getError().should('have.length', 0)

    assertUrl('/osobne-udaje')
  })
})

describe('Spa page', function () {
  it('works with no', function () {
    cy.visit('/kupele')
    getInput('kupele', '-no').click()
    next()
    getError().should('have.length', 0)
    assertUrl('/dve-percenta')
  })
  it('Links and errors', function () {
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

  it('works with both partner and user', function () {
    cy.visit('/kupele')

    getInput('kupele', '-yes').click()

    // Type to input
    getInput('danovnikInSpa').click()
    getInput('r076a_kupele_danovnik')

    getInput('r033_partner_kupele').click()
    getInput('r033_partner_kupele_uhrady')
  })
  it('Spa UI', function () {
    cy.visit('/deti')

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
    getInput('r076a_kupele_danovnik')

    getInput('r033_partner_kupele').click()
    getInput('r033_partner_kupele_uhrady')

    getInput('childrenInSpa').click()
    getInput('r036_deti_kupele')
  })
})

describe('Feedback', function () {
  it('has working ui', function () {
    cy.visit('/')
    cy.get('[data-test=feedback]').click()

    cy.get('[data-test=whatWereYouDoing]').type('Cypress tests')
    cy.get('[data-test=whatWentWrong]').type('Testing the spam')
    cy.get('[data-test=submit]').click()
    /** Don't spam the mail */
    // cy.get('[data-test=submit]').click();
  })
})

describe('Results page', function () {
  it('has working navigation', function () {
    cy.visit('/vysledky')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/suhrn')

    //  Go back to our page
    cy.visit('/vysledky')
  })
  it('has working ui', function () {
    cy.visit('/vysledky')

    cy.get('h1').contains('Výpočet dane za rok')
    cy.get('h2').contains('Stručný prehľad')
  })
})

describe('Summary page', function () {
  it('has working navigation', function () {
    cy.visit('/suhrn')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/osobne-udaje')

    //  Go back to our page
    cy.visit('/vysledky')
  })
  it('has working ui', function () {
    cy.visit('/suhrn')

    cy.get('h1').contains('Súhrn a kontrola vyplnených údajov')
    cy.get('h2').contains('Príjmy a odvody do sociálnej poisťovne')
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
    it(`has working edit link to ${link}`, function () {
      cy.visit('/suhrn')
      cy.get('h2 > a').eq(index).click()
      assertUrl(link)

      // Back button should navigate back to summary page
      cy.get('[data-test=back]').click()
      cy.visit('/suhrn')
    })
  })
})

describe.skip('/odklad/osobne-udaje page', function () {
  beforeEach('Navigate to test page', function () {
    cy.visit('/')

    cy.contains('Odložiť daňové priznanie').click()
    assertUrl('/odklad/prijmy-zo-zahranicia')
    getInputPostpone('prijmy_zo_zahranicia', '-yes').click()

    next()
  })
  it('Back and validation', function () {
    assertUrl('/odklad/osobne-udaje')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/odklad/prijmy-zo-zahranicia')

    //  Go back to our page
    next()

    // Shows error, when presses next without interaction
    next()
    getError()
  })
  it('with autoform', function () {
    assertUrl('/odklad/osobne-udaje')

    /** With autoform */
    typeToInputPostpone('dic', foreignIncomeInput)
    getInputPostpone('meno_priezvisko').type('Július Ret')

    cy.contains('Július Retzer').click()

    getInputPostpone('meno_priezvisko').should('contain.value', 'Július Retzer')
    getInputPostpone('ulica').should('contain.value', 'Mierová')
    getInputPostpone('cislo').should('contain.value', '4')
    getInputPostpone('psc').should('contain.value', '821 05')
    getInputPostpone('obec').should('contain.value', 'Bratislava')
    getInputPostpone('stat').should('contain.value', 'Slovenská republika')
  })
  it('with posta api', function () {
    assertUrl('/odklad/osobne-udaje')

    typeToInputPostpone('psc', foreignIncomeInput)
    getInputPostpone('obec').should('have.value', foreignIncomeInput.obec)
  })
  it('Manual entry', function () {
    assertUrl('/odklad/osobne-udaje')

    typeToInputPostpone('dic', foreignIncomeInput)
    typeToInputPostpone('meno_priezvisko', foreignIncomeInput)
    typeToInputPostpone('ulica', foreignIncomeInput)
    typeToInputPostpone('cislo', foreignIncomeInput)
    typeToInputPostpone('obec', foreignIncomeInput)
    typeToInputPostpone('psc', foreignIncomeInput)
    typeToInputPostpone('stat', foreignIncomeInput)
  })
  it('Errors', function () {
    assertUrl('/odklad/osobne-udaje')

    getInputPostpone('dic').type('invalid')

    next()
    cy.get('.govuk-error-summary')
  })
})

describe.skip('/odklad/suhrn page', function () {
  beforeEach('Navigate to test page', function () {
    cy.visit('/')

    cy.contains('Odložiť daňové priznanie').click()
    assertUrl('/odklad/prijmy-zo-zahranicia')
    getInputPostpone('prijmy_zo_zahranicia', '-yes').click()

    next()

    typeToInputPostpone('dic', foreignIncomeInput)
    getInputPostpone('meno_priezvisko').type('Július Ret')

    cy.contains('Július Retzer').click()

    next()
  })
  it('Back', function () {
    assertUrl('/odklad/suhrn')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/odklad/osobne-udaje')
  })
  it('Email', function () {
    assertUrl('/odklad/suhrn')

    typeToInputPostpone('email', withEmailInput)
    getInputPostpone('newsletter').click()
    cy.get('[data-test=send-email]').click()
  })
})
