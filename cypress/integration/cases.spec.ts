/* eslint-disable promise/no-callback-in-promise */
/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { UserInput } from '../../src/types/UserInput'
import { convertToXML } from '../../src/lib/xml/xmlConverter'
import { formatCurrency, setDate } from '../../src/lib/utils'
import { calculate } from '../../src/lib/calculation'
import { Route, PostponeRoute } from '../../src/lib/routes'
import { TaxFormUserInput } from '../../src/types/TaxFormUserInput'
import { PostponeUserInput } from '../../src/types/PostponeUserInput'
import { convertPostponeToXML } from '../../src/lib/postpone/postponeConverter'
import { with2percentInput } from '../../__tests__/testCases/with2percentInput'

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

describe('Cases', () => {
  ;[
    // 'base',
    // 'complete',
    // 'completeDecimal',
    // 'withPartner',
    // 'withEmployment',
    // // 'withMortgage',
    // 'withPension',
    // 'withChildren',
    // 'with2percent',
    // 'withSpa',
    // 'withBonus',
    // 'withEmploymentBonus',
    'bugReport1',
  ].forEach((testCase) => {
    it(testCase, (done) => {
      import(`../../__tests__/testCases/${testCase}Input.ts`).then(
        (inputModule) => {
          // Access named export
          const input: TaxFormUserInput = inputModule[`${testCase}Input`]

          assert.exists(input, `${testCase}Input module not found`)

          cy.visit('/')

          cy.contains('Pripraviť daňové priznanie').click()

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
            typeToInput('r039', input)
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
                cy.get(
                  `[data-test="children[${index}].wholeYear-input"]`,
                ).click()
              } else {
                cy.get(
                  `[data-test="children[${index}].monthFrom-select"]`,
                ).select(child.monthFrom)
                cy.get(
                  `[data-test="children[${index}].monthTo-select"]`,
                ).select(child.monthTo)
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
            }
            if (input.childrenInSpa) {
              getInput('childrenInSpa').click()
              typeToInput('r036_deti_kupele', input)
              const childrenWithSpa = input.children.filter(
                (child) => child.kupelnaStarostlivost,
              )
              childrenWithSpa.forEach((child, index) => {
                if (child.kupelnaStarostlivost) {
                  cy.get(
                    `[data-test="children[${index}].kupelnaStarostlivost-input"]`,
                  ).click()
                }
              })
            }
          } else {
            getInput('kupele', '-no').click()
          }

          next()

          /**  SECTION Two percent */
          assertUrl('/dve-percenta')

          if (input.XIIoddiel_uplatnujem2percenta) {
            getInput('XIIoddiel_uplatnujem2percenta', '-yes').click()
            typeToInput('r142_obchMeno', with2percentInput)
            typeToInput('r142_ico', with2percentInput)
            typeToInput('r142_ulica', with2percentInput)
            typeToInput('r142_cislo', with2percentInput)
            typeToInput('r142_psc', with2percentInput)
            typeToInput('r142_obec', with2percentInput)
            cy.get('[data-test="XIIoddiel_suhlasZaslUdaje-input"]').click()
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
          typeToInput('r010_obec', input)
          typeToInput('r011_stat', input)

          next()

          /**  SECTION Summary */
          assertUrl('/suhrn')

          cy.get('h1').contains('Súhrn a kontrola vyplnených údajov')

          cy.get('.govuk-table__cell').contains(
            formatCurrency(parseFloat(input.t1r10_prijmy)),
          )
          cy.get('.govuk-table__cell').contains(input.r001_dic)

          if (input.kupele) {
            if (input.danovnikInSpa) {
              cy.get(`[data-test="r076a_kupele_danovnik"]`).contains(
                input.r076a_kupele_danovnik,
              )
            }
            if (input.r033_partner_kupele) {
              cy.get(`[data-test="r033_partner_kupele_uhrady"]`).contains(
                input.r033_partner_kupele_uhrady,
              )
            }
            if (input.childrenInSpa)
              cy.get(`[data-test="r036_deti_kupele"]`).contains(
                input.r036_deti_kupele,
              )
          }

          if (input.employed) {
            cy.get(`[data-test="r039"]`).contains(
              input.r039,
            )
          }

          next()

          /**  SECTION Results */
          assertUrl('/vysledky')

          cy.contains('Daň na úhradu')

          cy.get('.govuk-table__cell').contains(
            formatCurrency(parseFloat(input.t1r10_prijmy)),
          )

          next()

          if (
            typeof input.ziadamVratitDanovyBonusAleboPreplatok !== 'undefined'
          ) {
            /** SECTION IBAN */
            assertUrl('/iban')
            cy.contains(
              'Žiadam o vyplatenie daňového bonusu alebo rozdielu daňového bonusu',
            )
            cy.get('[data-test=ineligible-message]').should('not.exist')

            if (input.ziadamVratitDanovyBonusAleboPreplatok) {
              getInput('ziadamVratitDanovyBonusAleboPreplatok', '-yes').click()
              typeToInput('iban', input)
            } else {
              getInput('ziadamVratitDanovyBonusAleboPreplatok', '-no').click()
            }

            next()
          }

          /** SECTION Download */
          assertUrl('/stiahnut')

          cy.contains('Stiahnuť dáta')

          /**  HACK to work around file download, because cypress cannot do it */
          cy.get(`[data-test="taxFormUserInput"]`)
            .invoke('text')
            .then((output) => {
              const now = new Date(2020, 1, 22)

              const taxFormUserInput = setDate(
                JSON.parse(output.toString()) as TaxFormUserInput,
                now,
              )
              const xmlResult = convertToXML(calculate(taxFormUserInput))
              /**  HACK END */

              /**  Validate our results with the FS form */
              cy.visit('/form/form.451.html')

              const stub = cy.stub()
              cy.on('window:alert', stub)

              cy.get('#form-button-load').click()
              cy.get('#form-buttons-load-dialog > input').upload({
                fileContent: xmlResult,
                fileName: 'xmlResult.xml',
                mimeType: 'application/xml',
                encoding: 'utf-8',
              })

              cy.get(
                '#form-buttons-load-dialog-confirm > .ui-button-text',
              ).click()
              cy.get('#form-button-validate')
                .click()
                .should(formSuccessful(stub))
              cy.get('#errorsContainer')
                .should((el) => expect(el.text()).to.be.empty)
                .then(() => done())
            })
        },
      )
    })
  })
})

describe.skip('Postpone cases', () => {
  ;['basic', 'foreignIncome'].forEach((testCase) => {
    it(testCase, (done) => {
      import(`../../__tests__/testCases/postpone/${testCase}Input.ts`).then(
        (inputModule) => {
          // Access named export
          const input: PostponeUserInput = inputModule[`${testCase}Input`]

          cy.visit('/')

          cy.contains('Odložiť daňové priznanie').click()
          assertUrl('/odklad/prijmy-zo-zahranicia')

          next()

          getError()

          getInput('prijmy_zo_zahranicia', '-yes').click()

          cy.contains(
            'Nový termín pre podanie daňového priznania je 30. septembra 2020.',
          )
          next()
          assertUrl('/odklad/osobne-udaje')

          typeToInput('meno_priezvisko', input)
          typeToInput('dic', input)
          // typeToInput('rodne_cislo', input); // TODO
          typeToInput('ulica', input)
          typeToInput('cislo', input)
          typeToInput('psc', input)
          getInput('obec').should('have.value', input.obec)
          typeToInput('stat', input)

          next()
          assertUrl('/odklad/suhrn')

          next()
          assertUrl('/odklad/stiahnut')

          /**  HACK to work around file download, because cypress cannot do it */
          cy.get(`[data-test="postponeUserInput"]`)
            .invoke('text')
            .then((postponeUserInput) => {
              const xml = convertPostponeToXML(
                setDate(
                  JSON.parse(postponeUserInput.toString()) as PostponeUserInput,
                ),
              )

              /**  HACK END */

              /**  Validate our results with the FS form */
              cy.visit('/form-odklad/form.401.html')

              const stub = cy.stub()
              cy.on('window:alert', stub)

              cy.get('#form-button-load').click()
              cy.get('#form-buttons-load-dialog > input').upload({
                fileContent: xml,
                fileName: 'xmlResult.xml',
                mimeType: 'application/xml',
                encoding: 'utf-8',
              })

              cy.get(
                '#form-buttons-load-dialog-confirm > .ui-button-text',
              ).click()
              cy.get('#form-button-validate')
                .click()
                .should(formSuccessful(stub))
              cy.get('#errorsContainer')
                .should((el) => expect(el.text()).to.be.empty)
                .then(() => done())
            })
        },
      )
    })
  })
})
