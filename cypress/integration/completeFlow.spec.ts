/* eslint-disable func-names */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="cypress" />

import { withPartnerInput } from '../../__tests__/testCases/withPartnerInput';
import { TaxFormUserInput } from '../../src/types/TaxFormUserInput';
import { convertToXML } from '../../src/lib/xml/xmlConverter';
import { setDate } from '../../src/lib/utils';
import { calculate } from '../../src/lib/calculation';

function getInput<K extends keyof TaxFormUserInput>(key: K) {
  return cy.get(`input[name="${key}"]`);
}

const nextButton = 'Pokračovať';

it('Complete flow', function() {
  const now = new Date(2020, 1, 22);
  cy.visit('/');

  cy.contains('Pripraviť daňové priznanie').click();

  getInput('t1r10_prijmy').type(withPartnerInput.t1r10_prijmy.toString());
  getInput('priloha3_r11_socialne').type(
    withPartnerInput.priloha3_r11_socialne.toString(),
  );
  getInput('priloha3_r13_zdravotne').type(
    withPartnerInput.priloha3_r13_zdravotne.toString(),
  );

  cy.contains(nextButton).click();

  getInput('employed')
    .first()
    .click();
  getInput('r038').type('3000');
  getInput('r039').type('300');
  cy.contains(nextButton).click();

  getInput('r032_uplatnujem_na_partnera')
    .first()
    .click();

  getInput('r031_priezvisko_a_meno').type(
    withPartnerInput.r031_priezvisko_a_meno.toString(),
  );
  getInput('r031_rodne_cislo').type(
    withPartnerInput.r031_rodne_cislo.toString(),
  );
  getInput('r032_partner_vlastne_prijmy').type(
    withPartnerInput.r032_partner_vlastne_prijmy.toString(),
  );
  getInput('r032_partner_pocet_mesiacov').type(
    withPartnerInput.r032_partner_pocet_mesiacov.toString(),
  );
  // getInput("r033_partner_kupele").click();
  // getInput("r033_partner_kupele_uhrady").type(
  //   withPartnerInput.r033_partner_kupele_uhrady.toString(),
  // );
  cy.contains(nextButton).click();

  getInput('children')
    .first()
    .click();

  cy.contains(nextButton).click();

  getInput('r001_dic').type(withPartnerInput.r001_dic?.toString());
  // getInput("r002_datum_narodenia").type(
  //   withPartnerInput.r002_datum_narodenia!.toString(),
  // );
  getInput('r003_nace').type(withPartnerInput.r003_nace.toString());
  getInput('r004_priezvisko').type(withPartnerInput.r004_priezvisko.toString());
  getInput('r005_meno').type(withPartnerInput.r005_meno.toString());
  getInput('r007_ulica').type(withPartnerInput.r007_ulica.toString());
  getInput('r008_cislo').type(withPartnerInput.r008_cislo.toString());
  getInput('r009_psc').type(withPartnerInput.r009_psc.toString());

  getInput('r010_obec').should('have.value', withPartnerInput.r010_obec);
  getInput('r011_stat').type(withPartnerInput.r011_stat.toString());

  cy.contains(nextButton).click();
  cy.contains('XML');

  cy.get(`[data-test="taxFormUserInput"]`)
    .invoke('text')
    .then(output => {
      const taxFormUserInput = setDate(
        JSON.parse(output.toString()) as TaxFormUserInput,
        now,
      );
      const xmlResult = convertToXML(calculate(taxFormUserInput));

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
          expect(stub).to.be.calledWith('Naplnenie formulára prebehlo úspešne');
        });
      cy.get('#errorsContainer').should(el => expect(el.text()).to.be.empty);
    });

  //
});
