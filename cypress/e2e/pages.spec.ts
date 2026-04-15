/// <reference types="cypress" />

import { withEmploymentInput } from '../../__tests__/testCases/withEmploymentInput'
import { withChildrenInput } from '../../__tests__/testCases/withChildrenInput'
import { baseInput } from '../../__tests__/testCases/baseInput'

import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'
import { Route, PostponeRoute, homeRoute } from '../../src/lib/routes'
import { withPensionInput } from '../../__tests__/testCases/withPensionInput'
import { withPartnerInput } from '../../__tests__/testCases/withPartnerInput'
import { withBonusInput } from '../../__tests__/testCases/withBonusInput'
import { UserInput } from '../../src/types/UserInput'
import {
  MAX_CHILD_AGE_BONUS,
  PARTNER_MAX_ODPOCET,
  TAX_YEAR,
  UROKY_POCET_ROKOV,
} from '../../src/lib/calculation'

function getInput<K extends keyof UserInput>(key: K, suffix = '') {
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

const next = () => {
  return cy.contains('Pokračovať').click()
}

const getError = () => cy.get('[data-test=error]')
const assertUrl = (url: Route | PostponeRoute) => {
  cy.url().should('include', url)
}

const skipPage = () => {
  cy.get('.govuk-label').contains('Nie').click()
  next()
}

const navigateEligibleToChildrenPage = () => {
  cy.visit('/prijmy-a-vydavky')
  getInput('prijem_zo_zivnosti', '-yes').click()
  typeToInput('t1r10_prijmy', {
    ...withChildrenInput,
    t1r10_prijmy: '3876',
  })
  typeToInput('priloha3_r11_socialne', withChildrenInput)
  typeToInput('priloha3_r13_zdravotne', withChildrenInput)
  getInput('zaplatenePreddavky').type('0')

  next()

  assertUrl('/zamestnanie')
  skipPage()

  assertUrl('/dohoda')
  skipPage()

  assertUrl('/partner')
  skipPage()
}

beforeEach(() => {
  cy.setCookie('you-shall', 'not-pass') // allow direct access to pages via URL
})

/** We don't use cookies for now */
describe.skip('Cookie consent', () => {
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

    // When presses yes, add-employer button appears
    cy.get('[data-test=employed-input-yes]').click()

    // Error when no employer added yet
    next()
    getError().should('have.length', 1)

    // Add an employer
    cy.get('[data-test="add-zamestnavatel"]').click()

    // Fill employer fields
    cy.get('[data-test="zamestnavatelia[0].prijmy-input"]').type(
      withEmploymentInput.uhrnPrijmovOdVsetkychZamestnavatelov!,
    )
    cy.get('[data-test="zamestnavatelia[0].socialnePoistne-input"]').type(
      withEmploymentInput.uhrnPovinnehoPoistnehoNaSocialnePoistenie!,
    )
    cy.get('[data-test="zamestnavatelia[0].zdravotnePoistne-input"]').type(
      withEmploymentInput.uhrnPovinnehoPoistnehoNaZdravotnePoistenie!,
    )
    cy.get('[data-test="zamestnavatelia[0].preddavkyNaDan-input"]').type('0')
    cy.get('[data-test="zamestnavatelia[0].danovyBonusNaDieta-input"]').type(
      '0',
    )

    // Save employer
    cy.get('[data-test="save-zamestnavatel"]').click()

    // When presses no, the employer section disappears
    cy.get('[data-test=employed-input-no]').click()
    cy.get('[data-test="add-zamestnavatel"]').should('not.exist')
    cy.get('[data-test="edit-zamestnavatel-0"]').should('not.exist')

    // When presses yes, employer list reappears
    cy.get('[data-test=employed-input-yes]').click()
    cy.get('[data-test="edit-zamestnavatel-0"]').should('exist')

    // Select no for add another and submit
    cy.get('#addAnother-no').click()
    next()
    assertUrl('/dohoda')
  })
  it('should erase previous answers when answer is changed to "no"', () => {
    cy.visit('/zamestnanie')

    // Add an employer and submit
    getInput('employed', '-yes').click()
    cy.get('[data-test="add-zamestnavatel"]').click()
    cy.get('[data-test="zamestnavatelia[0].prijmy-input"]').type(
      withEmploymentInput.uhrnPrijmovOdVsetkychZamestnavatelov!,
    )
    cy.get('[data-test="zamestnavatelia[0].socialnePoistne-input"]').type(
      withEmploymentInput.uhrnPovinnehoPoistnehoNaSocialnePoistenie!,
    )
    cy.get('[data-test="zamestnavatelia[0].zdravotnePoistne-input"]').type(
      withEmploymentInput.uhrnPovinnehoPoistnehoNaZdravotnePoistenie!,
    )
    cy.get('[data-test="zamestnavatelia[0].preddavkyNaDan-input"]').type('0')
    cy.get('[data-test="zamestnavatelia[0].danovyBonusNaDieta-input"]').type(
      '0',
    )
    cy.get('[data-test="save-zamestnavatel"]').click()
    cy.get('#addAnother-no').click()
    next()

    // go back
    assertUrl('/dohoda')
    cy.get('[data-test=back]').click()
    assertUrl('/zamestnanie')

    // employer should still be listed
    cy.get('[data-test="edit-zamestnavatel-0"]').should('exist')

    // form should hide when clicking no
    getInput('employed', '-no').click()
    cy.get('[data-test="add-zamestnavatel"]').should('not.exist')
    cy.get('[data-test="edit-zamestnavatel-0"]').should('not.exist')

    // form should display and preserve employer list when toggled back to yes
    getInput('employed', '-yes').click()
    cy.get('[data-test="edit-zamestnavatel-0"]').should('exist')

    // submit form with no (erase employers)
    getInput('employed', '-no').click()
    next()

    // go back
    assertUrl('/dohoda')
    cy.get('[data-test=back]').click()
    assertUrl('/zamestnanie')

    // clicking yes should show empty employer list (cleared by submitting with no)
    getInput('employed', '-yes').click()
    cy.get('[data-test="add-zamestnavatel"]').should('exist')
    cy.get('[data-test="edit-zamestnavatel-0"]').should('not.exist')
  })
})
describe('Partner page', () => {
  it('has working ui', () => {
    cy.visit('/partner')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/dohoda')

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

  it('determines eligibility', () => {
    cy.visit('/partner')

    // When presses yes, additional fields appears
    cy.get('[data-test=r032_uplatnujem_na_partnera-input-yes]').click()
    next()

    getInput('partner_spolocna_domacnost', '-yes').should('exist')

    // Should show error if not filled in
    next()
    getError().should('have.length', 1)

    // Click radio, continue to see ineligible message
    cy.get('[data-test=partner_spolocna_domacnost-input-no]').click()
    next()
    cy.get('[data-test=ineligible-message]').should('exist')

    // Go back and change answer, continue to see more fields
    cy.get('button').contains('Späť').click()
    cy.get('[data-test=partner_spolocna_domacnost-input-yes]').click()
    next()
    cy.get('[data-test=ineligible-message]').should('not.exist')

    cy.get('[data-test="partner_podmienky.1-input"]').should('exist')

    // Continue to see ineligible message
    next()
    cy.get('[data-test=ineligible-message]').should('exist')

    // Go back and change answer, continue to see more fields
    cy.get('button').contains('Späť').click()
    cy.get('[data-test="partner_podmienky.1-input"]').click()
    next()

    getInput('r032_partner_vlastne_prijmy').should('exist')

    // Should show error if field is empty
    next()
    getError().should('have.length', 1)

    // Fill out input with incorrect value (too high), continue to see ineligible message
    typeToInput('r032_partner_vlastne_prijmy', {
      ...withPartnerInput,
      r032_partner_vlastne_prijmy: PARTNER_MAX_ODPOCET.plus(1).toString(),
    })
    next()
    cy.get('[data-test=ineligible-message]').should('exist')

    // Go back and change answer, continue to see more fields
    cy.get('button').contains('Späť').click()
    cy.get('[data-test=r032_partner_vlastne_prijmy-input]').clear()
    typeToInput('r032_partner_vlastne_prijmy', withPartnerInput)
    next()
    cy.get('[data-test=ineligible-message]').should('not.exist')

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

  it('allows toggling condition checkboxes', () => {
    cy.visit('/partner')

    cy.get('[data-test=r032_uplatnujem_na_partnera-input-yes]').click()
    next()

    cy.get('[data-test=partner_spolocna_domacnost-input-yes]').click()
    next()

    // All condition checkboxes should be togglable
    for (let i = 1; i <= 5; i++) {
      const selector = `[data-test="partner_podmienky.${i}-input"]`

      // Check
      cy.get(selector).click()
      cy.get(selector).should('be.checked')

      // Uncheck
      cy.get(selector).click()
      cy.get(selector).should('not.be.checked')

      // Re-check after unchecking
      cy.get(selector).click()
      cy.get(selector).should('be.checked')

      // Uncheck again to reset for next iteration
      cy.get(selector).click()
      cy.get(selector).should('not.be.checked')
    }

    // Check one and proceed
    cy.get('[data-test="partner_podmienky.1-input"]').click()
    cy.get('[data-test="partner_podmienky.1-input"]').should('be.checked')

    // Should be able to proceed with checkbox checked
    next()
    getInput('r032_partner_vlastne_prijmy').should('exist')
  })
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
    getInput('r006_titul').should('contain.value', 'PhDr.')
    getInput('r006_titul_za').should('contain.value', 'PhD.')
    getInput('r004_priezvisko').should('contain.value', 'Urban')
    getInput('r005_meno').should('contain.value', 'Pavel')
    getInput('r007_ulica').should('contain.value', 'Clementisova')
    getInput('r008_cislo').should('contain.value', '1350/45')
    getInput('r009_psc').should('contain.value', '024 01')
    getInput('r010_obec').should('contain.value', 'Kysucké Nové Mesto')
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

  it('Manual entry', () => {
    cy.visit('/osobne-udaje')

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

describe('Children page', () => {
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
    getInput('partner_bonus_na_deti_chce_uplatnit', '-no').click()

    next()
    assertUrl('/dochodok')
  })
  it('has working ui for adding children', () => {
    cy.visit('/prijmy-a-vydavky')
    getInput('prijem_zo_zivnosti', '-yes').click()
    typeToInput('t1r10_prijmy', { ...withChildrenInput, t1r10_prijmy: '3876' })
    typeToInput('priloha3_r11_socialne', withChildrenInput)
    typeToInput('priloha3_r13_zdravotne', withChildrenInput)
    getInput('zaplatenePreddavky').type('0')

    next()

    assertUrl('/zamestnanie')
    getInput('employed', '-yes').click()
    cy.get('[data-test="add-zamestnavatel"]').click()
    cy.get('[data-test="zamestnavatelia[0].prijmy-input"]').type('3876')
    cy.get('[data-test="zamestnavatelia[0].socialnePoistne-input"]').type('600')
    cy.get('[data-test="zamestnavatelia[0].zdravotnePoistne-input"]').type(
      '400',
    )
    cy.get('[data-test="zamestnavatelia[0].preddavkyNaDan-input"]').type('0')
    cy.get('[data-test="zamestnavatelia[0].danovyBonusNaDieta-input"]').type(
      '0',
    )
    cy.get('[data-test="save-zamestnavatel"]').click()
    cy.get('#addAnother-no').click()
    next()

    assertUrl('/dohoda')
    skipPage()

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
    getInput('partner_bonus_na_deti_chce_uplatnit', '-no').click()
    next()
    assertUrl('/dochodok')
  })
  it('has working validation for child form months', () => {
    navigateEligibleToChildrenPage()
    assertUrl('/deti')

    // When presses yes, additional fields appears
    getInput('hasChildren', '-yes').click()

    cy.get('[data-test="children[0].rodneCislo-input"]').type('2107120015')
    cy.get(`[data-test="children[0]-bonus-interval-input-partyear"]`).click()

    // Enter invalid months (November - April)
    cy.get('[data-test="children[0].monthFrom-select"]').select('10')
    cy.get('[data-test="children[0].monthTo-select"]').select('3')

    // Try to add 2nd child
    next()

    // Should have error for invalid months
    getError().should('have.length', 2)

    // Enter valid months (November - April)
    cy.get('[data-test="children[0].monthFrom-select"]').select('3')
    cy.get('[data-test="children[0].monthTo-select"]').select('10')

    // Try to continue
    next()

    // Should not have error for invalid months
    getError().should('have.length', 1)
  })

  it('has working validation for too old kid', () => {
    navigateEligibleToChildrenPage()
    assertUrl('/deti')

    // When presses yes, additional fields appears
    getInput('hasChildren', '-yes').click()

    cy.get('[data-test="children[0].priezviskoMeno-input"]').type('John Doe')

    cy.get('[data-test="children[0].rodneCislo-input"]').type('9105010013')
    next()
    getError().contains(
      `Dieťa malo v roku ${TAX_YEAR} viac ako ${MAX_CHILD_AGE_BONUS} rokov.`,
    )
  })

  it('has working range limit for kid born in tax year', () => {
    navigateEligibleToChildrenPage()
    assertUrl('/deti')

    // When presses yes, additional fields appears
    getInput('hasChildren', '-yes').click()

    cy.get('[data-test="children[0].priezviskoMeno-input"]').type('John Doe')

    cy.get('[data-test="children[0].rodneCislo-input"]').type('2509076922')
    cy.contains(
      'Daňový bonus si môžete uplatniť v mesiacoch September až December',
    )
    cy.get('[data-test="children[0].monthFrom-select"]>option').should(
      'have.length',
      4,
    )
    cy.get('[data-test="children[0].monthTo-select"]>option').should(
      'have.length',
      4,
    )
  })

  it('has working range limit for kid bonus ending in tax year', () => {
    navigateEligibleToChildrenPage()
    assertUrl('/deti')

    // When presses yes, additional fields appears
    getInput('hasChildren', '-yes').click()

    cy.get('[data-test="children[0].priezviskoMeno-input"]').type('John Doe')

    cy.get('[data-test="children[0].rodneCislo-input"]').type('070907/4762')
    cy.contains(
      'Daňový bonus si môžete uplatniť v mesiacoch Január až September',
    )
    cy.get('[data-test="children[0].monthFrom-select"]>option').should(
      'have.length',
      9,
    )
    cy.get('[data-test="children[0].monthTo-select"]>option').should(
      'have.length',
      9,
    )
  })
})

describe('Pension page', () => {
  it('has working ui', () => {
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
    assertUrl('/prenajom')

    //  Go back to our page
    cy.visit('/dochodok')

    // When presses yes, additional fields appear
    cy.get('[data-test=platil_prispevky_na_dochodok-input-yes]').click()

    // All aditional fields should be required
    next()
    getError().should('have.length', 1)

    typeToInput('zaplatene_prispevky_na_dochodok', withPensionInput)

    next()
    assertUrl('/prenajom')
  })
})

describe('Uroky page', () => {
  it('has working ui', () => {
    cy.visit('/uroky')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/prenajom')

    //  Go back to our page
    cy.visit('/uroky')

    // Shows error, when presses next without interaction
    next()
    getError().should('have.length', 1)

    // When presses no, can continue to next page
    cy.get('[data-test=r035_uplatnuje_uroky-input-no]').click()
    next()
    assertUrl('/dve-percenta')
  })

  it('determines eligibility', () => {
    cy.visit('/uroky')

    // When presses yes, additional fields appears
    cy.get('[data-test=r035_uplatnuje_uroky-input-yes]').click()
    next()

    getInput('uroky_dalsi_uver_uplatnuje', '-yes').should('exist')

    // Should show error if not filled in
    next()
    getError().should('have.length', 1)

    // Click radio, continue to see ineligible message
    cy.get('[data-test=uroky_dalsi_uver_uplatnuje-input-yes]').click()
    next()
    cy.get('[data-test=ineligible-message]').should('exist')
    next()
    assertUrl('/dve-percenta')
    cy.get('[data-test=back]').click()

    // Go back and change answer, continue to see more fields
    cy.get('button').contains('Späť').click()
    cy.get('[data-test=uroky_dalsi_uver_uplatnuje-input-no]').click()
    next()
    cy.get('[data-test=ineligible-message]').should('not.exist')

    cy.get('[data-test="uroky_zmluva_rok_uzatvorenia-input"]').should('exist')
    cy.get('[data-test="uroky_zmluva_mesiac_uzatvorenia-input"]').should(
      'exist',
    )
    cy.get('[data-test="uroky_zmluva_den_uzatvorenia-input"]').should('exist')

    cy.get('[data-test="uroky_zaciatok_urocenia_den-input"]').should('exist')
    cy.get('[data-test="uroky_zaciatok_urocenia_mesiac-input"]').should('exist')
    cy.get('[data-test="uroky_zaciatok_urocenia_rok-input"]').should('exist')

    next()
    getError().should('have.length', 6)

    getInput('uroky_zmluva_rok_uzatvorenia').type(
      (TAX_YEAR - UROKY_POCET_ROKOV - 1).toString(),
    )
    getInput('uroky_zmluva_mesiac_uzatvorenia').type('1')
    getInput('uroky_zmluva_den_uzatvorenia').type('1')

    getInput('uroky_zaciatok_urocenia_den').type('1')
    getInput('uroky_zaciatok_urocenia_mesiac').type('2')
    getInput('uroky_zaciatok_urocenia_rok').type((TAX_YEAR - 2).toString())

    next()
    cy.get('[data-test=ineligible-message]').should('exist')

    next()
    assertUrl('/dve-percenta')
    cy.get('[data-test=back]').click()

    cy.get('button').contains('Späť').click()

    getInput('uroky_zmluva_rok_uzatvorenia')
      .clear()
      .type((TAX_YEAR - UROKY_POCET_ROKOV).toString())

    next()

    next()
    getError().should('have.length', 1)

    cy.get('[data-test=uroky_dalsi_dlznik-input-yes]').click()

    cy.get('[data-test="uroky_pocet_dlznikov-input"]').should('exist')

    getInput('uroky_pocet_dlznikov').type('2')

    next()

    next()

    getError().should('have.length', 1)

    cy.get('[data-test=uroky_splnam_vek_kriteria-input-no]').click()

    next()
    cy.get('[data-test=ineligible-message]').should('exist')
    next()
    assertUrl('/dve-percenta')
    cy.get('[data-test=back]').click()
    cy.get('button').contains('Späť').click()

    cy.get('[data-test=uroky_splnam_vek_kriteria-input-yes]').click()

    next()

    next()
    getError().should('have.length', 1)
    cy.get('[data-test=uroky_splnam_prijem-input-no]').click()
    next()
    cy.get('[data-test=ineligible-message]').should('exist')
    next()
    assertUrl('/dve-percenta')
    cy.get('[data-test=back]').click()
    cy.get('button').contains('Späť').click()
    cy.get('[data-test=uroky_splnam_prijem-input-yes]').click()
    next()

    next()
    getError().should('have.length', 1)

    getInput('r035_zaplatene_uroky').type('a')

    next()
    getError().should('have.length', 1)

    getInput('r035_zaplatene_uroky').clear().type('123.41')

    next()
    assertUrl('/dve-percenta')
  })
})

describe('Feedback', () => {
  it('has working ui', () => {
    cy.visit(homeRoute)
    cy.get('[data-test=feedback]').click()
    cy.get('[data-test=submit]').click()
    getError().should('have.length', 2)

    getInput('email').type('foo')
    cy.get('[data-test=submit]').click()
    getError().should('have.length', 3)

    getInput('whatWereYouDoing').type('Cypress tests')
    getInput('whatWentWrong').type('Testing the spam')
    cy.get('[data-test=submit]').click()
    getError().should('have.length', 1)
    getError().contains('email')
  })
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
    assertUrl('/pokracovat')
  })
  it('has working ui', () => {
    cy.visit('/vysledky')

    cy.get('h1').contains('Výpočet dane za rok')
  })
})

describe('IBAN page', () => {
  it('has working ui for ineligible applicants', () => {
    cy.visit('/iban')
    cy.get('[data-test=ineligible-message]').should('exist')
  })
  it('has working ui for eligible applicants', () => {
    // find exact numbers for 2023
    cy.visit('/prijmy-a-vydavky')
    getInput('prijem_zo_zivnosti', '-yes').click()
    typeToInput('t1r10_prijmy', { ...withBonusInput, t1r10_prijmy: '6500' })
    typeToInput('priloha3_r11_socialne', withBonusInput)
    typeToInput('priloha3_r13_zdravotne', withBonusInput)
    getInput('zaplatenePreddavky').type('0')

    next()

    assertUrl('/zamestnanie')
    skipPage()

    assertUrl('/dohoda')
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

    getInput('partner_bonus_na_deti_chce_uplatnit', '-no').click()

    next()

    assertUrl('/dochodok')
    skipPage()

    assertUrl('/prenajom')
    skipPage()

    assertUrl('/uroky')
    skipPage()

    assertUrl('/dve-percenta-rodicom')
    next()

    assertUrl('/dve-percenta')
    next()

    assertUrl('/osobne-udaje')
    typeToInput('r001_dic', withBonusInput)
    typeToInput('r003_nace', withBonusInput)
    typeToInput('r005_meno', withBonusInput)
    typeToInput('r004_priezvisko', withBonusInput)
    typeToInput('r007_ulica', withBonusInput)
    typeToInput('r008_cislo', withBonusInput)
    typeToInput('r009_psc', withBonusInput)
    getInput('r010_obec').clear() // clear value from PSC autocomplete via Posta API
    typeToInput('r010_obec', withBonusInput)
    typeToInput('r011_stat', withBonusInput)
    next()

    assertUrl('/suhrn')
    next()

    assertUrl('/iban')
    cy.get('[data-test=ineligible-message]').should('not.exist')
    next()

    getError().should('have.length', 1)

    getInput('ziadamVyplatitDanovyBonusUrokPreplatok', '-no').click()
    next()
    getError().should('have.length', 0)

    assertUrl('/vysledky')
    cy.get('.govuk-back-link').click()
    getError().should('have.length', 0)

    getInput('ziadamVyplatitDanovyBonusUrokPreplatok', '-yes').click()
    getInput('iban').should('exist')
    next()

    getError().should('have.length', 1)

    getInput('iban').type('SK6807200002891987426353')
    next()
    assertUrl('/vysledky')
  })
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

    getInput('meno_priezvisko').type('Ján Jan')
    cy.contains('Ján Janušík').click()
    getInput('meno_priezvisko').clear()
    getInput('meno_priezvisko').type('Jozef Mrkva') // write different name into search input
    next()

    assertUrl('/suhrn')
    cy.get('[data-test=r005_meno]').contains('Ján')
    cy.get('[data-test=r004_priezvisko]').contains('Janušík')
  })
  ;[
    '/prijmy-a-vydavky',
    '/zamestnanie',
    '/dohoda',
    '/partner',
    '/deti',
    '/deti',
    '/dochodok',
    '/uroky',
    '/prenajom',
    '/dve-percenta-rodicom',
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
