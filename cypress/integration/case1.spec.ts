import { withPartnerInput } from "../../__tests__/testCases/withPartnerInput";

import { TaxFormUserInput, TaxForm } from "../../lib/types";
import { convertToXML } from "../../lib/xml/xmlConverter";
import { xml2json } from "xml-js";

const comparable = (xml: string) => xml2json(xml, { compact: true });

function getInput<K extends keyof TaxFormUserInput>(key: K) {
  return cy.get(`input[name="${key}"]`);
}

describe("Case 1", function() {
  it("it successfully completes the flow", function() {
    cy.visit("/");
    cy.contains("Suhlasím").click();
    getInput("t1r10_prijmy").type(withPartnerInput.t1r10_prijmy.toString());
    getInput("priloha3_r11_socialne").type(
      withPartnerInput.priloha3_r11_socialne.toString(),
    );
    getInput("priloha3_r13_zdravotne").type(
      withPartnerInput.priloha3_r13_zdravotne.toString(),
    );

    cy.contains("Dalej").click();

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
    cy.contains("Dalej").click();

    getInput("r001_dic").type(withPartnerInput.r001_dic!.toString());
    getInput("r002_datum_narodenia").type(
      withPartnerInput.r002_datum_narodenia!.toString(),
    );
    getInput("r003_nace").type(withPartnerInput.r003_nace.toString());
    getInput("r004_priezvisko").type(
      withPartnerInput.r004_priezvisko.toString(),
    );
    getInput("r005_meno").type(withPartnerInput.r005_meno.toString());
    getInput("r007_ulica").type(withPartnerInput.r007_ulica.toString());
    getInput("r008_cislo").type(withPartnerInput.r008_cislo.toString());
    getInput("r009_psc").type(withPartnerInput.r009_psc.toString());
    // getInput("r010_obec").type(withPartnerInput.r010_obec.toString());
    getInput("r011_stat").type(withPartnerInput.r011_stat.toString());

    cy.contains("Dalej").click();
    cy.contains("XML");

    // cy.readFile("__tests__/testCases/withPartner.xml").then(
    //   (xmlExpected: string) => {
    //     cy.get(`pre[id="TaxForm"]`)
    //       .invoke("text")
    //       .then(txt => convertToXML(JSON.parse(txt.toString()) as TaxForm))
    //       .then(xmlResult =>
    //         expect(comparable(xmlResult)).to.deep.equal(
    //           comparable(xmlExpected),
    //         ),
    //       );
    //   },
    // );
    // cy.readFile(
    //   "/Users/Jules/repos/work/slovensko.digital/priznanie-digital/__tests__/testCases/withPartner.xml",
    // ).then(console.log);
    cy.visit("file:///Users/Jules/Downloads/form.451/form.451.html");
  });
});
