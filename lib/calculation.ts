import { TaxForm, TaxFormUserInput } from "./types";

const nezdanitelnaCastZakladu = 3937.35;
const flatrateExpensesMax = 20000;

export function calculate(taxFormUserInput: TaxFormUserInput) {
  // Make a copy of taxFormUserInput
  const tf: TaxForm = Object.assign({}, taxFormUserInput);

  const flatrateExpenses = tf.t1r10_prijmy * 0.6;
  tf.t1r10_vydavky = Math.min(flatrateExpenses, flatrateExpensesMax);

  // wow toto je uplne sialena ezoterika :D ale tak je definovana business logika, ale tak urcite sa to da zjednodusit
  tf.r041 = tf.t1r10_prijmy;
  tf.r042 =
    tf.t1r10_vydavky + tf.priloha3_r11_socialne + tf.priloha3_r13_zdravotne;
  tf.r043 = Math.abs(tf.r041 - tf.r042);
  tf.r047 = tf.r043; // tf.r044 + tf.r045 - tf.r046);
  tf.r055 = tf.r047;
  tf.r057 = tf.r055;
  tf.r073 = nezdanitelnaCastZakladu;
  tf.r072 = tf.r057; // + tf.r040;
  tf.r077 = tf.r073; // + tf.r074 + tf.r075 + tf.r076;
  tf.r078 = Math.max(tf.r072 - tf.r077, 0);

  tf.r080_zaklad_dane = tf.r078; //+ tf.r065 + tf.r071 + tf.r079)

  return tf;
}

function summary(tf: TaxForm) {
  return {
    "Základ dane": tf.r080_zaklad_dane,
    Daň: tf.r105_dan,
    "Daň na úhradu": tf.r125_dan_na_uhradu
  };
}
