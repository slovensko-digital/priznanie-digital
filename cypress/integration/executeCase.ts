/* eslint-disable promise/no-callback-in-promise */
/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { UserInput } from '../../src/types/UserInput'
import { formatCurrency, parseInputNumber } from '../../src/lib/utils'
import { calculate } from '../../src/lib/calculation'
import {
  Route,
  PostponeRoute,
  homeRoute,
  postponeHomeRoute,
} from '../../src/lib/routes'
import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'
import { PostponeUserInput } from '../../src/types/PostponeUserInput'
import Decimal from 'decimal.js'
import path from 'path'

// path to download directory ./cypress/downloads from
// directory ./cypress/fixtures (default for file upload)
const downloadsFolder = '../downloads'

function getInput<K extends keyof UserInput>(key: K, suffix = '') {
  return cy.get(`[data-test="${key}-input${suffix}"]`)
}

function typeToInput<K extends keyof UserInput>(
  key: K,
  userInput: Partial<UserInput>,
) {
  const value = userInput[key] ? userInput[key] : '0'
  if (typeof value === 'string') {
    return getInput(key).type(value)
  }
  throw new Error(`Incorrect type of input: ${value}`)
}

const next = () => {
  return cy.contains('Pokračovať').click()
}

const assertUrl = (url: Route | PostponeRoute) => {
  cy.url().should('include', url)
}

const formSuccessful = (stub) => () => {
  expect(stub).to.be.calledWith('Naplnenie formulára prebehlo úspešne')
}

const getError = () => cy.get('[data-test=error]')

const toFormattedNumber = (input: string) =>
  Number.parseFloat(input.replace(',', '.')).toFixed(2).replace('.', ',')

export const executeAllTestCases = (testCases: string[]) => {
  testCases.forEach((testCase) => executeTestCase(testCase))
}

export const executeAllPostponeCases = (testCases: string[]) => {
  testCases.forEach((testCase) => executePostponeCase(testCase))
}

const executeTestCase = (testCase: string) => {
  it(testCase, (done) => {
    import(`../../__tests__/testCases/${testCase}Input.ts`).then(
      (inputModule) => {
        // Access named export
        const input: TaxFormUserInput = inputModule[`${testCase}Input`]

        assert.exists(input, `${testCase}Input module not found`)

        cy.visit(homeRoute)

        cy.contains('Súhlasím a chcem odložiť daňové priznanie').click()

        /**  SECTION Prijmy a vydavky */
        getInput('t1r10_prijmy').type(input.t1r10_prijmy)
        getInput('priloha3_r11_socialne').type(input.priloha3_r11_socialne)
        getInput('priloha3_r13_zdravotne').type(input.priloha3_r13_zdravotne)
        getInput('r122').type(input.r122 ? input.r122 : '0')

        next()

        /**  SECTION Zamestnanie */
        assertUrl('/zamestnanie')

        if (input.employed) {
          getInput('employed', '-yes').click()
          typeToInput('r038', input)
          typeToInput('r039_socialne', input)
          typeToInput('r039_zdravotne', input)
          typeToInput('r120', input)
          typeToInput('r108', input)
        } else {
          getInput('employed', '-no').click()
        }

        next()

        /**  SECTION Partner */
        assertUrl('/partner')

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
        assertUrl('/deti')

        if (input.hasChildren) {
          getInput('hasChildren', '-yes').click()
          input.children.forEach((child, index) => {
            cy.get(
              `[data-test="children[${index}].priezviskoMeno-input"]`,
            ).type(child.priezviskoMeno)
            cy.get(`[data-test="children[${index}].rodneCislo-input"]`).type(
              child.rodneCislo,
            )

            if (child.wholeYear) {
              cy.get(`[data-test="children[${index}].wholeYear-input"]`).click()
            } else {
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
        assertUrl('/dochodok')

        if (input.platil_prispevky_na_dochodok) {
          getInput('platil_prispevky_na_dochodok', '-yes').click()
          typeToInput('r075_zaplatene_prispevky_na_dochodok', input)
        } else {
          getInput('platil_prispevky_na_dochodok', '-no').click()
        }

        next()

        // TODO Reanable with mortgage feature
        // /**  SECTION Hypoteka */
        // assertUrl('/hypoteka')

        // if (input.r037_uplatnuje_uroky) {
        //   getInput('r037_uplatnuje_uroky', '-yes').click()
        //   typeToInput('r037_zaplatene_uroky', input)
        //   typeToInput('r037_pocetMesiacov', input)
        // } else {
        //   getInput('r037_uplatnuje_uroky', '-no').click()
        // }

        // next()

        /**  SECTION Kupele */
        assertUrl('/kupele')

        if (input.kupele) {
          getInput('kupele', '-yes').click()
          if (input.danovnikInSpa) {
            getInput('danovnikInSpa').click()
            typeToInput('r076a_kupele_danovnik', input)
          }
          if (input.r033_partner_kupele) {
            getInput('r033_partner_kupele').click()
            typeToInput('r033_partner_kupele_uhrady', input)

            // partner not filled in previous steps
            if (!input.r032_uplatnujem_na_partnera) {
              typeToInput('r031_rodne_cislo', input)
              typeToInput('r031_priezvisko_a_meno', input)
            }
          }
          if (input.childrenInSpa) {
            getInput('childrenInSpa').click()
            typeToInput('r036_deti_kupele', input)
            const childrenWithSpa = input.children.filter(
              (child) => child.kupelnaStarostlivost,
            )

            // children filled in previous steps
            if (input.hasChildren) {
              childrenWithSpa.forEach((child, index) => {
                if (child.kupelnaStarostlivost) {
                  cy.get(
                    `[data-test="children[${index}].kupelnaStarostlivost-input"]`,
                  ).click()
                }
              })
            } else {
              childrenWithSpa.forEach((child, index) => {
                cy.get(
                  `[data-test="children[${index}].priezviskoMeno-input"]`,
                ).type(child.priezviskoMeno)
                cy.get(
                  `[data-test="children[${index}].rodneCislo-input"]`,
                ).type(child.rodneCislo)

                if (index + 1 < input.children.length) {
                  cy.get('[data-test="add-child"]').click()
                }
              })
            }
          }
        } else {
          getInput('kupele', '-no').click()
        }

        next()

        /**  SECTION Two percent */
        assertUrl('/dve-percenta')

        if (input.XIIoddiel_uplatnujem2percenta) {
          getInput('XIIoddiel_uplatnujem2percenta', '-yes').click()

          if (input.splnam3per) {
            getInput('splnam3per').click()
          }

          typeToInput('r142_obchMeno', input)
          typeToInput('r142_ico', input)
          typeToInput('r142_ulica', input)
          typeToInput('r142_cislo', input)
          typeToInput('r142_psc', input)
          getInput('r142_obec').clear() // clear value from PSC autocomplete via Posta API
          typeToInput('r142_obec', input)

          if (input.XIIoddiel_suhlasZaslUdaje) {
            cy.get('[data-test="XIIoddiel_suhlasZaslUdaje-input"]').click()
          }
        } else {
          getInput('XIIoddiel_uplatnujem2percenta', '-no').click()
        }

        next()

        /**  SECTION Osobne udaje */
        assertUrl('/osobne-udaje')

        typeToInput('r001_dic', input)

        const naceNumber = input.r003_nace.match(/^(\d+)/)
        if (naceNumber) {
          getInput('r003_nace').type(naceNumber[1])
          cy.contains(input.r003_nace).click()
        } else {
          typeToInput('r003_nace', input)
        }

        typeToInput('r005_meno', input)
        typeToInput('r004_priezvisko', input)
        typeToInput('r007_ulica', input)
        typeToInput('r008_cislo', input)
        typeToInput('r009_psc', input)
        getInput('r010_obec').clear() // clear value from PSC autocomplete via Posta API
        typeToInput('r010_obec', input)
        typeToInput('r011_stat', input)

        next()

        /**  SECTION Summary */
        assertUrl('/suhrn')

        cy.get('h1').contains('Súhrn a kontrola vyplnených údajov')

        cy.get('.govuk-table__cell').contains(
          formatCurrency(parseInputNumber(input.t1r10_prijmy)),
        )
        cy.get('.govuk-table__cell').contains(input.r001_dic)

        if (input.kupele) {
          if (input.danovnikInSpa) {
            cy.get(`[data-test="r076a_kupele_danovnik"]`).contains(
              formatCurrency(parseInputNumber(input.r076a_kupele_danovnik)),
            )
          }
          if (input.r033_partner_kupele) {
            cy.get(`[data-test="r033_partner_kupele_uhrady"]`).contains(
              formatCurrency(
                parseInputNumber(input.r033_partner_kupele_uhrady),
              ),
            )
          }
          if (input.childrenInSpa)
            cy.get(`[data-test="r036_deti_kupele"]`).contains(
              formatCurrency(parseInputNumber(input.r036_deti_kupele)),
            )
        }

        if (input.employed) {
          cy.get(`[data-test="r039_socialne"]`).contains(
            `${toFormattedNumber(input.r039_socialne)} EUR`,
          )
          cy.get(`[data-test="r039_zdravotne"]`).contains(
            `${toFormattedNumber(input.r039_zdravotne)} EUR`,
          )
        }

        next()

        const taxForm = calculate(input)

        if (taxForm.mozeZiadatVyplatitDanovyBonus) {
          /** SECTION IBAN */
          assertUrl('/iban')

          cy.contains(
            'Žiadam o vyplatenie daňového bonusu alebo rozdielu daňového bonusu',
          )
          cy.get('[data-test=ineligible-message]').should('not.exist')

          if (input.ziadamVyplatitDanovyBonus) {
            getInput('ziadamVyplatitDanovyBonus', '-yes').click()
            typeToInput('iban', input)
          } else {
            getInput('ziadamVyplatitDanovyBonus', '-no').click()
          }

          next()
        }

        if (taxForm.mozeZiadatVratitDanovyPreplatok) {
          /** SECTION IBAN */
          assertUrl('/iban')

          cy.contains('Žiadam o vrátenie daňového preplatku')
          cy.get('[data-test=ineligible-message]').should('not.exist')

          if (input.ziadamVratitDanovyPreplatok) {
            getInput('ziadamVratitDanovyPreplatok', '-yes').click()
            typeToInput('iban', input)
          } else {
            getInput('ziadamVratitDanovyPreplatok', '-no').click()
          }

          next()
        }

        /**  SECTION Results */
        assertUrl('/vysledky')

        cy.contains('Daň na úhradu')

        cy.get('.govuk-table__cell').contains(
          formatCurrency(
            new Decimal(parseInputNumber(input.t1r10_prijmy))
              .plus(parseInputNumber(input.r038))
              .toNumber(),
          ),
        )

        next()

        /** SECTION Download */
        assertUrl('/stiahnut')

        cy.contains('Stiahnuť dáta')

        cy.get('[data-test="download-xml"]').click()
        const filePath = path.join(downloadsFolder, 'danove_priznanie.xml')

        /**  Validate our results with the FS form */
        cy.visit('/form/form.495.html')

        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('#form-button-load').click()
        cy.get('#form-buttons-load-dialog > input').attachFile({ filePath })

        cy.get('#form-buttons-load-dialog-confirm > .ui-button-text').click()
        cy.get('#cmbDic1').should('have.value', input.r001_dic) // validate the form has laoded by checking DIC value
        cy.get('#form-button-validate').click().should(formSuccessful(stub))
        cy.get('#errorsContainer')
          .should((el) => expect(el.text()).to.be.empty)
          .then(() => done())
      },
    )
  })
}

const executePostponeCase = (testCase: string) => {
  it(testCase, (done) => {
    import(`../../__tests__/testCases/postpone/${testCase}Input.ts`).then(
      (inputModule) => {
        // Access named export
        const input: PostponeUserInput = inputModule[`${testCase}Input`]

        cy.visit(postponeHomeRoute)

        cy.contains('Súhlasím a chcem odložiť daňové priznanie').click()
        assertUrl('/odklad/prijmy-zo-zahranicia')

        next()

        getError()

        if (input.prijmy_zo_zahranicia) {
          getInput('prijmy_zo_zahranicia', '-yes').click()
          cy.contains(
            'Nový termín pre podanie daňového priznania je 30. septembra 2021.',
          )
        } else {
          getInput('prijmy_zo_zahranicia', '-no').click()
          cy.contains(
            'Nový termín pre podanie daňového priznania je 30. júna 2021.',
          )
        }

        next()
        assertUrl('/odklad/osobne-udaje')

        typeToInput('meno', input)
        typeToInput('priezvisko', input)
        typeToInput('dic', input)
        typeToInput('ulica', input)
        typeToInput('cislo', input)
        typeToInput('psc', input)
        getInput('obec').should('have.value', input.obec)
        typeToInput('stat', input)

        next()
        assertUrl('/odklad/suhrn')

        if (input.email) {
          typeToInput('email', input)
          cy.get('button[data-test="send-email"]').click()
          cy.contains(`Na Váš email ${input.email} sme odoslali`)
        }

        next()
        assertUrl('/odklad/stiahnut')

        cy.get('[data-test="download-xml"]').click()
        const filePath = path.join(
          downloadsFolder,
          'odklad_danoveho_priznania.xml',
        )

        /**  Validate our results with the FS form */
        cy.visit('/form-odklad/form.510.html')

        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('#form-button-load').click()
        cy.get('#form-buttons-load-dialog > input').attachFile({ filePath })

        cy.get('#form-buttons-load-dialog-confirm > .ui-button-text').click()
        cy.get('#form-button-validate').click().should(formSuccessful(stub))
        cy.get('#errorsContainer')
          .should((el) => expect(el.text()).to.be.empty)
          .then(() => done())
      },
    )
  })
}
