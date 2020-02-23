import empty from "./empty";
import { TaxForm } from "../types";
import { OutputJson } from "./OutputJson";
import xmljs from "xml-js";

export function convertToJson(taxForm: TaxForm) {
  const form = Object.assign({
    dokument: { hlavicka: {}, telo: {} },
  }) as OutputJson;

  form.dokument.hlavicka.dic = taxForm.r001_dic;
  form.dokument.hlavicka.datumNarodenia = "19.02.2020";
  form.dokument.hlavicka.typDP = {
    rdp: "1",
    odp: "0",
    ddp: "0",
  };
  form.dokument.hlavicka.zdanovacieObdobie = {
    rok: "2019",
    datumDDP: "",
  };
  form.dokument.hlavicka.skNace = {
    k1: "62",
    k2: "01",
    k3: "0",
    cinnost: "Počítačové programovanie",
  }; // TODO parse from t.r003_nace

  form.dokument.hlavicka.priezvisko = taxForm.r004_priezvisko;
  form.dokument.hlavicka.meno = taxForm.r005_meno;
  form.dokument.hlavicka.titul = "";
  form.dokument.hlavicka.titulZa = "";
  form.dokument.hlavicka.adresaTrvPobytu = {
    ulica: taxForm.r007_ulica,
    cislo: taxForm.r008_cislo,
    psc: taxForm.r009_psc,
    obec: taxForm.r010_obec,
    stat: taxForm.r011_stat,
  };
  form.dokument.hlavicka.nerezident = "0";
  form.dokument.hlavicka.prepojeniePar2 = "0";
  form.dokument.hlavicka.adresaObvPobytu = {
    ulica: "",
    cislo: "",
    psc: "",
    obec: "",
  };
  form.dokument.hlavicka.zastupca = {
    priezvisko: "",
    meno: "",
    titul: "",
    titulZa: "",
    rodneCislo: "",
    ulica: "",
    cislo: "",
    psc: "",
    obec: "",
    stat: "",
    tel: "",
    email: "",
  };

  form.dokument.telo.r29 = "0";
  form.dokument.telo.r30 = "0";
  form.dokument.telo.r31 = { priezviskoMeno: "", rodneCislo: "" };
  form.dokument.telo.r32 = {
    uplatnujemNCZDNaManzela: taxForm.r032_uplatnujem_na_partnera ? "1" : "0",
    vlastnePrijmy: "",
    pocetMesiacov: "",
  };
  form.dokument.telo.r33 = {
    uplatNCZDNaKupelStarostlivost: taxForm.r033_partner_kupele ? "1" : "0",
    preukazZaplatUhrady: null,
  };

  const dieta = {
    priezviskoMeno: "",
    rodneCislo: "",
    kupelnaStarostlivost: "0",
    m00: "0",
    m01: "0",
    m02: "0",
    m03: "0",
    m04: "0",
    m05: "0",
    m06: "0",
    m07: "0",
    m08: "0",
    m09: "0",
    m10: "0",
    m11: "0",
    m12: "0",
  };
  form.dokument.telo.r34 = {
    dieta: [dieta, dieta, dieta, dieta],
  };
  form.dokument.telo.r35udajeDalsieDeti = "0";
  form.dokument.telo.r36 = "";
  form.dokument.telo.r37 = {
    uplatDanBonusZaplatUroky: "0",
    zaplateneUroky: "",
    pocetMesiacov: "",
  };
  form.dokument.telo.r38 = "";
  form.dokument.telo.r38a = "";
  form.dokument.telo.r39 = "";
  form.dokument.telo.r40 = "";

  const tabulka = {
    s1: "0",
    s2: "0",
  };
  form.dokument.telo.tabulka1 = {
    t1r1: tabulka,
    t1r2: {
      s1: taxForm.t1r10_prijmy.toFixed(2),
      s2: taxForm.t1r10_vydavky.toFixed(2),
    },
    t1r3: tabulka,
    t1r4: tabulka,
    t1r5: tabulka,
    t1r6: tabulka,
    t1r7: tabulka,
    t1r8: tabulka,
    t1r9: tabulka,
    t1r10: {
      s1: taxForm.t1r10_prijmy.toFixed(2),
      s2: taxForm.t1r10_vydavky.toFixed(2),
    },
    t1r11: tabulka,
    t1r12: tabulka,
    t1r13: tabulka,
  };
  form.dokument.telo.vydavkyPar6ods11_ods1a2 = "0";
  form.dokument.telo.vydavkyPar6ods11_ods3 = "0";
  form.dokument.telo.vydavkyPar6ods11_ods4 = "0";
  form.dokument.telo.vydavkyPar6ods10_ods1a2 = "0";
  form.dokument.telo.vydavkyPar6ods10_ods4 = "0";
  form.dokument.telo.vydavkyPoistPar6ods11_ods1a2 = taxForm.vydavkyPoistne.toFixed(
    2,
  );
  form.dokument.telo.uplatnujemPar17ods17_ods1a2 = "0";
  form.dokument.telo.uplatnujemPar17ods17_ods3a4 = "0";
  form.dokument.telo.ukoncujemUplatnovaniePar17ods17_ods1a2 = "0";
  form.dokument.telo.ukoncujemUplatnovaniePar17ods17_ods3a4 = "0";

  form.dokument.telo.tabulka1a = {
    t1r1: tabulka,
    t1r2: tabulka,
    t1r3: tabulka,
    t1r4: tabulka,
    t1r5: tabulka,
  };

  form.dokument.telo.tabulka1b = {
    t1r1: tabulka,
    t1r2: tabulka,
  };

  form.dokument.telo.r41 = taxForm.r041.toFixed(2);
  form.dokument.telo.r42 = taxForm.r042.toFixed(2);
  form.dokument.telo.r43 = taxForm.r043.toFixed(2);
  form.dokument.telo.r44 = "";
  form.dokument.telo.r45 = "";
  form.dokument.telo.r46 = "";
  form.dokument.telo.r47 = taxForm.r047.toFixed(2);
  form.dokument.telo.r48 = "";
  form.dokument.telo.r49 = { predchObdobie: { rok: "", strata: "" } };
  form.dokument.telo.r50 = { predchObdobie: { rok: "", strata: "" } };
  form.dokument.telo.r51 = { predchObdobie: { rok: "", strata: "" } };
  form.dokument.telo.r52 = { predchObdobie: { rok: "", strata: "" } };
  form.dokument.telo.r53 = "";
  form.dokument.telo.r54 = "";
  form.dokument.telo.r55 = taxForm.r055.toFixed(2);
  form.dokument.telo.r56 = "";
  form.dokument.telo.r57 = taxForm.r057.toFixed(2);
  form.dokument.telo.r58 = "";
  form.dokument.telo.r59 = "";
  form.dokument.telo.r60 = "";
  form.dokument.telo.r61 = "";
  form.dokument.telo.r62 = "";
  form.dokument.telo.r63 = "";
  form.dokument.telo.r64 = "";
  form.dokument.telo.r65 = "";
  form.dokument.telo.tabulka2 = {
    t2r1: tabulka,
    t2r2: tabulka,
    t2r3: tabulka,
    t2r4: tabulka,
    t2r5: tabulka,
    t2r6: tabulka,
    t2r7: tabulka,
    t2r8: tabulka,
    t2r9: tabulka,
    t2r10: tabulka,
    t2r11: tabulka,
    t2r12: { s1: "" },
  };

  form.dokument.telo.r66 = "";
  form.dokument.telo.r67 = "";
  form.dokument.telo.r68 = "";

  form.dokument.telo.tabulka3 = {
    t3r1: tabulka,
    t3r2: tabulka,
    t3r3: tabulka,
    t3r4: tabulka,
    t3r5: tabulka,
    t3r6: tabulka,
    t3r7: tabulka,
    t3r8: tabulka,
    t3r9: tabulka,
    t3r10: tabulka,
    t3r11: tabulka,
    t3r12: tabulka,
    t3r13: tabulka,
    t3r14: tabulka,
    t3r15: tabulka,
    t3r16: tabulka,
    t3r17: tabulka,
    t3r18: { s1: "" },
    t3r19: tabulka,
  };
  form.dokument.telo.r69 = "";
  form.dokument.telo.r70 = "";
  form.dokument.telo.r71 = "";

  form.dokument.telo.r72 = taxForm.r072_pred_znizenim.toFixed(2);
  form.dokument.telo.r73 = taxForm.r073.toFixed(2);
  form.dokument.telo.r71 = "";
  form.dokument.telo.r72 = "";
  form.dokument.telo.r73 = "";
  form.dokument.telo.r74 = "";
  form.dokument.telo.r75 = "";
  form.dokument.telo.r76 = "";
  form.dokument.telo.r76a = "";
  form.dokument.telo.r76b = "";
  form.dokument.telo.r77 = taxForm.r077_nezdanitelna_cast.toFixed(2);
  form.dokument.telo.r78 = taxForm.r078_zaklad_dane_z_prijmov.toFixed(2);
  form.dokument.telo.r79 = "";
  form.dokument.telo.r80 = taxForm.r080_zaklad_dane_celkovo.toFixed(2);
  form.dokument.telo.r81 = taxForm.r081.toFixed(2);
  form.dokument.telo.r82 = "";
  form.dokument.telo.r83 = "";
  form.dokument.telo.r84 = "";
  form.dokument.telo.r85 = "";
  form.dokument.telo.r86 = "";
  form.dokument.telo.r87 = "";
  form.dokument.telo.r88 = "";
  form.dokument.telo.r89 = "";
  form.dokument.telo.r90 = taxForm.r090.toFixed(2);
  form.dokument.telo.r91 = "";
  form.dokument.telo.r92 = "";
  form.dokument.telo.r93 = "";
  form.dokument.telo.r94 = "";
  form.dokument.telo.r95 = "";
  form.dokument.telo.r96 = "";
  form.dokument.telo.r97 = "";
  form.dokument.telo.r98 = "";
  form.dokument.telo.r99 = "";
  form.dokument.telo.r100 = "";
  form.dokument.telo.r101 = "";
  form.dokument.telo.r102 = "";
  form.dokument.telo.r103 = "";
  form.dokument.telo.r104 = "";
  form.dokument.telo.r105 = taxForm.r105_dan.toFixed(2);
  form.dokument.telo.r106 = "";
  form.dokument.telo.r107 = taxForm.r107.toFixed(2);
  form.dokument.telo.r108 = "";
  form.dokument.telo.r109 = "";
  form.dokument.telo.r110 = "";
  form.dokument.telo.r111 = "";
  form.dokument.telo.r112 = "";
  form.dokument.telo.r113 = taxForm.r113.toFixed(2);
  form.dokument.telo.r125 = taxForm.r125_dan_na_uhradu.toFixed(2);

  // TODO doplnit dnesny datum
  form.dokument.telo.datumVyhlasenia = "19.02.2020";

  // TODO zistit co je toto, asi 2 percenta
  form.dokument.telo.neuplatnujem = "1";

  form.dokument.telo.socZdravPoistenie = {
    pr1: {},
    pr11: taxForm.priloha3_r11_socialne.toFixed(2),
    pr13: taxForm.priloha3_r13_zdravotne.toFixed(2),
    priPrimoch6ods1a2VediemPU: "0",
    datum: "19.02.2020",
  };
  // TODO vygenerovat datum plnenia
  form.dokument.telo.socZdravPoistenie.datum = "19.02.2020";

  return form;
}

export function convertToXML(taxForm: TaxForm) {
  const jsonForm = convertToJson(taxForm);
  let XMLForm = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  XMLForm += xmljs.js2xml(jsonForm, { compact: true, spaces: 3 });

  return XMLForm;
}
