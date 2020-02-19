export function calculate(tf: TaxForm) {
  const flatrate_expenses = tf.income * 0.6;
  tf.expense = flatrate_expenses < 20000 ? flatrate_expenses : 20000;

  // wow toto je uplne sialena ezoterika :D ale tak je definovana business logika, ale tak urcite sa to da zjednodusit
  tf.r041 = tf.income;
  tf.r042 = tf.expense + tf.priloha3_r11 + tf.priloha3_r13;
  tf.r043 = Math.abs(tf.r041 - tf.r042);
  tf.r047 = tf.r043; // tf.r044 + tf.r045 - tf.r046);
  tf.r055 = tf.r047;
  tf.r057 = tf.r055;
  tf.r073 = 3937.35;
  tf.r072 = tf.r057; // + tf.r040;
  tf.r077 = tf.r073; // + tf.r074 + tf.r075 + tf.r076;
  tf.r078 = tf.r072 - tf.r077;
  tf.r080 = tf.r078; //+ tf.r065 + tf.r071 + tf.r079)

  return tf;
}

function summary(tf: TaxForm) {
  return {
    "Základ dane": tf.r080,
    Daň: tf.r105,
    "Daň na úhradu": tf.r125
  };
}
