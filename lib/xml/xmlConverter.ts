import empty from "./empty";
import { TaxForm } from "../types";
import { OutputJson } from "./OutputJson";
import xmljs from "xml-js";

export function convertToJson(f: TaxForm): OutputJson {
  // load empty js object
  const t = Object.assign({}, empty) as OutputJson;
  // const t = empty as OutputJson;

  t.dokument.hlavicka.dic = f.r001_dic;
  t.dokument.hlavicka.skNace = {
    k1: "62",
    k2: "01",
    k3: "0",
    cinnost: "Počítačové programovanie",
  }; // TODO parse from t.r003_nace

  t.dokument.hlavicka.priezvisko = f.r004_priezvisko;
  t.dokument.hlavicka.meno = f.r005_meno;

  t.dokument.hlavicka.adresaTrvPobytu.ulica = f.r007_ulica;
  t.dokument.hlavicka.adresaTrvPobytu.cislo = f.r008_cislo;
  t.dokument.hlavicka.adresaTrvPobytu.psc = f.r009_psc;
  t.dokument.hlavicka.adresaTrvPobytu.obec = f.r010_obec;
  t.dokument.hlavicka.adresaTrvPobytu.stat = f.r011_stat;

  t.dokument.telo.r32.uplatnujemNCZDNaManzela = f.r032_uplatnujem_na_partnera
    ? "1"
    : "0";
  t.dokument.telo.r33.uplatNCZDNaKupelStarostlivost = f.r033_partner_kupele
    ? "1"
    : "0";

  t.dokument.telo.tabulka1.t1r2 = {
    s1: f.t1r10_prijmy.toFixed(2),
    s2: f.t1r10_vydavky.toFixed(2),
  };

  t.dokument.telo.tabulka1.t1r10 = {
    s1: f.t1r10_prijmy.toFixed(2),
    s2: f.t1r10_vydavky.toFixed(2),
  };

  // TODO in calculations
  t.dokument.telo.vydavkyPoistPar6ods11_ods1a2 = f.vydavkyPoistne.toFixed(2);

  t.dokument.telo.r41 = f.r041.toFixed(2);
  t.dokument.telo.r42 = f.r042.toFixed(2);
  t.dokument.telo.r43 = f.r043.toFixed(2);
  t.dokument.telo.r47 = f.r047.toFixed(2);
  t.dokument.telo.r55 = f.r055.toFixed(2);
  t.dokument.telo.r57 = f.r057.toFixed(2);

  t.dokument.telo.r72 = f.r072_pred_znizenim.toFixed(2);
  t.dokument.telo.r73 = f.r073.toFixed(2);
  t.dokument.telo.r77 = f.r077_nezdanitelna_cast.toFixed(2);
  t.dokument.telo.r78 = f.r078_zaklad_dane_z_prijmov.toFixed(2);
  t.dokument.telo.r80 = f.r080_zaklad_dane_celkovo.toFixed(2);
  t.dokument.telo.r81 = f.r081.toFixed(2);
  t.dokument.telo.r90 = f.r090.toFixed(2);
  t.dokument.telo.r105 = f.r105_dan.toFixed(2);
  t.dokument.telo.r107 = f.r107.toFixed(2);
  t.dokument.telo.r113 = f.r113.toFixed(2);
  t.dokument.telo.r125 = f.r125_dan_na_uhradu.toFixed(2);

  // TODO doplnit dnesny datum
  t.dokument.telo.datumVyhlasenia = "19.02.2020";

  // TODO zistim co je toto, asi 2 percenta
  t.dokument.telo.neuplatnujem = "1";

  t.dokument.telo.socZdravPoistenie.pr11 = f.priloha3_r11_socialne.toFixed(2);
  t.dokument.telo.socZdravPoistenie.pr13 = f.priloha3_r13_zdravotne.toFixed(2);
  // TODO vygenerovat datum plnenia
  t.dokument.telo.socZdravPoistenie.datum = "19.02.2020";

  const form: OutputJson = Object.assign({}, t);

  return form;
}

export function convertToXML(taxForm: TaxForm) {
  const jsonForm = convertToJson(taxForm);
  let XMLForm = `<?xml version="1.0" encoding="utf-8"?>`;
  XMLForm += xmljs.js2xml(jsonForm, { compact: true, spaces: 2 });

  return XMLForm;
}
