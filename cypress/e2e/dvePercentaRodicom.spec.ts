/// <reference types="cypress" />

import { with2percentInput } from '../../__tests__/testCases/with2percentInput'
import { Route } from '../../src/lib/routes'
import { UserInput } from '../../src/types/UserInput'

function getInput<K extends keyof UserInput>(key: K, suffix = '') {
  return cy.get(`[data-test="${key}-input${suffix}"]`)
}

const next = () => {
  return cy.contains('Pokračovať').click()
}

const getError = () => cy.get('[data-test=error]')
const assertUrl = (url: Route) => {
  cy.url().should('include', url)
}

const skipPage = () => {
  cy.get('.govuk-label').contains('Nie').click()
  next()
}

const navigateToIneligibleDvePercentaRodicomPage = () => {
  // Navigate through the flow with low income to be ineligible for 2%
  cy.visit('/prijmy-a-vydavky')
  getInput('prijem_zo_zivnosti', '-yes').click()
  getInput('t1r10_prijmy').type('100') // Very low income
  getInput('priloha3_r11_socialne').type('50')
  getInput('priloha3_r13_zdravotne').type('50')
  getInput('zaplatenePreddavky').type('0')
  next()

  assertUrl('/zamestnanie')
  skipPage()

  assertUrl('/dohoda')
  skipPage()

  assertUrl('/partner')
  skipPage()

  assertUrl('/deti')
  skipPage()

  assertUrl('/dochodok')
  skipPage()

  assertUrl('/prenajom')
  skipPage()

  assertUrl('/uroky')
  skipPage()

  assertUrl('/dve-percenta-rodicom')
}

const navigateToEligibleDvePercentaRodicomPage = () => {
  // Navigate through the flow with sufficient income to be eligible for 2%
  cy.visit('/prijmy-a-vydavky')
  getInput('prijem_zo_zivnosti', '-yes').click()
  getInput('t1r10_prijmy').type(with2percentInput.t1r10_prijmy)
  getInput('priloha3_r11_socialne').type(
    with2percentInput.priloha3_r11_socialne,
  )
  getInput('priloha3_r13_zdravotne').type(
    with2percentInput.priloha3_r13_zdravotne,
  )
  getInput('zaplatenePreddavky').type('0')
  next()

  assertUrl('/zamestnanie')
  skipPage()

  assertUrl('/dohoda')
  skipPage()

  assertUrl('/partner')
  skipPage()

  assertUrl('/deti')
  skipPage()

  assertUrl('/dochodok')
  skipPage()

  assertUrl('/prenajom')
  skipPage()

  assertUrl('/uroky')
  skipPage()

  assertUrl('/dve-percenta-rodicom')
}

beforeEach(() => {
  cy.setCookie('you-shall', 'not-pass') // allow direct access to pages via URL
})

describe('Dve percenta rodicom page', () => {
  it('has working navigation (back button)', () => {
    cy.visit('/dve-percenta-rodicom')

    // Back button should work and be the correct page
    cy.get('[data-test=back]').click()
    assertUrl('/uroky')
  })

  it('shows ineligible message when tax is too low', () => {
    navigateToIneligibleDvePercentaRodicomPage()

    // Should show ineligible message
    cy.get('[data-test=ineligible-message]').should('exist')

    // Should still be able to continue
    next()
    assertUrl('/dve-percenta')
  })

  it('shows error when no option is selected', () => {
    navigateToEligibleDvePercentaRodicomPage()

    // Should not show ineligible message when eligible
    cy.get('[data-test=ineligible-message]').should('not.exist')

    // Try to continue without selecting an option
    next()
    getError().should('have.length', 1)
  })

  it('allows selecting "Nie" and continuing', () => {
    navigateToEligibleDvePercentaRodicomPage()

    // Select "Nie" option
    cy.get('[data-test="dve_percenta_rodicom-input-nie"]').click()

    next()
    assertUrl('/dve-percenta')
  })

  describe('when selecting one parent (jednemu)', () => {
    it('shows parent A form fields', () => {
      navigateToEligibleDvePercentaRodicomPage()

      // Select "Áno, iba jednému rodičovi"
      cy.get('[data-test="dve_percenta_rodicom-input-jednemu"]').click()

      // Check that parent A fields are visible
      cy.get('[data-test="dve_percenta_rodicA.meno-input"]').should('exist')
      cy.get('[data-test="dve_percenta_rodicA.priezvisko-input"]').should(
        'exist',
      )
      cy.get('[data-test="dve_percenta_rodicA.rodneCislo-input"]').should(
        'exist',
      )

      // Parent B fields should NOT exist
      cy.get('[data-test="dve_percenta_rodicB.meno-input"]').should('not.exist')
    })

    it('shows validation errors for empty parent fields', () => {
      navigateToEligibleDvePercentaRodicomPage()

      cy.get('[data-test="dve_percenta_rodicom-input-jednemu"]').click()

      next()
      getError().should('have.length', 3)
    })

    it('shows validation error for invalid rodné číslo', () => {
      navigateToEligibleDvePercentaRodicomPage()

      cy.get('[data-test="dve_percenta_rodicom-input-jednemu"]').click()

      cy.get('[data-test="dve_percenta_rodicA.meno-input"]').type('Ján')
      cy.get('[data-test="dve_percenta_rodicA.priezvisko-input"]').type('Novák')
      cy.get('[data-test="dve_percenta_rodicA.rodneCislo-input"]').type(
        '123456789',
      )

      next()
      getError().should('have.length', 1)
      getError().contains('rodné číslo')
    })

    it('allows submitting with valid parent data', () => {
      navigateToEligibleDvePercentaRodicomPage()

      cy.get('[data-test="dve_percenta_rodicom-input-jednemu"]').click()

      cy.get('[data-test="dve_percenta_rodicA.meno-input"]').type('Ján')
      cy.get('[data-test="dve_percenta_rodicA.priezvisko-input"]').type('Novák')
      cy.get('[data-test="dve_percenta_rodicA.rodneCislo-input"]').type(
        '625412/2512',
      )

      next()
      assertUrl('/dve-percenta')
    })

    it('shows adoption checkbox with singular label', () => {
      navigateToEligibleDvePercentaRodicomPage()

      cy.get('[data-test="dve_percenta_rodicom-input-jednemu"]').click()

      // Check singular label for adoption checkbox
      cy.get(
        '[data-test="dve_percenta_rodicom_nahradna_starostlivost-input"]',
      ).should('exist')
      cy.contains('Bol/a som osvojený/á rodičom').should('exist')
    })

    it('shows adoption hint when checkbox is checked', () => {
      navigateToEligibleDvePercentaRodicomPage()

      cy.get('[data-test="dve_percenta_rodicom-input-jednemu"]').click()

      // Check adoption checkbox
      cy.get(
        '[data-test="dve_percenta_rodicom_nahradna_starostlivost-input"]',
      ).click()

      // Hint should appear
      cy.contains('doklad preukazujúci osvojenie').should('exist')
    })
  })

  describe('when selecting both parents (obidvom)', () => {
    it('shows both parent A and B form fields', () => {
      navigateToEligibleDvePercentaRodicomPage()

      // Select "Áno, obidvom rodičom"
      cy.get('[data-test="dve_percenta_rodicom-input-obidvom"]').click()

      // Check that parent A fields are visible
      cy.get('[data-test="dve_percenta_rodicA.meno-input"]').should('exist')
      cy.get('[data-test="dve_percenta_rodicA.priezvisko-input"]').should(
        'exist',
      )
      cy.get('[data-test="dve_percenta_rodicA.rodneCislo-input"]').should(
        'exist',
      )

      // Check that parent B fields are also visible
      cy.get('[data-test="dve_percenta_rodicB.meno-input"]').should('exist')
      cy.get('[data-test="dve_percenta_rodicB.priezvisko-input"]').should(
        'exist',
      )
      cy.get('[data-test="dve_percenta_rodicB.rodneCislo-input"]').should(
        'exist',
      )
    })

    it('shows validation errors for empty parent fields', () => {
      navigateToEligibleDvePercentaRodicomPage()

      cy.get('[data-test="dve_percenta_rodicom-input-obidvom"]').click()

      next()
      getError().should('have.length', 6) // 3 for parent A + 3 for parent B
    })

    it('allows submitting with valid data for both parents', () => {
      navigateToEligibleDvePercentaRodicomPage()

      cy.get('[data-test="dve_percenta_rodicom-input-obidvom"]').click()

      // Fill parent A
      cy.get('[data-test="dve_percenta_rodicA.meno-input"]').type('Ján')
      cy.get('[data-test="dve_percenta_rodicA.priezvisko-input"]').type('Novák')
      cy.get('[data-test="dve_percenta_rodicA.rodneCislo-input"]').type(
        '625412/2512',
      )

      // Fill parent B
      cy.get('[data-test="dve_percenta_rodicB.meno-input"]').type('Mária')
      cy.get('[data-test="dve_percenta_rodicB.priezvisko-input"]').type(
        'Nováková',
      )
      cy.get('[data-test="dve_percenta_rodicB.rodneCislo-input"]').type(
        '665412/2517',
      )

      next()
      assertUrl('/dve-percenta')
    })

    it('shows adoption checkbox with plural label', () => {
      navigateToEligibleDvePercentaRodicomPage()

      cy.get('[data-test="dve_percenta_rodicom-input-obidvom"]').click()

      // Check plural label for adoption checkbox
      cy.get(
        '[data-test="dve_percenta_rodicom_nahradna_starostlivost-input"]',
      ).should('exist')
      cy.contains('Bol/a som osvojený/á rodičmi').should('exist')
    })
  })

  describe('form state management', () => {
    it('clears parent data when switching from "obidvom" to "jednemu"', () => {
      navigateToEligibleDvePercentaRodicomPage()

      // Select "obidvom" and fill data
      cy.get('[data-test="dve_percenta_rodicom-input-obidvom"]').click()

      cy.get('[data-test="dve_percenta_rodicA.meno-input"]').type('Ján')
      cy.get('[data-test="dve_percenta_rodicB.meno-input"]').type('Mária')

      // Switch to "jednemu"
      cy.get('[data-test="dve_percenta_rodicom-input-jednemu"]').click()

      // Parent A should be cleared
      cy.get('[data-test="dve_percenta_rodicA.meno-input"]').should(
        'have.value',
        '',
      )

      // Parent B should not exist
      cy.get('[data-test="dve_percenta_rodicB.meno-input"]').should('not.exist')
    })

    it('hides parent forms when switching to "nie"', () => {
      navigateToEligibleDvePercentaRodicomPage()

      // Select "jednemu" and fill data
      cy.get('[data-test="dve_percenta_rodicom-input-jednemu"]').click()
      cy.get('[data-test="dve_percenta_rodicA.meno-input"]').type('Ján')

      // Switch to "nie"
      cy.get('[data-test="dve_percenta_rodicom-input-nie"]').click()

      // Parent fields should not exist
      cy.get('[data-test="dve_percenta_rodicA.meno-input"]').should('not.exist')
      cy.get('[data-test="dve_percenta_rodicB.meno-input"]').should('not.exist')
    })
  })
})
