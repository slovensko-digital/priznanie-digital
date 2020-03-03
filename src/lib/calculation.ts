import floor from 'lodash.floor';
import { TaxFormUserInput } from '../types/TaxFormUserInput';
import { TaxForm } from '../types/TaxForm';

const NEZDANITELNA_CAST_ZAKLADU = 3937.35;
const PAUSALNE_VYDAVKY_MAX = 20000;
const DAN_Z_PRIJMU_SADZBA = 0.19;

function parseInt10(input: string) {
  return parseInt(input, 10);
}

export function calculate(i: TaxFormUserInput): TaxForm {
  /** Combine default vaules with user input */
  const tf: TaxForm = {
    r001_dic: i.r001_dic,
    r003_nace: i.r003_nace,
    r004_priezvisko: i.r004_priezvisko,
    r005_meno: i.r005_meno,
    r007_ulica: i.r007_ulica,
    r008_cislo: i.r008_cislo,
    r009_psc: i.r009_psc,
    r010_obec: i.r010_obec,
    r011_stat: i.r011_stat,
    r030: 0, // TODO in next use cases
    r031_priezvisko_a_meno: i?.r031_priezvisko_a_meno ?? '',
    r031_rodne_cislo: i?.r031_rodne_cislo ?? '',
    r032_uplatnujem_na_partnera: i?.r032_uplatnujem_na_partnera ?? false,
    r032_partner_vlastne_prijmy: parseInt10(
      i?.r032_partner_vlastne_prijmy ?? '0',
    ),
    r032_partner_pocet_mesiacov: parseInt10(
      i?.r032_partner_pocet_mesiacov ?? '0',
    ),
    r033_partner_kupele: i?.r033_partner_kupele ?? false,
    r033_partner_kupele_uhrady: parseInt10(
      i?.r033_partner_kupele_uhrady ?? '0',
    ),
    r034: i.r034 as any, // TODO
    priloha3_r11_socialne: parseInt10(i.priloha3_r11_socialne),
    priloha3_r13_zdravotne: parseInt10(i.priloha3_r13_zdravotne),
    r038: parseInt10(i?.r038 ?? '0'),
    r039: parseInt10(i?.r039 ?? '0'),

    t1r10_prijmy: parseInt10(i.t1r10_prijmy),
    get t1r2_prijmy() {
      return this.t1r10_prijmy;
    },
    get t1r10_vydavky() {
      return (
        Math.min(this.t1r10_prijmy * 0.6, PAUSALNE_VYDAVKY_MAX) +
        this.priloha3_r08_poistne
      );
    },
    get priloha3_r08_poistne() {
      return this.priloha3_r11_socialne + this.priloha3_r13_zdravotne;
    },
    get r040() {
      return this.r038 - this.r039;
    },
    get r041() {
      return this.t1r10_prijmy;
    },
    get r042() {
      return this.t1r10_vydavky;
    },
    get r043() {
      return Math.abs(this.r041 - this.r042);
    },
    get r047() {
      return this.r043; // this.r044 + this.r045 - this.r046);
    },
    get r055() {
      return this.r047;
    },
    get r057() {
      return this.r055;
    },
    get r072_pred_znizenim() {
      return this.r057 + this.r040;
    },
    get r073() {
      return this.r072_pred_znizenim > 20507 // TODO test both cases here
        ? Math.max(
            0,
            9064.094 - (1 / 4) * (this.r072_pred_znizenim - this.r030),
          )
        : Math.max(0, NEZDANITELNA_CAST_ZAKLADU - this.r030);
    },
    get r074_znizenie_partner() {
      if (this.r032_uplatnujem_na_partnera) {
        return this.r072_pred_znizenim > 36256.38
          ? Math.max(
              0,
              (13001.438 -
                (1 / 4) * this.r072_pred_znizenim -
                Math.max(this.r032_partner_vlastne_prijmy, 0)) *
                (1 / 12) *
                this.r032_partner_pocet_mesiacov,
            )
          : Math.max(
              0,
              (3937.35 - Math.max(this.r032_partner_vlastne_prijmy, 0)) *
                (1 / 12) *
                this.r032_partner_pocet_mesiacov,
            );
      } else {
        return 0;
      }
    },
    get r076_kupele_spolu() {
      return this.r076a_kupele_danovnik + this.r076b_kupele_partner_a_deti;
    },
    r076a_kupele_danovnik: 0, // TODO asi z inputu
    get r076b_kupele_partner_a_deti() {
      return this.r033_partner_kupele_uhrady; // TODO + kupele deti;
    },
    get r077_nezdanitelna_cast() {
      return this.r073 + this.r074_znizenie_partner + this.r076_kupele_spolu; // TODO + tf.r075;
    },
    get r078_zaklad_dane_z_prijmov() {
      return Math.max(this.r072_pred_znizenim - this.r077_nezdanitelna_cast, 0);
    },
    get r080_zaklad_dane_celkovo() {
      return floor(this.r078_zaklad_dane_z_prijmov, 2); // TODO + tf.r065 + tf.r071 + tf.r079)
    },
    get r081() {
      return floor(tf.r080_zaklad_dane_celkovo * DAN_Z_PRIJMU_SADZBA, 2); // TODO high income
    },
    get r090() {
      return this.r081;
    },
    get r105_dan() {
      return this.r081;
    },
    get r107() {
      return this.r081;
    },
    get r113() {
      return this.r107; // TODO - tf.r112;
    },
    get r125_dan_na_uhradu() {
      return this.r105_dan;
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
    },
    get r126_danovy_preplatok() {
      return Math.abs(Math.min(this.r125_dan_na_uhradu, 0));
    },
    datum: i.datum,
    children: i?.children ?? false,
    employed: i?.employed ?? false,
  };

  return tf;
}
