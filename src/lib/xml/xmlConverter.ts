import xmljs from 'xml-js';
import cloneDeep from 'lodash.clonedeep';
import schemaSample from './schemaSample';
import { TaxForm } from '../../types/TaxForm';
import { OutputJson } from './OutputJson';

// TODO remove fallbacks, they should be unncessary now
export function convertToJson(taxForm: TaxForm): OutputJson {
  const form: OutputJson = cloneDeep(schemaSample);

  form.dokument.hlavicka.dic = taxForm.r001_dic;
  // Form.dokument.hlavicka.datumNarodenia = taxForm.r002_datum_narodenia;
  form.dokument.hlavicka.skNace = {
    k1: '62',
    k2: '01',
    k3: '0',
    cinnost: 'Počítačové programovanie',
  };

  form.dokument.hlavicka.priezvisko = taxForm.r004_priezvisko;
  form.dokument.hlavicka.meno = taxForm.r005_meno;
  form.dokument.hlavicka.adresaTrvPobytu.ulica = taxForm.r007_ulica;
  form.dokument.hlavicka.adresaTrvPobytu.cislo = taxForm.r008_cislo;
  form.dokument.hlavicka.adresaTrvPobytu.psc = taxForm.r009_psc;
  form.dokument.hlavicka.adresaTrvPobytu.obec = taxForm.r010_obec;
  form.dokument.hlavicka.adresaTrvPobytu.stat = taxForm.r011_stat;

  form.dokument.telo.r32.uplatnujemNCZDNaManzela = taxForm.r032_uplatnujem_na_partnera
    ? '1'
    : '0';

  form.dokument.telo.r33.uplatNCZDNaKupelStarostlivost = taxForm.r033_partner_kupele
    ? '1'
    : '0';

  form.dokument.telo.tabulka1.t1r2.s1 = taxForm.t1r2_prijmy.toFixed(2);
  form.dokument.telo.tabulka1.t1r10.s1 = taxForm.t1r10_prijmy.toFixed(2);
  form.dokument.telo.tabulka1.t1r10.s2 = taxForm.t1r10_vydavky.toFixed(2);

  form.dokument.telo.vydavkyPoistPar6ods11_ods1a2 = taxForm.priloha3_r08_poistne.toFixed(
    2,
  );
  if (taxForm.r029_poberal_dochodok) {
    form.dokument.telo.r29 = taxForm.r029_poberal_dochodok ? '1' : '0';
    form.dokument.telo.r30 = taxForm.r030_vyska_dochodku.toFixed(2);
  }

  /** SECTION Partner */
  if (taxForm.r032_uplatnujem_na_partnera) {
    form.dokument.telo.r31 = {
      priezviskoMeno: taxForm?.r031_priezvisko_a_meno ?? '',
      rodneCislo: taxForm?.r031_rodne_cislo ?? '',
    };
    form.dokument.telo.r32 = {
      uplatnujemNCZDNaManzela: taxForm.r032_uplatnujem_na_partnera ? '1' : '0',
      vlastnePrijmy: taxForm?.r032_partner_vlastne_prijmy?.toFixed(2) ?? '',
      pocetMesiacov: taxForm?.r032_partner_pocet_mesiacov?.toString() ?? '',
    };

    form.dokument.telo.r33 = {
      uplatNCZDNaKupelStarostlivost: taxForm.r033_partner_kupele ? '1' : '0',
      preukazZaplatUhrady: taxForm.r033_partner_kupele_uhrady?.toFixed(2) ?? '',
    };

    form.dokument.telo.r74 = taxForm.r074_znizenie_partner?.toFixed(2) ?? '';
    form.dokument.telo.r76 = taxForm.r076_kupele_spolu?.toFixed(2) ?? '';
    form.dokument.telo.r76b =
      taxForm.r076b_kupele_partner_a_deti?.toFixed(2) ?? '';
  }

  /** SECTION Mortgage */
  if (taxForm.r037_uplatnuje_uroky) {
    form.dokument.telo.r37 = {
      uplatDanBonusZaplatUroky: taxForm.r037_uplatnuje_uroky ? '1' : '0',
      zaplateneUroky: taxForm.r037_zaplatene_uroky.toFixed(2),
      pocetMesiacov: taxForm.r037_pocetMesiacov.toFixed(),
    };
    form.dokument.telo.r112 = taxForm.r112.toFixed(2);
    form.dokument.telo.r115 = taxForm.r115.toFixed(2);
  }
  /** SECTION Employed */
  if (taxForm.employed) {
    form.dokument.telo.r38 = taxForm.r038?.toFixed(2) ?? '0';
    form.dokument.telo.r39 = taxForm.r039?.toFixed(2) ?? '0';
    form.dokument.telo.r40 = taxForm.r040?.toFixed(2) ?? '0';
    form.dokument.telo.socZdravPoistenie.pr8 = taxForm.r039?.toFixed(2) ?? '0';
  }
  form.dokument.telo.r41 = taxForm.r041?.toFixed(2) ?? '';
  form.dokument.telo.r42 = taxForm.r042?.toFixed(2) ?? '';
  form.dokument.telo.r43 = taxForm.r043?.toFixed(2) ?? '';
  form.dokument.telo.r47 = taxForm.r047?.toFixed(2) ?? '';
  form.dokument.telo.r55 = taxForm.r055?.toFixed(2) ?? '';
  form.dokument.telo.r57 = taxForm.r057?.toFixed(2) ?? '';

  form.dokument.telo.r72 = taxForm.r072_pred_znizenim.toFixed(2);
  form.dokument.telo.r73 = taxForm.r073.toFixed(2);
  form.dokument.telo.r77 = taxForm.r077_nezdanitelna_cast.toFixed(2);
  form.dokument.telo.r78 = taxForm.r078_zaklad_dane_z_prijmov.toFixed(2);
  form.dokument.telo.r80 = taxForm.r080_zaklad_dane_celkovo.toFixed(2);
  form.dokument.telo.r81 = taxForm.r081.toFixed(2);
  form.dokument.telo.r90 = taxForm.r090.toFixed(2);
  form.dokument.telo.r105 = taxForm.r105_dan.toFixed(2);
  form.dokument.telo.r107 = taxForm.r107.toFixed(2);
  form.dokument.telo.r113 = taxForm.r113.toFixed(2);
  form.dokument.telo.r114 = '';

  form.dokument.telo.r125 = taxForm.r125_dan_na_uhradu.toFixed(2);
  form.dokument.telo.neuplatnujem = '1';

  // TODO doplnit dnesny datum
  form.dokument.telo.datumVyhlasenia = taxForm.datum;

  form.dokument.telo.socZdravPoistenie.pr11 = taxForm.priloha3_r11_socialne.toFixed(
    2,
  );
  form.dokument.telo.socZdravPoistenie.pr13 = taxForm.priloha3_r13_zdravotne.toFixed(
    2,
  );

  form.dokument.telo.socZdravPoistenie.datum = taxForm.datum;

  return form;
}

export function convertToXML(taxForm: TaxForm) {
  const jsonForm = convertToJson(taxForm);
  let XMLForm = `<?xml version="1.0" encoding="utf-8"?>\n`;
  XMLForm += xmljs.js2xml(jsonForm, {
    compact: true,
    spaces: 3,
  });

  return XMLForm;
}
