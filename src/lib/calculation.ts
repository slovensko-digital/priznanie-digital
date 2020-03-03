import floor from 'lodash.floor';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { TaxForm } from '../types/TaxForm';

const NEZDANITELNA_CAST_ZAKLADU = 3937.35;
const PAUSALNE_VYDAVKY_MAX = 20000;
const DAN_Z_PRIJMU_SADZBA = 0.19;

function parseInt10(input: string) {
  return parseInt(input, 10);
}

export function calculate(input: TaxFormUserInput): TaxForm {
  /** Combine default vaules with user input */
  const tf: TaxForm = {
    r001_dic: input.r001_dic,
    r003_nace: input.r003_nace,
    r004_priezvisko: input.r004_priezvisko,
    r005_meno: input.r005_meno,
    r007_ulica: input.r007_ulica,
    r008_cislo: input.r008_cislo,
    r009_psc: input.r009_psc,
    r010_obec: input.r010_obec,
    r011_stat: input.r011_stat,
    r031_priezvisko_a_meno: input.r031_priezvisko_a_meno,
    r031_rodne_cislo: input.r031_rodne_cislo,
    r032_uplatnujem_na_partnera: input.r032_uplatnujem_na_partnera,
    r032_partner_vlastne_prijmy: parseInt10(
      input?.r032_partner_vlastne_prijmy ?? '0',
    ),
    r032_partner_pocet_mesiacov: parseInt10(
      input?.r032_partner_pocet_mesiacov ?? '0',
    ),
    r033_partner_kupele: input.r033_partner_kupele,
    r033_partner_kupele_uhrady: parseInt10(
      input?.r033_partner_kupele_uhrady ?? '0',
    ),
    t1r10_prijmy: parseInt10(input.t1r10_prijmy),
    priloha3_r11_socialne: parseInt10(input.priloha3_r11_socialne),
    priloha3_r13_zdravotne: parseInt10(input.priloha3_r13_zdravotne),
    employed: input.employed,
    r038: parseInt10(input?.r038 ?? '0'),
    r039: parseInt10(input?.r039 ?? '0'),
  };
  const flatrateExpenses = tf.t1r10_prijmy * 0.6;

  tf.priloha3_r08_poistne =
    tf.priloha3_r11_socialne + tf.priloha3_r13_zdravotne;
  tf.t1r10_vydavky =
    Math.min(flatrateExpenses, PAUSALNE_VYDAVKY_MAX) + tf.priloha3_r08_poistne;
  tf.t1r2_prijmy = tf.t1r10_prijmy;

  tf.r030 = 0; // TODO in next use cases

  /** Employed */
  tf.r040 = tf.r038 - tf.r039;

  tf.r041 = tf.t1r10_prijmy;
  tf.r042 = tf.t1r10_vydavky;
  tf.r043 = Math.abs(tf.r041 - tf.r042);
  tf.r047 = tf.r043; // tf.r044 + tf.r045 - tf.r046);
  tf.r055 = tf.r047;
  tf.r057 = tf.r055;
  tf.r072_pred_znizenim = tf.r057 + tf.r040;
  tf.r073 =
    tf.r072_pred_znizenim > 20507 // TODO test both cases here
      ? Math.max(0, 9064.094 - (1 / 4) * (tf.r072_pred_znizenim - tf.r030)) // WTF Black Magic
      : Math.max(0, NEZDANITELNA_CAST_ZAKLADU - tf.r030);

  /** Partner */
  if (tf.r032_uplatnujem_na_partnera) {
    tf.r074_znizenie_partner = // TODO test both cases here
      tf.r072_pred_znizenim > 36256.38
        ? Math.max(
            0,
            (13001.438 -
              (1 / 4) * tf.r072_pred_znizenim -
              Math.max(tf.r032_partner_vlastne_prijmy, 0)) *
              (1 / 12) *
              tf.r032_partner_pocet_mesiacov,
          )
        : Math.max(
            0,
            (3937.35 - Math.max(tf.r032_partner_vlastne_prijmy, 0)) *
              (1 / 12) *
              tf.r032_partner_pocet_mesiacov,
          );
  } else {
    tf.r074_znizenie_partner = 0;
  }

  tf.r076a_kupele_danovnik = 0; // TODO asi z inputu
  tf.r076b_kupele_partner_a_deti = tf.r033_partner_kupele_uhrady; // TODO + kupele deti;
  tf.r076_kupele_spolu =
    tf.r076a_kupele_danovnik + tf.r076b_kupele_partner_a_deti;

  tf.r077_nezdanitelna_cast =
    tf.r073 + tf.r074_znizenie_partner + tf.r076_kupele_spolu; // TODO + tf.r075;

  tf.r078_zaklad_dane_z_prijmov = Math.max(
    tf.r072_pred_znizenim - tf.r077_nezdanitelna_cast,
    0,
  );

  tf.r080_zaklad_dane_celkovo = floor(tf.r078_zaklad_dane_z_prijmov, 2); // TODO + tf.r065 + tf.r071 + tf.r079)

  tf.r081 = floor(tf.r080_zaklad_dane_celkovo * DAN_Z_PRIJMU_SADZBA, 2); // TODO high income
  tf.r090 = tf.r081;
  tf.r105_dan = tf.r081;
  tf.r107 = tf.r081;
  tf.r113 = tf.r107; // TODO - tf.r112;
  tf.r125_dan_na_uhradu = tf.r105_dan;
  // - tf.r106 +
  // tf.r108 +
  // tf.r110 -
  // tf.r112 +
  // tf.r114 +
  // tf.r116 +
  // tf.r117 -
  // tf.r118 -
  // tf.r119 -
  // tf.r120 -
  // tf.r121 -
  // tf.r122 -
  // tf.r123 -
  // tf.r124;
  tf.r126_danovy_preplatok = Math.abs(Math.min(tf.r125_dan_na_uhradu, 0));
  tf.datum = input.datum;
  return tf;
}
