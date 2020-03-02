/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { baseInput } from '../../__tests__/testCases/baseInput';
import { TaxFormUserInput } from '../../src/types/TaxFormUserInput';
import { TaxForm } from '../../src/types/TaxForm';
import { convertToXML } from '../../src/lib/xml/xmlConverter';
import { setDate } from '../../src/lib/utils';

function getInput<K extends keyof TaxFormUserInput>(key: K, suffix = '') {
  return cy.get(`[data-test="${key}-input${suffix}"]`);
}

const nextButton = 'Pokračovať';

describe('Cases', function() {
  it('Basic', function() {
    const now = new Date(2020, 1, 22);
    cy.visit('/');

    cy.contains('Pripraviť daňové priznanie').click();

    /** Prijmy a vydavky */
    getInput('t1r10_prijmy').type(baseInput.t1r10_prijmy.toString());
    getInput('priloha3_r11_socialne').type(
      baseInput.priloha3_r11_socialne.toString(),
    );
    getInput('priloha3_r13_zdravotne').type(
      baseInput.priloha3_r13_zdravotne.toString(),
    );
    cy.contains(nextButton).click();

    /** Zemestnanie */
    getInput('employed', '-no').click();

    cy.contains(nextButton).click();

    /** Partner */
    getInput('r032_uplatnujem_na_partnera', '-no').click();

    cy.contains(nextButton).click();

    /** Kids */
    getInput('kids', '-no').click();

    cy.contains(nextButton).click();

    /** Osobne udaje */
    getInput('r001_dic').type(baseInput.r001_dic?.toString());
    getInput('r003_nace').type(baseInput.r003_nace.toString());
    getInput('r004_priezvisko').type(baseInput.r004_priezvisko.toString());
    getInput('r005_meno').type(baseInput.r005_meno.toString());
    getInput('r007_ulica').type(baseInput.r007_ulica.toString());
    getInput('r008_cislo').type(baseInput.r008_cislo.toString());
    getInput('r009_psc').type(baseInput.r009_psc.toString());
    getInput('r010_obec').should('have.value', baseInput.r010_obec);
    getInput('r011_stat').type(baseInput.r011_stat.toString());

    cy.contains(nextButton).click();

    /** Summary */
    cy.contains('XML');

    cy.get(`pre[id="TaxForm"]`)
      .invoke('text')
      .then(xmlJson => {
        const taxForm = setDate(JSON.parse(xmlJson.toString()) as TaxForm, now);
        const xmlResult = convertToXML(taxForm);

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

        cy.get('#form-buttons-load-dialog-confirm > .ui-button-text').click();
        cy.get('#form-button-validate')
          .click()
          .should(() => {
            expect(stub).to.be.calledWith(
              'Naplnenie formulára prebehlo úspešne',
            );
          });
        cy.get('#errorsContainer').should(el => expect(el.text()).to.be.empty);
      });

    //
  });
});
