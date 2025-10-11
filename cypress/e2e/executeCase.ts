/* eslint-disable promise/no-callback-in-promise */

/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { UserInput } from '../../src/types/UserInput'
import {
  formatCurrency as formatCurrencyOrigin,
  parseInputNumber,
} from '../../src/lib/utils'
import { calculate, TAX_YEAR } from '../../src/lib/calculation'
import {
  Route,
  PostponeRoute,
  homeRoute,
  postponeHomeRoute,
} from '../../src/lib/routes'
import { PostponeUserInput } from '../../src/types/PostponeUserInput'
import path from 'path'
import { E2eTestUserInput } from '../../src/types/E2eTestUserInput'

function formatCurrency(value: number) {
  return formatCurrencyOrigin(value).replaceAll('\u00A0', ' ')
}

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

export const assertUrl = (url: Route | PostponeRoute) => {
  cy.url().should('include', url)
}

export const formSuccessful = (stub) => () => {
  expect(stub).to.be.calledWith('Naplnenie formulára prebehlo úspešne')
}

const getError = () => cy.get('[data-test=error]')

// const toFormattedNumber = (input: string) =>
//   Number.parseFloat(input.replace(',', '.')).toFixed(2).replace('.', ',')

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
        cy.setCookie('you-shall', 'not-pass') // enable debug mode for redirect page

        // Access named export
        const input: E2eTestUserInput = inputModule[`${testCase}Input`]

        assert.exists(input, `${testCase}Input module not found`)

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
        assertUrl('/zamestnanie')

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
        assertUrl('/partner')

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
                `[data-test="children[${index}]-bonus-interval-input-wholeyear"]`,
              ).click()
            } else {
              cy.get(
                `[data-test="children[${index}]-bonus-interval-input-partyear"]`,
              ).click()
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
          next()
          cy.url().then((url) => {
            if (input.partner_bonus_na_deti) {
              getInput('partner_bonus_na_deti_chce_uplatnit', '-yes').click()
              getInput('partner_bonus_na_deti', '-yes').click()
              typeToInput('r034_priezvisko_a_meno', input)
              typeToInput('r034_rodne_cislo', input)
              cy.get(`[data-test="partner_bonus_na_deti_od-select"]`).select(
                input.partner_bonus_na_deti_od,
              )
              cy.get(`[data-test="partner_bonus_na_deti_do-select"]`).select(
                input.partner_bonus_na_deti_do,
              )
              cy.get(
                `[data-test="partner_bonus_na_deti_typ_prijmu-select"]`,
              ).select('1')
              typeToInput('r034a', input)
              next()
            } else {
              if (!url.includes('/dochodok')) {
                getInput('partner_bonus_na_deti_chce_uplatnit', '-no').click()
                next()
              }
            }
          })
        } else {
          getInput('hasChildren', '-no').click()
          next()
        }

        /**  SECTION Dochodok */
        assertUrl('/dochodok')

        if (input.platil_prispevky_na_dochodok) {
          getInput('platil_prispevky_na_dochodok', '-yes').click()
          typeToInput('zaplatene_prispevky_na_dochodok', input)
        } else {
          getInput('platil_prispevky_na_dochodok', '-no').click()
        }

        next()

        /**  SECTION Prenajom */
        assertUrl('/prenajom')

        if (input.rent) {
          getInput('rent', '-yes').click()
          next()
          typeToInput('vyskaPrijmovZPrenajmu', input)
          next()
          typeToInput('vydavkyZPrenajmu', input)
          next()
          if (input.prenajomPrijemZPrilezitostnejCinnosti) {
            getInput('prenajomPrijemZPrilezitostnejCinnosti', '-yes').click()
            next()
            getInput('vyskaOslobodenia').should('have.value', '')
            typeToInput('vyskaOslobodenia', input)
            next()
          } else {
            getInput('prenajomPrijemZPrilezitostnejCinnosti', '-no').click()
            next()
            getInput('vyskaOslobodenia').should('have.value', '500')
            next()
          }
        } else {
          getInput('rent', '-no').click()
        }

        next()

        /**  SECTION Hypoteka */
        assertUrl('/uroky')

        if (input.r035_uplatnuje_uroky) {
          getInput('r035_uplatnuje_uroky', '-yes').click()

          next()

          getInput('uroky_dalsi_uver_uplatnuje', '-no').click()

          next()

          typeToInput('uroky_zmluva_rok_uzatvorenia', input)
          typeToInput('uroky_zmluva_mesiac_uzatvorenia', input)
          typeToInput('uroky_zmluva_den_uzatvorenia', input)

          typeToInput('uroky_zaciatok_urocenia_den', input)
          typeToInput('uroky_zaciatok_urocenia_mesiac', input)
          typeToInput('uroky_zaciatok_urocenia_rok', input)

          next()
          if (!input.uroky_nesplna_datumy) {
            if (input.uroky_dalsi_dlznik) {
              getInput('uroky_dalsi_dlznik', '-yes').click()
              typeToInput('uroky_pocet_dlznikov', input)
            } else {
              getInput('uroky_dalsi_dlznik', '-no').click()
            }

            next()

            getInput('uroky_splnam_vek_kriteria', '-yes').click()

            next()

            getInput('uroky_splnam_prijem', '-yes').click()

            next()

            typeToInput('r035_zaplatene_uroky', input)
          } else {
            cy.get('[data-test=ineligible-message]').should('be.visible')
          }
        } else {
          getInput('r035_uplatnuje_uroky', '-no').click()
        }

        next()

        /**  SECTION Two percent */
        assertUrl('/dve-percenta')
        if (input.expectNgoDonationValue) {
          cy.get('.govuk-hint').contains(input.percent2)

          if (input.dve_percenta_podporujem) {
            cy.get(
              `[data-test="dve_percenta_podporujem-${input.dve_percenta_podporujem}-input"]`,
            ).click()

            cy.get('label[for="splnam3per"]').contains(input.percent3)

            if (input.splnam3per) {
              getInput('splnam3per').click()
            }

            if (input.dve_percenta_podporujem !== 'ano-sk-digital') {
              typeToInput('r142_obchMeno', input)
              typeToInput('r142_ico', input)
            }

            if (input.XIIoddiel_suhlasZaslUdaje) {
              cy.get('[data-test="XIIoddiel_suhlasZaslUdaje-input"]').click()
            }
          } else {
            cy.get('[data-test="dve_percenta_podporujem-nie-input"]').click()
          }
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

        /**  SECTION Summary */
        assertUrl('/suhrn')

        cy.get('h1').contains('Súhrn a kontrola vyplnených údajov')

        cy.get('.govuk-table__cell').contains(
          formatCurrency(parseInputNumber(input.t1r10_prijmy)),
        )
        cy.get('.govuk-table__cell').contains(input.r001_dic)

        next()

        const taxForm = calculate(input)

        if (taxForm.mozeZiadatVratitPreplatkyBonusyUroky) {
          /** SECTION IBAN */
          assertUrl('/iban')

          cy.contains(
            'Chcete požiadať o vyplatenie daňových bonusov alebo preplatkov vo výške',
          )
          cy.get('[data-test=ineligible-message]').should('not.exist')

          if (input.ziadamVyplatitDanovyBonusUrokPreplatok) {
            getInput('ziadamVyplatitDanovyBonusUrokPreplatok', '-yes').click()
            typeToInput('iban', input)
          } else {
            getInput('ziadamVyplatitDanovyBonusUrokPreplatok', '-no').click()
          }

          if (taxForm.mozeZiadatVyplatitDanovyBonus) {
            cy.contains('Daňový bonus: ')
          }

          if (taxForm.mozeZiadatVratitDanovyBonusUroky) {
            cy.contains('Daňový bonus na zaplatené úroky: ')
          }

          if (taxForm.mozeZiadatVratitDanovyPreplatok) {
            cy.contains('Daňový preplatok: ')
          }

          next()
        }

        /**  SECTION Results */
        assertUrl('/vysledky')

        cy.contains('Daň na úhradu')

        cy.get('[data-test="prijmy"]')
          .should('have.length', 1)
          .contains(formatCurrency(taxForm.r036.plus(taxForm.r039).toNumber()))

        cy.get('[data-test="pausalneVydavky"]')
          .should('have.length', 1)
          .contains(
            formatCurrency(
              taxForm.r040
                .minus(taxForm.vydavkyPoistPar6ods11_ods1a2)
                .toNumber(),
            ),
          )

        cy.get('[data-test="zakladDane"]')
          .should('have.length', 1)
          .contains(
            formatCurrency(
              taxForm.r078_zaklad_dane_zo_zamestnania
                .plus(taxForm.r092)
                .toNumber(),
            ),
          )

        cy.get('[data-test="danSpolu"]')
          .should('have.length', 1)
          .contains(formatCurrency(taxForm.r116_dan.toNumber()))

        cy.get('[data-test="danovyBonusNaDeti"]')
          .should('have.length', 1)
          .contains(formatCurrency(taxForm.r117.toNumber()))

        cy.get('[data-test="danovyBonusPreplatokNaVyplatenie"]')
          .should('have.length', 1)
          .contains(
            formatCurrency(
              taxForm.r121
                .plus(taxForm.r136_danovy_preplatok)
                .plus(taxForm.r127)
                .toNumber(),
            ),
          )

        cy.get('[data-test="danNaUhradu"]')
          .should('have.length', 1)
          .contains(formatCurrency(taxForm.r135_dan_na_uhradu.toNumber()))
        next()

        /** SECTION Download */
        assertUrl('/pokracovat')

        cy.contains('Presmerujeme Vás na Návody.Digital. Čakajte prosím.')

        cy.get('form[action$="/podania/nove"][method=post]')

        cy.get('[data-test="debug-download"]').click()

        const downloadsFolder = Cypress.config('downloadsFolder')
        const filePath = path.join(downloadsFolder, 'file.xml')

        /**  Validate our results with the FS form */
        cy.visit('/form/form.601.html')
        // Ignore uncaught exceptions in the 3rd party form code
        cy.on('uncaught:exception', (_err, _runnable) => {
          // returning false here prevents Cypress
          // inside the cy.origin() method from failing the test
          return false
        })

        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('#form-button-load').click()
        cy.get('#form-buttons-load-dialog > input').selectFile(filePath)

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
        cy.setCookie('you-shall', 'not-pass') // enable debug mode for redirect page

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
            `Nový termín pre podanie daňového priznania je 30. septembra ${
              TAX_YEAR + 1
            }.`,
          )
        } else {
          getInput('prijmy_zo_zahranicia', '-no').click()
          cy.contains(
            `Nový termín pre podanie daňového priznania je 30. júna ${
              TAX_YEAR + 1
            }.`,
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
        typeToInput('obec', input)
        cy.get('[data-test="stat-select"]').select(input.stat)

        next()
        assertUrl('/odklad/suhrn')

        next()
        assertUrl('/odklad/pokracovat')

        cy.contains('Presmerujeme Vás na Návody.Digital. Čakajte prosím.')

        cy.get('form[action$="/podania/nove"][method=post]')

        cy.get('[data-test="debug-download"]').click()
        const filePath = path.join(__dirname, '../downloads/file.xml')

        /**  Validate our results with the FS form */
        cy.visit('/form-odklad/form.596.html')

        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('#form-button-load').click()
        cy.get('#form-buttons-load-dialog > input').selectFile(filePath)

        cy.get('#form-buttons-load-dialog-confirm > .ui-button-text').click()
        cy.get('#form-button-validate').click().should(formSuccessful(stub))
        cy.get('#errorsContainer')
          .should((el) => expect(el.text()).to.be.empty)
          .then(() => done())
      },
    )
  })
}
