/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { with2percentInput } from '../../__tests__/testCases/with2percentInput'

import { homeRoute } from '../../src/lib/routes'
import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'
import { UserInput } from '../../src/types/UserInput'
import path from 'path'
import { assertUrl, formSuccessful } from './executeCase'

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

beforeEach(() => {
  cy.setCookie('you-shall', 'not-pass') // allow direct access to pages via URL
  // Ignore uncaught exceptions in the 3rd party form code
  cy.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress
    // inside the cy.origin() method from failing the test
    return false
  })
})

describe('twoPercent page', () => {
  it('has working ui', (done) => {
    const input = with2percentInput

    cy.visit(homeRoute)

    cy.contains('Súhlasím a chcem pripraviť daňové priznanie').click()

    /**  SECTION Prijmy a vydavky */
    getInput('t1r10_prijmy').type(input.t1r10_prijmy)
    getInput('priloha3_r11_socialne').type(input.priloha3_r11_socialne)
    getInput('priloha3_r13_zdravotne').type(input.priloha3_r13_zdravotne)
    getInput('zaplatenePreddavky').type(
      input.zaplatenePreddavky ? input.zaplatenePreddavky : '0',
    )

    next()

    /**  SECTION Zamestnanie */
    if (input.employed) {
      getInput('employed', '-yes').click()
      typeToInput('uhrnPrijmovOdVsetkychZamestnavatelov', input)
      typeToInput('uhrnPovinnehoPoistnehoNaSocialnePoistenie', input)
      typeToInput('uhrnPovinnehoPoistnehoNaZdravotnePoistenie', input)
      typeToInput('uhrnPreddavkovNaDan', input)
      typeToInput('udajeODanovomBonuseNaDieta', input)
    } else {
      getInput('employed', '-no').click()
    }

    next()

    /**  SECTION Dohoda */
    assertUrl('/dohoda')

    if (input.dohoda) {
      getInput('dohoda', '-yes').click()
      typeToInput('uhrnPrijmovZoVsetkychDohod', input)
      typeToInput('uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody', input)
      typeToInput('uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody', input)
      typeToInput('uhrnPreddavkovNaDanDohody', input)
      typeToInput('udajeODanovomBonuseNaDietaDohody', input)
    } else {
      getInput('dohoda', '-no').click()
    }

    next()

    /**  SECTION Partner */
    if (input.r032_uplatnujem_na_partnera) {
      getInput('r032_uplatnujem_na_partnera', '-yes').click()
      next()
      cy.get('[data-test=partner_spolocna_domacnost-input-yes]').click()
      next()
      cy.get('[data-test="partner_podmienky.1-input"]').click()
      next()
      typeToInput('r032_partner_vlastne_prijmy', input)
      next()
      typeToInput('r031_priezvisko_a_meno', input)
      typeToInput('r031_rodne_cislo', input)
      typeToInput('r032_partner_pocet_mesiacov', input)
    } else {
      getInput('r032_uplatnujem_na_partnera', '-no').click()
    }

    next()

    /**  SECTION Kids */
    if (input.hasChildren) {
      getInput('hasChildren', '-yes').click()

      input.children.forEach((child, index) => {
        cy.get(`[data-test="children[${index}].priezviskoMeno-input"]`).type(
          child.priezviskoMeno,
        )
        cy.get(`[data-test="children[${index}].rodneCislo-input"]`).type(
          child.rodneCislo,
        )

        if (child.wholeYear) {
          cy.get(
            `[data-test="children[${index}]-bonus-interval-input-wholeyear"]`,
          ).click()
        } else {
          cy.get(
            `[data-test="children[${index}]-bonus-interval-input-partyear"]`,
          ).click()
          cy.get(`[data-test="children[${index}].monthFrom-select"]`).select(
            child.monthFrom,
          )
          cy.get(`[data-test="children[${index}].monthTo-select"]`).select(
            child.monthTo,
          )
        }

        if (index + 1 < input.children.length) {
          cy.get('[data-test="add-child"]').click()
        }
      })
    } else {
      getInput('hasChildren', '-no').click()
    }

    next()

    /**  SECTION Dochodok */
    if (input.platil_prispevky_na_dochodok) {
      getInput('platil_prispevky_na_dochodok', '-yes').click()
      typeToInput('zaplatene_prispevky_na_dochodok', input)
    } else {
      getInput('platil_prispevky_na_dochodok', '-no').click()
    }

    next()

    /* SECTION Prenajom */
    getInput('rent', '-no').click()

    next()

    /* SECTION Uroky */
    getInput('r035_uplatnuje_uroky', '-no').click()

    next()

    // Shows error, when presses next without interaction
    next()
    getError().should('have.length', 1)

    // When presses yes, additional fields appear
    cy.get('[data-test=dve_percenta_podporujem-inu-input]').click()

    // All aditional fields should be required
    next()
    getError().should('have.length', 2)

    // Type to input
    getInput('r142_obchMeno').type(
      'Domka - Združenie saleziánskej mládeže, stredisko Banská Bystrica',
    )
    getInput('r142_ico').type('35983558')
    cy.get('[data-test="XIIoddiel_suhlasZaslUdaje-input"]').click()

    next()

    /**  SECTION Osobne udaje */

    typeToInput('r001_dic', input)

    const naceNumber = input.r003_nace.match(/^(\d+)/)
    if (naceNumber) {
      getInput('r003_nace').type(naceNumber[1])
      cy.contains(input.r003_nace).click()
    } else {
      typeToInput('r003_nace', input)
    }

    typeToInput('r005_meno', input)
    if (input.r006_titul) {
      getInput('r006_titul').type(input.r006_titul)
      getInput('r006_titul_za').type(input.r006_titul_za)
    }
    typeToInput('r004_priezvisko', input)
    typeToInput('r007_ulica', input)
    typeToInput('r008_cislo', input)
    typeToInput('r009_psc', input)
    typeToInput('r010_obec', input)
    typeToInput('r011_stat', input)

    next()
    assertUrl('/suhrn')
    next()
    assertUrl('/vysledky')
    next()

    cy.get('[data-test="debug-download"]').click()

    const downloadsFolder = Cypress.config('downloadsFolder')
    const filePath = path.join(downloadsFolder, 'file.xml')

    /**  Validate our results with the FS form */
    cy.visit('/form/form.601.html')

    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get('#form-button-load').click()
    cy.get('#form-buttons-load-dialog > input').selectFile(filePath)

    cy.get('#form-buttons-load-dialog-confirm > .ui-button-text').click()
    cy.get('#cmbDic1').should('have.value', input.r001_dic) // validate the form has laoded by checking DIC value
    cy.get('#tbico152').should('have.value', '35983558')
    cy.get('#tbObchMeno152').should(
      'have.value',
      'Domka - Združenie saleziánskej mládeže, stredisko Banská Bystrica',
    )
    cy.get('#form-button-validate').click().should(formSuccessful(stub))
    cy.get('#errorsContainer')
      .should((el) => expect(el.text()).to.be.empty)
      .then(() => done())
  })
  it.only('with autoform', (done) => {
    const input = with2percentInput

    cy.visit(homeRoute)

    cy.contains('Súhlasím a chcem pripraviť daňové priznanie').click()

    /**  SECTION Prijmy a vydavky */
    getInput('t1r10_prijmy').type(input.t1r10_prijmy)
    getInput('priloha3_r11_socialne').type(input.priloha3_r11_socialne)
    getInput('priloha3_r13_zdravotne').type(input.priloha3_r13_zdravotne)
    getInput('zaplatenePreddavky').type(
      input.zaplatenePreddavky ? input.zaplatenePreddavky : '0',
    )

    next()

    /**  SECTION Zamestnanie */
    if (input.employed) {
      getInput('employed', '-yes').click()
      typeToInput('uhrnPrijmovOdVsetkychZamestnavatelov', input)
      typeToInput('uhrnPovinnehoPoistnehoNaSocialnePoistenie', input)
      typeToInput('uhrnPovinnehoPoistnehoNaZdravotnePoistenie', input)
      typeToInput('uhrnPreddavkovNaDan', input)
      typeToInput('udajeODanovomBonuseNaDieta', input)
    } else {
      getInput('employed', '-no').click()
    }

    next()

    /**  SECTION Dohoda */
    assertUrl('/dohoda')

    if (input.dohoda) {
      getInput('dohoda', '-yes').click()
      typeToInput('uhrnPrijmovZoVsetkychDohod', input)
      typeToInput('uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody', input)
      typeToInput('uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody', input)
      typeToInput('uhrnPreddavkovNaDanDohody', input)
      typeToInput('udajeODanovomBonuseNaDietaDohody', input)
    } else {
      getInput('dohoda', '-no').click()
    }

    next()

    /**  SECTION Partner */
    if (input.r032_uplatnujem_na_partnera) {
      getInput('r032_uplatnujem_na_partnera', '-yes').click()
      next()
      cy.get('[data-test=partner_spolocna_domacnost-input-yes]').click()
      next()
      cy.get('[data-test="partner_podmienky.1-input"]').click()
      next()
      typeToInput('r032_partner_vlastne_prijmy', input)
      next()
      typeToInput('r031_priezvisko_a_meno', input)
      typeToInput('r031_rodne_cislo', input)
      typeToInput('r032_partner_pocet_mesiacov', input)
    } else {
      getInput('r032_uplatnujem_na_partnera', '-no').click()
    }

    next()

    /**  SECTION Kids */
    if (input.hasChildren) {
      getInput('hasChildren', '-yes').click()

      input.children.forEach((child, index) => {
        cy.get(`[data-test="children[${index}].priezviskoMeno-input"]`).type(
          child.priezviskoMeno,
        )
        cy.get(`[data-test="children[${index}].rodneCislo-input"]`).type(
          child.rodneCislo,
        )

        if (child.wholeYear) {
          cy.get(
            `[data-test="children[${index}]-bonus-interval-input-wholeyear"]`,
          ).click()
        } else {
          cy.get(
            `[data-test="children[${index}]-bonus-interval-input-partyear"]`,
          ).click()
          cy.get(`[data-test="children[${index}].monthFrom-select"]`).select(
            child.monthFrom,
          )
          cy.get(`[data-test="children[${index}].monthTo-select"]`).select(
            child.monthTo,
          )
        }

        if (index + 1 < input.children.length) {
          cy.get('[data-test="add-child"]').click()
        }
      })
    } else {
      getInput('hasChildren', '-no').click()
    }

    next()

    /**  SECTION Dochodok */
    if (input.platil_prispevky_na_dochodok) {
      getInput('platil_prispevky_na_dochodok', '-yes').click()
      typeToInput('zaplatene_prispevky_na_dochodok', input)
    } else {
      getInput('platil_prispevky_na_dochodok', '-no').click()
    }

    next()

    /* SECTION Prenajom */
    getInput('rent', '-no').click()

    next()

    /* SECTION Uroky */
    getInput('r035_uplatnuje_uroky', '-no').click()

    next()

    // When presses yes, additional fields appear
    cy.get('[data-test=dve_percenta_podporujem-inu-input]').click()

    /** With autoform */
    getInput('r142_obchMeno').type('Lifestarter')

    cy.contains('Lifestarter, Trnava').click()

    getInput('r142_obchMeno').should('contain.value', 'Lifestarter')
    getInput('r142_ico').should('contain.value', '50718274')
    cy.get('[data-test="XIIoddiel_suhlasZaslUdaje-input"]').click()

    next()

    /**  SECTION Osobne udaje */

    typeToInput('r001_dic', input)

    const naceNumber = input.r003_nace.match(/^(\d+)/)
    if (naceNumber) {
      getInput('r003_nace').type(naceNumber[1])
      cy.contains(input.r003_nace).click()
    } else {
      typeToInput('r003_nace', input)
    }

    typeToInput('r005_meno', input)
    if (input.r006_titul) {
      getInput('r006_titul').type(input.r006_titul)
      getInput('r006_titul_za').type(input.r006_titul_za)
    }
    typeToInput('r004_priezvisko', input)
    typeToInput('r007_ulica', input)
    typeToInput('r008_cislo', input)
    typeToInput('r009_psc', input)
    typeToInput('r010_obec', input)
    typeToInput('r011_stat', input)

    next()
    assertUrl('/suhrn')
    next()
    assertUrl('/vysledky')
    next()

    cy.get('[data-test="debug-download"]').click()

    const downloadsFolder = Cypress.config('downloadsFolder')
    const filePath = path.join(downloadsFolder, 'file.xml')

    /**  Validate our results with the FS form */
    cy.visit('/form/form.601.html')

    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get('#form-button-load').click()
    cy.get('#form-buttons-load-dialog > input').selectFile(filePath)

    cy.get('#form-buttons-load-dialog-confirm > .ui-button-text').click()
    cy.get('#cmbDic1').should('have.value', input.r001_dic) // validate the form has laoded by checking DIC value
    cy.get('#tbico152').should('have.value', '50718274')
    cy.get('#tbObchMeno152').should('have.value', 'Lifestarter')
    cy.get('#form-button-validate').click().should(formSuccessful(stub))
    cy.get('#errorsContainer')
      .should((el) => expect(el.text()).to.be.empty)
      .then(() => done())
  })
  it('works with no', () => {
    const input = with2percentInput

    cy.visit(homeRoute)

    cy.contains('Súhlasím a chcem pripraviť daňové priznanie').click()

    /**  SECTION Prijmy a vydavky */
    getInput('t1r10_prijmy').type(input.t1r10_prijmy)
    getInput('priloha3_r11_socialne').type(input.priloha3_r11_socialne)
    getInput('priloha3_r13_zdravotne').type(input.priloha3_r13_zdravotne)
    getInput('zaplatenePreddavky').type(
      input.zaplatenePreddavky ? input.zaplatenePreddavky : '0',
    )

    next()

    /**  SECTION Zamestnanie */
    if (input.employed) {
      getInput('employed', '-yes').click()
      typeToInput('uhrnPrijmovOdVsetkychZamestnavatelov', input)
      typeToInput('uhrnPovinnehoPoistnehoNaSocialnePoistenie', input)
      typeToInput('uhrnPovinnehoPoistnehoNaZdravotnePoistenie', input)
      typeToInput('uhrnPreddavkovNaDan', input)
      typeToInput('udajeODanovomBonuseNaDieta', input)
    } else {
      getInput('employed', '-no').click()
    }

    next()

    /**  SECTION Dohoda */
    assertUrl('/dohoda')

    if (input.dohoda) {
      getInput('dohoda', '-yes').click()
      typeToInput('uhrnPrijmovZoVsetkychDohod', input)
      typeToInput('uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody', input)
      typeToInput('uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody', input)
      typeToInput('uhrnPreddavkovNaDanDohody', input)
      typeToInput('udajeODanovomBonuseNaDietaDohody', input)
    } else {
      getInput('dohoda', '-no').click()
    }

    next()

    /**  SECTION Partner */
    if (input.r032_uplatnujem_na_partnera) {
      getInput('r032_uplatnujem_na_partnera', '-yes').click()
      next()
      cy.get('[data-test=partner_spolocna_domacnost-input-yes]').click()
      next()
      cy.get('[data-test="partner_podmienky.1-input"]').click()
      next()
      typeToInput('r032_partner_vlastne_prijmy', input)
      next()
      typeToInput('r031_priezvisko_a_meno', input)
      typeToInput('r031_rodne_cislo', input)
      typeToInput('r032_partner_pocet_mesiacov', input)
    } else {
      getInput('r032_uplatnujem_na_partnera', '-no').click()
    }

    next()

    /**  SECTION Kids */
    if (input.hasChildren) {
      getInput('hasChildren', '-yes').click()

      input.children.forEach((child, index) => {
        cy.get(`[data-test="children[${index}].priezviskoMeno-input"]`).type(
          child.priezviskoMeno,
        )
        cy.get(`[data-test="children[${index}].rodneCislo-input"]`).type(
          child.rodneCislo,
        )

        if (child.wholeYear) {
          cy.get(
            `[data-test="children[${index}]-bonus-interval-input-wholeyear"]`,
          ).click()
        } else {
          cy.get(
            `[data-test="children[${index}]-bonus-interval-input-partyear"]`,
          ).click()
          cy.get(`[data-test="children[${index}].monthFrom-select"]`).select(
            child.monthFrom,
          )
          cy.get(`[data-test="children[${index}].monthTo-select"]`).select(
            child.monthTo,
          )
        }

        if (index + 1 < input.children.length) {
          cy.get('[data-test="add-child"]').click()
        }
      })
    } else {
      getInput('hasChildren', '-no').click()
    }

    next()

    /**  SECTION Dochodok */
    if (input.platil_prispevky_na_dochodok) {
      getInput('platil_prispevky_na_dochodok', '-yes').click()
      typeToInput('zaplatene_prispevky_na_dochodok', input)
    } else {
      getInput('platil_prispevky_na_dochodok', '-no').click()
    }

    next()

    /* SECTION Prenajom */
    getInput('rent', '-no').click()

    next()

    /* SECTION Uroky */
    getInput('r035_uplatnuje_uroky', '-no').click()

    next()

    cy.get('[data-test=dve_percenta_podporujem-input-no]').click()
    next()
    getError().should('have.length', 0)
  })
  it('works with Slovensko.Digital pre-fill', (done) => {
    const input = with2percentInput

    cy.visit(homeRoute)

    cy.contains('Súhlasím a chcem pripraviť daňové priznanie').click()

    /**  SECTION Prijmy a vydavky */
    getInput('t1r10_prijmy').type(input.t1r10_prijmy)
    getInput('priloha3_r11_socialne').type(input.priloha3_r11_socialne)
    getInput('priloha3_r13_zdravotne').type(input.priloha3_r13_zdravotne)
    getInput('zaplatenePreddavky').type(
      input.zaplatenePreddavky ? input.zaplatenePreddavky : '0',
    )

    next()

    /**  SECTION Zamestnanie */
    if (input.employed) {
      getInput('employed', '-yes').click()
      typeToInput('uhrnPrijmovOdVsetkychZamestnavatelov', input)
      typeToInput('uhrnPovinnehoPoistnehoNaSocialnePoistenie', input)
      typeToInput('uhrnPovinnehoPoistnehoNaZdravotnePoistenie', input)
      typeToInput('uhrnPreddavkovNaDan', input)
      typeToInput('udajeODanovomBonuseNaDieta', input)
    } else {
      getInput('employed', '-no').click()
    }

    next()

    /**  SECTION Dohoda */
    assertUrl('/dohoda')

    if (input.dohoda) {
      getInput('dohoda', '-yes').click()
      typeToInput('uhrnPrijmovZoVsetkychDohod', input)
      typeToInput('uhrnPovinnehoPoistnehoNaSocialnePoistenieDohody', input)
      typeToInput('uhrnPovinnehoPoistnehoNaZdravotnePoistenieDohody', input)
      typeToInput('uhrnPreddavkovNaDanDohody', input)
      typeToInput('udajeODanovomBonuseNaDietaDohody', input)
    } else {
      getInput('dohoda', '-no').click()
    }

    next()

    /**  SECTION Partner */
    if (input.r032_uplatnujem_na_partnera) {
      getInput('r032_uplatnujem_na_partnera', '-yes').click()
      next()
      cy.get('[data-test=partner_spolocna_domacnost-input-yes]').click()
      next()
      cy.get('[data-test="partner_podmienky.1-input"]').click()
      next()
      typeToInput('r032_partner_vlastne_prijmy', input)
      next()
      typeToInput('r031_priezvisko_a_meno', input)
      typeToInput('r031_rodne_cislo', input)
      typeToInput('r032_partner_pocet_mesiacov', input)
    } else {
      getInput('r032_uplatnujem_na_partnera', '-no').click()
    }

    next()

    /**  SECTION Kids */
    if (input.hasChildren) {
      getInput('hasChildren', '-yes').click()

      input.children.forEach((child, index) => {
        cy.get(`[data-test="children[${index}].priezviskoMeno-input"]`).type(
          child.priezviskoMeno,
        )
        cy.get(`[data-test="children[${index}].rodneCislo-input"]`).type(
          child.rodneCislo,
        )

        if (child.wholeYear) {
          cy.get(
            `[data-test="children[${index}]-bonus-interval-input-wholeyear"]`,
          ).click()
        } else {
          cy.get(
            `[data-test="children[${index}]-bonus-interval-input-partyear"]`,
          ).click()
          cy.get(`[data-test="children[${index}].monthFrom-select"]`).select(
            child.monthFrom,
          )
          cy.get(`[data-test="children[${index}].monthTo-select"]`).select(
            child.monthTo,
          )
        }

        if (index + 1 < input.children.length) {
          cy.get('[data-test="add-child"]').click()
        }
      })
    } else {
      getInput('hasChildren', '-no').click()
    }

    next()

    /**  SECTION Dochodok */
    if (input.platil_prispevky_na_dochodok) {
      getInput('platil_prispevky_na_dochodok', '-yes').click()
      typeToInput('zaplatene_prispevky_na_dochodok', input)
    } else {
      getInput('platil_prispevky_na_dochodok', '-no').click()
    }

    next()

    /* SECTION Prenajom */
    getInput('rent', '-no').click()

    next()

    /* SECTION Uroky */
    getInput('r035_uplatnuje_uroky', '-no').click()

    next()

    cy.get('[data-test=dve_percenta_podporujem-sk-digital-input]').click()

    next()

    /**  SECTION Osobne udaje */

    typeToInput('r001_dic', input)

    const naceNumber = input.r003_nace.match(/^(\d+)/)
    if (naceNumber) {
      getInput('r003_nace').type(naceNumber[1])
      cy.contains(input.r003_nace).click()
    } else {
      typeToInput('r003_nace', input)
    }

    typeToInput('r005_meno', input)
    if (input.r006_titul) {
      getInput('r006_titul').type(input.r006_titul)
      getInput('r006_titul_za').type(input.r006_titul_za)
    }
    typeToInput('r004_priezvisko', input)
    typeToInput('r007_ulica', input)
    typeToInput('r008_cislo', input)
    typeToInput('r009_psc', input)
    typeToInput('r010_obec', input)
    typeToInput('r011_stat', input)

    next()
    assertUrl('/suhrn')
    next()
    assertUrl('/vysledky')
    next()

    cy.get('[data-test="debug-download"]').click()

    const downloadsFolder = Cypress.config('downloadsFolder')
    const filePath = path.join(downloadsFolder, 'file.xml')

    /**  Validate our results with the FS form */
    cy.visit('/form/form.601.html')

    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get('#form-button-load').click()
    cy.get('#form-buttons-load-dialog > input').selectFile(filePath)

    cy.get('#form-buttons-load-dialog-confirm > .ui-button-text').click()
    cy.get('#cmbDic1').should('have.value', input.r001_dic) // validate the form has laoded by checking DIC value
    cy.get('#tbico152').should('have.value', '50158635')
    cy.get('#tbObchMeno152').should('have.value', 'Slovensko.Digital')
    cy.get('#form-button-validate').click().should(formSuccessful(stub))
    cy.get('#errorsContainer')
      .should((el) => expect(el.text()).to.be.empty)
      .then(() => done())
  })
})
