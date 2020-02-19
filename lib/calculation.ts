function calculate(tf: TaxForm) {
  const flatrate_expenses = tf.income * 0.6;
  tf.expense = flatrate_expenses < 20000 ? flatrate_expenses : 20000;

  return tf;
}

function summary(tf: TaxForm) {
  return {
    "Základ dane": tf.r080,
    Daň: tf.r105,
    "Daň na úhradu": tf.r125
  };
}
