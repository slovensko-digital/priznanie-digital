import { calculate } from "./calculation";
import { TaxForm, TaxFormUserInput } from "./types";

describe("r080_zaklad_dane", () => {
  test("Should calculate r080", () => {
    const input: TaxFormUserInput = {
      t1r10_prijmy: 20000,
      t1r10_vydavky: 12000,

      priloha3_r11_socialne: 0,
      priloha3_r13_zdravotne: 0
    };
    const result = calculate(input);
    expect(result.r080_zaklad_dane).toBe(4062.65);
  });

  test("Should calculate r080 with insurance deduction", () => {
    const input: TaxFormUserInput = {
      t1r10_prijmy: 20000,
      t1r10_vydavky: 12000,

      priloha3_r11_socialne: 1000,
      priloha3_r13_zdravotne: 1000
    };
    const result = calculate(input);
    expect(result.r080_zaklad_dane).toBe(2062.65);
  });
});

describe("r105_dan", () => {
  test("Should calculate r080", () => {
    const input: TaxFormUserInput = {
      t1r10_prijmy: 20000,
      t1r10_vydavky: 12000,

      priloha3_r11_socialne: 1000,
      priloha3_r13_zdravotne: 1000
    };
    const result = calculate(input);
    expect(result.r105_dan).toBe(391.9);
  });
});
