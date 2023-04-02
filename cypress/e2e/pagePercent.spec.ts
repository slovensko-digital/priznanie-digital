/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { with2percentInput } from '../../__tests__/testCases/with2percentInput'

import { homeRoute } from '../../src/lib/routes'
import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'
import { UserInput } from '../../src/types/UserInput'

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

// beforeEach(() => {
//   cy.setCookie('you-shall', 'not-pass') // allow direct access to pages via URL
// })

describe('twoPercent page', () => {
  it('has working ui', () => {
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

    /**  SECTION Partner */
    if (input.r032_uplatnujem_na_partnera) {
      getInput('r032_uplatnujem_na_partnera', '-yes').click()
      next()
      cy.get('[data-test=partner_spolocna_domacnost-input-yes]').click()
      next()
      cy.get('[data-test=partner_bonus_uplatneny-input-no]').click()
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
      if (input.prijmyPredJul22) {
        getInput('prijmyPredJul22', '-yes').click()
      } else {
        getInput('prijmyPredJul22', '-no').click()
        typeToInput('zaciatokPrijmovDen', input)
        typeToInput('zaciatokPrijmovMesiac', input)
      }
      
      input.children.forEach((child, index) => {
        cy.get(
          `[data-test="children[${index}].priezviskoMeno-input"]`,
        ).type(child.priezviskoMeno)
        cy.get(`[data-test="children[${index}].rodneCislo-input"]`).type(
          child.rodneCislo,
        )

        if (child.wholeYear) {
          cy.get(`[data-test="children[${index}]-bonus-interval-input-wholeyear"]`).click()
        } else {
          cy.get(`[data-test="children[${index}]-bonus-interval-input-partyear"]`).click()
          cy.get(
            `[data-test="children[${index}].monthFrom-select"]`,
          ).select(child.monthFrom)
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

    // Shows error, when presses next without interaction
    next()
    getError().should('have.length', 1)

    // Must have imported data to show checkbox!!!!! //

    // When presses yes, additional fields appear
    cy.get('[data-test=XIIoddiel_uplatnujem2percenta-input-yes]').click()

    // All aditional fields should be required
    next()
    getError().should('have.length', 2)

    // Type to input
    typeToInput('r142_obchMeno', with2percentInput)
    typeToInput('r142_ico', with2percentInput)
    cy.get('[data-test="XIIoddiel_suhlasZaslUdaje-input"]').click()

    next()
  })
  it('with autoform', () => {
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

    /**  SECTION Partner */
    if (input.r032_uplatnujem_na_partnera) {
      getInput('r032_uplatnujem_na_partnera', '-yes').click()
      next()
      cy.get('[data-test=partner_spolocna_domacnost-input-yes]').click()
      next()
      cy.get('[data-test=partner_bonus_uplatneny-input-no]').click()
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
      if (input.prijmyPredJul22) {
        getInput('prijmyPredJul22', '-yes').click()
      } else {
        getInput('prijmyPredJul22', '-no').click()
        typeToInput('zaciatokPrijmovDen', input)
        typeToInput('zaciatokPrijmovMesiac', input)
      }
      
      input.children.forEach((child, index) => {
        cy.get(
          `[data-test="children[${index}].priezviskoMeno-input"]`,
        ).type(child.priezviskoMeno)
        cy.get(`[data-test="children[${index}].rodneCislo-input"]`).type(
          child.rodneCislo,
        )

        if (child.wholeYear) {
          cy.get(`[data-test="children[${index}]-bonus-interval-input-wholeyear"]`).click()
        } else {
          cy.get(`[data-test="children[${index}]-bonus-interval-input-partyear"]`).click()
          cy.get(
            `[data-test="children[${index}].monthFrom-select"]`,
          ).select(child.monthFrom)
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

    // When presses yes, additional fields appear
    cy.get('[data-test=XIIoddiel_uplatnujem2percenta-input-yes]').click()

    /** With autoform */
    getInput('r142_obchMeno').type('Lifestarter')

    cy.contains('Lifestarter, Trnava').click()

    getInput('r142_obchMeno').should('contain.value', 'Lifestarter')
    getInput('r142_ico').should('contain.value', '50718274')
    cy.get('[data-test="XIIoddiel_suhlasZaslUdaje-input"]').click()

    next()
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

    /**  SECTION Partner */
    if (input.r032_uplatnujem_na_partnera) {
      getInput('r032_uplatnujem_na_partnera', '-yes').click()
      next()
      cy.get('[data-test=partner_spolocna_domacnost-input-yes]').click()
      next()
      cy.get('[data-test=partner_bonus_uplatneny-input-no]').click()
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
      if (input.prijmyPredJul22) {
        getInput('prijmyPredJul22', '-yes').click()
      } else {
        getInput('prijmyPredJul22', '-no').click()
        typeToInput('zaciatokPrijmovDen', input)
        typeToInput('zaciatokPrijmovMesiac', input)
      }
      
      input.children.forEach((child, index) => {
        cy.get(
          `[data-test="children[${index}].priezviskoMeno-input"]`,
        ).type(child.priezviskoMeno)
        cy.get(`[data-test="children[${index}].rodneCislo-input"]`).type(
          child.rodneCislo,
        )

        if (child.wholeYear) {
          cy.get(`[data-test="children[${index}]-bonus-interval-input-wholeyear"]`).click()
        } else {
          cy.get(`[data-test="children[${index}]-bonus-interval-input-partyear"]`).click()
          cy.get(
            `[data-test="children[${index}].monthFrom-select"]`,
          ).select(child.monthFrom)
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

    cy.get('[data-test=XIIoddiel_uplatnujem2percenta-input-no]').click()
    next()
    getError().should('have.length', 0)

  })
  it('works with Slovensko.Digital pre-fill', () => {
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

    /**  SECTION Partner */
    if (input.r032_uplatnujem_na_partnera) {
      getInput('r032_uplatnujem_na_partnera', '-yes').click()
      next()
      cy.get('[data-test=partner_spolocna_domacnost-input-yes]').click()
      next()
      cy.get('[data-test=partner_bonus_uplatneny-input-no]').click()
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
      if (input.prijmyPredJul22) {
        getInput('prijmyPredJul22', '-yes').click()
      } else {
        getInput('prijmyPredJul22', '-no').click()
        typeToInput('zaciatokPrijmovDen', input)
        typeToInput('zaciatokPrijmovMesiac', input)
      }
      
      input.children.forEach((child, index) => {
        cy.get(
          `[data-test="children[${index}].priezviskoMeno-input"]`,
        ).type(child.priezviskoMeno)
        cy.get(`[data-test="children[${index}].rodneCislo-input"]`).type(
          child.rodneCislo,
        )

        if (child.wholeYear) {
          cy.get(`[data-test="children[${index}]-bonus-interval-input-wholeyear"]`).click()
        } else {
          cy.get(`[data-test="children[${index}]-bonus-interval-input-partyear"]`).click()
          cy.get(
            `[data-test="children[${index}].monthFrom-select"]`,
          ).select(child.monthFrom)
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

    cy.get('[data-test=prefill-slovensko-digital]').click()

    getInput('r142_obchMeno').should('contain.value', 'Slovensko.Digital')
    getInput('r142_ico').should('contain.value', '50 158 635')

    next()
  })
})
