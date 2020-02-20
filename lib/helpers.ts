const roundToTwoDecimalsFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

// Not sure if this method is 100% foolproof and correct
// https://stackoverflow.com/a/1726662/3992613
export function roundToTwoDecimals(input: number) {
  return Number(roundToTwoDecimalsFormatter.format(input));
}
