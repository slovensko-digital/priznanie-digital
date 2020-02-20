import { TaxForm, TaxFormUserInput } from "./types";
import { roundToTwoDecimals } from "./helpers";

const NEZDANITELNA_CAST_ZAKLADU = 3937.35;
const PAUSALNE_VYDAVKY_MAX = 20000;
const DAN_Z_PRIJMU_SADZBA = 0.19;

export function calculate(taxFormUserInput: TaxFormUserInput) {
  // Make a copy of taxFormUserInput
  const tf: TaxForm = Object.assign({}, taxFormUserInput);

  const flatrateExpenses = tf.t1r10_prijmy * 0.6;
  tf.t1r10_vydavky = Math.min(flatrateExpenses, PAUSALNE_VYDAVKY_MAX);

  // wow toto je uplne sialena ezoterika :D ale tak je definovana business logika, ale tak urcite sa to da zjednodusit
  tf.r041 = tf.t1r10_prijmy;
  tf.r042 =
    tf.t1r10_vydavky + tf.priloha3_r11_socialne + tf.priloha3_r13_zdravotne;
  tf.r043 = Math.abs(tf.r041 - tf.r042);
  tf.r047 = tf.r043; // tf.r044 + tf.r045 - tf.r046);
  tf.r055 = tf.r047;
  tf.r057 = tf.r055;
  tf.r073 = NEZDANITELNA_CAST_ZAKLADU;
  tf.r072 = tf.r057; // + tf.r040;
  tf.r077 = tf.r073; // + tf.r074 + tf.r075 + tf.r076;
  tf.r078 = Math.max(tf.r072 - tf.r077, 0);

  tf.r080_zaklad_dane = tf.r078; //+ tf.r065 + tf.r071 + tf.r079)

  tf.r081 = roundToTwoDecimals(tf.r080_zaklad_dane * DAN_Z_PRIJMU_SADZBA);
  tf.r105_dan = tf.r081;
  return tf;
}

function summary(tf: TaxForm) {
  return {
    "Základ dane": tf.r080_zaklad_dane,
    Daň: tf.r105_dan,
    "Daň na úhradu": tf.r125_dan_na_uhradu
  };
}
