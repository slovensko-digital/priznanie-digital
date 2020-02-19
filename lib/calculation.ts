function calculateRows(tf: TaxForm) {
  tf.r008 = tf.r009 + tf.income;
  tf.expense = tf.income * 0.6; // TODO max 20 000

  tf.r105 = tf.r081;

  tf = calculateTax(tf);

  return tf;
}

function calculateTax(tf: TaxForm) {
  tf.r125 = 0;
  tf.r126 = 0;

  const tax =
    tf.r105 -
    tf.r106 +
    tf.r108 +
    tf.r110 -
    tf.r112 +
    tf.r114 +
    tf.r116 +
    tf.r117 -
    tf.r118 -
    tf.r119 -
    tf.r120 -
    tf.r121 -
    tf.r122 -
    tf.r123 -
    tf.r124;

  if (tax > 0) {
    tf.r125 = tax;
  } else {
    tf.r126 = tax;
  }

  return tf;
}

function summary(tf: TaxForm) {
  return {
    // "Základ dane": tf.r080,
    Daň: tf.r105,
    "Daň na úhradu": tf.r125,
    "Daňový preplatok": tf.r126
  };
}
