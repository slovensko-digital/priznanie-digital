/* eslint-disable promise/no-callback-in-promise */
/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { TaxFormUserInput } from '../../src/types/TaxFormUserInput';
import { convertToXML } from '../../src/lib/xml/xmlConverter';
import { setDate } from '../../src/lib/utils';
import { calculate } from '../../src/lib/calculation';

function getInput<K extends keyof TaxFormUserInput>(key: K, suffix = '') {
  return cy.get(`[data-test="${key}-input${suffix}"]`);
}

function typeToInput<K extends keyof TaxFormUserInput>(
  key: K,
  userInput: TaxFormUserInput,
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
// const testCase = 'base';
describe('Cases', function() {
  // ['base', 'withPartner', 'withEmployment'].forEach(testCase => {
  ['base', 'complete', 'withPartner', 'withEmployment'].forEach(testCase => {
    it(testCase, function(done) {
      import(`../../__tests__/testCases/${testCase}Input.ts`).then(
        inputModule => {
          // Access named export
          const input: TaxFormUserInput = inputModule[`${testCase}Input`];

          const now = new Date(2020, 1, 22);
          cy.visit('/');

          cy.contains('Pripraviť daňové priznanie').click();

          /** Prijmy a vydavky */
          getInput('t1r10_prijmy').type(input.t1r10_prijmy.toString());
          getInput('priloha3_r11_socialne').type(
            input.priloha3_r11_socialne.toString(),
          );
          getInput('priloha3_r13_zdravotne').type(
            input.priloha3_r13_zdravotne.toString(),
          );

          next();

          /** Zemestnanie */
          if (input.employed) {
            /** Todo */
            getInput('employed', '-yes').click();
            typeToInput('r038', input);
            typeToInput('r039', input);
          } else {
            getInput('employed', '-no').click();
          }

          next();

          /** Partner */
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

          /** Kids */
          if (input.children) {
            getInput('children', '-yes').click();
          } else {
            getInput('children', '-no').click();
          }

          next();

          /** Osobne udaje */
          typeToInput('r001_dic', input);
          typeToInput('r003_nace', input);
          typeToInput('r004_priezvisko', input);
          typeToInput('r005_meno', input);
          typeToInput('r007_ulica', input);
          typeToInput('r008_cislo', input);
          typeToInput('r009_psc', input);
          getInput('r010_obec').should('have.value', input.r010_obec);
          typeToInput('r011_stat', input);

          next();

          /** Summary */
          cy.contains('XML');

          /**  HACK to work around file download, because cypress cannot do it */
          cy.get(`[data-test="taxFormUserInput"]`)
            .invoke('text')
            .then(output => {
              const taxFormUserInput = setDate(
                JSON.parse(output.toString()) as TaxFormUserInput,
                now,
              );
              const xmlResult = convertToXML(calculate(taxFormUserInput));
              /** HACK END */

              /** Validate our results with the FS form */
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
