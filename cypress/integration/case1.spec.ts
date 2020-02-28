/// <reference types="cypress" />

import { withPartnerInput } from "../../__tests__/testCases/withPartnerInput";
import { TaxFormUserInput, TaxForm } from "../../lib/types";
import { convertToXML } from "../../lib/xml/xmlConverter";

function getInput<K extends keyof TaxFormUserInput>(key: K) {
  return cy.get(`input[name="${key}"]`);
}

describe("Case 1", function() {
  it("Complete flow", function() {
    // cy.clock(new Date(2020, 1, 22).getTime());
    // console.log(new Date().toLocaleString("sk-sk"));
    cy.visit("/");

    cy.contains("Pripraviť daňové priznanie").click();

    getInput("t1r10_prijmy").type(withPartnerInput.t1r10_prijmy.toString());
    getInput("priloha3_r11_socialne").type(
      withPartnerInput.priloha3_r11_socialne.toString(),
    );
    getInput("priloha3_r13_zdravotne").type(
      withPartnerInput.priloha3_r13_zdravotne.toString(),
    );

    cy.contains("Pokračovať").click();

    getInput("employed")
      .first()
      .click();
    getInput("r038").type("3000");
    getInput("r039").type("300");
    cy.contains("Pokračovať").click();

    getInput("r032_uplatnujem_na_partnera")
      .first()
      .click();

    getInput("r031_priezvisko_a_meno").type(
      withPartnerInput.r031_priezvisko_a_meno.toString(),
    );
    getInput("r031_rodne_cislo").type(
      withPartnerInput.r031_rodne_cislo.toString(),
    );
    getInput("r032_partner_vlastne_prijmy").type(
      withPartnerInput.r032_partner_vlastne_prijmy.toString(),
    );
    getInput("r032_partner_pocet_mesiacov").type(
      withPartnerInput.r032_partner_pocet_mesiacov.toString(),
    );
    getInput("r033_partner_kupele").click();
    getInput("r033_partner_kupele_uhrady").type(
      withPartnerInput.r033_partner_kupele_uhrady.toString(),
    );
    cy.contains("Pokračovať").click();

    getInput("kids")
      .first()
      .click();

    cy.contains("Pokračovať").click();

    getInput("r001_dic").type(withPartnerInput.r001_dic!.toString());
    // getInput("r002_datum_narodenia").type(
    //   withPartnerInput.r002_datum_narodenia!.toString(),
    // );
    getInput("r003_nace").type(withPartnerInput.r003_nace.toString());
    getInput("r004_priezvisko").type(
      withPartnerInput.r004_priezvisko.toString(),
    );
    getInput("r005_meno").type(withPartnerInput.r005_meno.toString());
    getInput("r007_ulica").type(withPartnerInput.r007_ulica.toString());
    getInput("r008_cislo").type(withPartnerInput.r008_cislo.toString());
    getInput("r009_psc").type(withPartnerInput.r009_psc.toString());
    // cy.wait(1000);
    getInput("r010_obec").type(withPartnerInput.r010_obec.toString());
    getInput("r011_stat").type(withPartnerInput.r011_stat.toString());

    cy.contains("Pokračovať").click();
    cy.contains("XML");

    cy.get(`pre[id="TaxForm"]`)
      .invoke("text")
      .then(txt => convertToXML(JSON.parse(txt.toString()) as TaxForm))
      .then(xmlResult => {
        cy.visit("/form/form.451.html");
        const stub = cy.stub();
        cy.on("window:alert", stub);

        cy.get("#form-button-load").click();
        // @ts-ignore
        cy.get("#form-buttons-load-dialog > input").upload({
          fileContent: xmlResult,
          fileName: "xmlResult.xml",
          mimeType: "application/xml",
          encoding: "utf-8",
        });
        cy.get("#form-buttons-load-dialog-confirm > .ui-button-text").click();
        cy.get("#form-button-validate")
          .click()
          .then(() => {
            expect(stub).to.be.calledWith(
              "Naplnenie formulára prebehlo úspešne",
            );
            cy.get("#errorsContainer")
              .invoke("text")
              .then(errors => expect(errors).to.be.empty);

            // cy.get(`input.warning[type="text"]`).each($el => $el.dblclick());
          });
      });
  });
});
