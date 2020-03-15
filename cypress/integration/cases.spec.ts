/* eslint-disable promise/no-callback-in-promise */
/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { UserInput } from '../../src/types/UserInput';
import { convertToXML } from '../../src/lib/xml/xmlConverter';
import { formatCurrency, setDate } from '../../src/lib/utils';
import { calculate } from '../../src/lib/calculation';
import { Route, PostponeRoute } from '../../src/lib/routes';
import { TaxFormUserInput } from '../../src/types/TaxFormUserInput';
import { PostponeUserInput } from '../../src/types/PostponeUserInput';
import { convertPostponeToXML } from '../../src/lib/postpone/postponeConverter';

function getInput<K extends keyof UserInput>(key: K, suffix = '') {
  return cy.get(`[data-test="${key}-input${suffix}"]`);
}

function typeToInput<K extends keyof UserInput>(
  key: K,
  userInput: Partial<UserInput>,
) {
  const value = userInput[key];
  if (typeof value === 'string') {
    return getInput(key).type(value);
  }
  throw new Error(`Incorrect type of input: ${value}`);
}

function next() {
  return cy.contains('Pokračovať').click();
}

function assertUrl(url: Route | PostponeRoute) {
  cy.url().should('include', url);
}

const getError = () => cy.get('[data-test=error]');

describe('Cases', function() {
  [
    'base',
    'complete',
    'completeDecimal',
    'withPartner',
    'withEmployment',
    'withMortgage',
    'withPension',
    'withChildren',
  ].forEach(testCase => {
    it(testCase, function(done) {
      import(`../../__tests__/testCases/${testCase}Input.ts`).then(
        inputModule => {
          // Access named export
          const input: TaxFormUserInput = inputModule[`${testCase}Input`];

          cy.visit('/');

          cy.contains('Pripraviť daňové priznanie').click();

          /**  SECTION Prijmy a vydavky */
          getInput('t1r10_prijmy').type(input.t1r10_prijmy);
          getInput('priloha3_r11_socialne').type(input.priloha3_r11_socialne);
          getInput('priloha3_r13_zdravotne').type(input.priloha3_r13_zdravotne);

          next();

          /**  SECTION Zamestnanie */
          assertUrl('/zamestnanie');

          if (input.employed) {
            getInput('employed', '-yes').click();
            typeToInput('r038', input);
            typeToInput('r039', input);
          } else {
            getInput('employed', '-no').click();
          }

          next();

          /**  SECTION Partner */
          assertUrl('/partner');

          if (input.r032_uplatnujem_na_partnera) {
            getInput('r032_uplatnujem_na_partnera', '-yes').click();
            typeToInput('r031_priezvisko_a_meno', input);
            typeToInput('r031_rodne_cislo', input);
            typeToInput('r032_partner_vlastne_prijmy', input);
            typeToInput('r032_partner_pocet_mesiacov', input);
          } else {
            getInput('r032_uplatnujem_na_partnera', '-no').click();
          }

          next();

          /**  SECTION Kids */
          assertUrl('/deti');

          if (input.children) {
            getInput('children', '-yes').click();
            input?.r034?.forEach((child, index) => {
              cy.get(`[data-test="r034[${index}].priezviskoMeno-input"]`).type(
                child.priezviskoMeno,
              );
              cy.get(`[data-test="r034[${index}].rodneCislo-input"]`).type(
                child.rodneCislo,
              );

              [
                `r034[${index}].m00`,
                `r034[${index}].m01`,
                `r034[${index}].m02`,
                `r034[${index}].m03`,
                `r034[${index}].m04`,
                `r034[${index}].m05`,
                `r034[${index}].m06`,
                `r034[${index}].m07`,
                `r034[${index}].m08`,
                `r034[${index}].m09`,
                `r034[${index}].m10`,
                `r034[${index}].m11`,
                `r034[${index}].m12`,
              ].forEach(field => {
                const key = field.slice(-3);
                if (child[key]) {
                  cy.get(`[data-test="${field}"]`).click();
                }
              });
              if (index < input?.r034?.length) {
                cy.get('[data-test="add-child"]').click();
              }
            });
          } else {
            getInput('children', '-no').click();
          }

          next();

          /**  SECTION Dochodok */
          assertUrl('/dochodok');

          if (input.r029_poberal_dochodok) {
            getInput('r029_poberal_dochodok', '-yes').click();
            typeToInput('r030_vyska_dochodku', input);
          } else {
            getInput('r029_poberal_dochodok', '-no').click();
          }

          next();

          /**  SECTION Hypoteka */
          assertUrl('/hypoteka');

          if (input.r037_uplatnuje_uroky) {
            getInput('r037_uplatnuje_uroky', '-yes').click();
            typeToInput('r037_zaplatene_uroky', input);
            typeToInput('r037_pocetMesiacov', input);
          } else {
            getInput('r037_uplatnuje_uroky', '-no').click();
          }

          next();

          /**  SECTION Osobne udaje */
          assertUrl('/osobne-udaje');

          typeToInput('r001_dic', input);
          typeToInput('r003_nace', input);
          typeToInput('meno_priezvisko', input);
          typeToInput('r007_ulica', input);
          typeToInput('r008_cislo', input);
          typeToInput('r009_psc', input);
          getInput('r010_obec').should('have.value', input.r010_obec);
          typeToInput('r011_stat', input);

          next();

          /**  SECTION Summary */
          assertUrl('/vysledky');

          cy.contains('XML');

          cy.get('.govuk-table__cell').contains(
            formatCurrency(parseFloat(input.t1r10_prijmy)),
          );

          /**  HACK to work around file download, because cypress cannot do it */
          cy.get(`[data-test="taxFormUserInput"]`)
            .invoke('text')
            .then(output => {
              const now = new Date(2020, 1, 22);

              const taxFormUserInput = setDate(
                JSON.parse(output.toString()) as TaxFormUserInput,
                now,
              );
              const xmlResult = convertToXML(calculate(taxFormUserInput));
              /**  HACK END */

              /**  Validate our results with the FS form */
              cy.visit('/form/form.451.html');

              const stub = cy.stub();
              cy.on('window:alert', stub);

              cy.get('#form-button-load').click();
              cy.get('#form-buttons-load-dialog > input').upload({
                fileContent: xmlResult,
                fileName: 'xmlResult.xml',
                mimeType: 'application/xml',
                encoding: 'utf-8',
              });

              cy.get(
                '#form-buttons-load-dialog-confirm > .ui-button-text',
              ).click();
              cy.get('#form-button-validate')
                .click()
                .should(() => {
                  expect(stub).to.be.calledWith(
                    'Naplnenie formulára prebehlo úspešne',
                  );
                });
              cy.get('#errorsContainer')
                .should(el => expect(el.text()).to.be.empty)
                .then(() => done());
            });
        },
      );
    });
  });
});

describe('Postpone cases', function() {
  ['basic', 'foreignIncome'].forEach(testCase => {
    it(testCase, function(done) {
      import(`../../__tests__/testCases/postpone/${testCase}Input.ts`).then(
        inputModule => {
          // Access named export
          const input: PostponeUserInput = inputModule[`${testCase}Input`];

          cy.visit('/');

          cy.contains('Odložiť daňové priznanie').click();
          assertUrl('/odklad/prijmy-zo-zahranicia');

          next();

          getError();

          getInput('prijmy_zo_zahranicia', '-yes').click();

          cy.contains(
            'Nový termín pre podanie daňového priznania je 30. septembra 2020.',
          );
          next();
          assertUrl('/odklad/osobne-udaje');

          typeToInput('meno_priezvisko', input);
          typeToInput('dic', input);
          // typeToInput('rodne_cislo', input); // TODO
          typeToInput('ulica', input);
          typeToInput('cislo', input);
          typeToInput('psc', input);
          getInput('obec').should('have.value', input.obec);
          typeToInput('stat', input);

          next();
          assertUrl('/odklad/suhrn');

          next();
          assertUrl('/odklad/stiahnut');

          /**  HACK to work around file download, because cypress cannot do it */
          cy.get(`[data-test="postponeUserInput"]`)
            .invoke('text')
            .then(postponeUserInput => {
              const xml = convertPostponeToXML(
                setDate(
                  JSON.parse(postponeUserInput.toString()) as PostponeUserInput,
                ),
              );

              /**  HACK END */

              /**  Validate our results with the FS form */
              cy.visit('/form-odklad/form.401.html');

              const stub = cy.stub();
              cy.on('window:alert', stub);

              cy.get('#form-button-load').click();
              cy.get('#form-buttons-load-dialog > input').upload({
                fileContent: xml,
                fileName: 'xmlResult.xml',
                mimeType: 'application/xml',
                encoding: 'utf-8',
              });

              cy.get(
                '#form-buttons-load-dialog-confirm > .ui-button-text',
              ).click();
              cy.get('#form-button-validate')
                .click()
                .should(() => {
                  expect(stub).to.be.calledWith(
                    'Naplnenie formulára prebehlo úspešne',
                  );
                });
              cy.get('#errorsContainer')
                .should(el => expect(el.text()).to.be.empty)
                .then(() => done());
            });
        },
      );
    });
  });
});
