import { calculate } from "./calculation";
import { TaxForm, TaxFormUserInput } from "./types";

describe("r080_zaklad_dane", () => {
  test("Case 1", () => {
    const input: TaxFormUserInput = {
      t1r10_prijmy: 20000,

      priloha3_r11_socialne: 0,
      priloha3_r13_zdravotne: 0,
    };
    const result = calculate(input);
    expect(result.r080_zaklad_dane).toBe(4062.65);
  });

  test("Case 2", () => {
    const input: TaxFormUserInput = {
      t1r10_prijmy: 20000,

      priloha3_r11_socialne: 1000,
      priloha3_r13_zdravotne: 1000,
    };
    const result = calculate(input);
    expect(result.r080_zaklad_dane).toBe(2062.65);
  });
});

describe("r105_dan", () => {
  test("Case 1", () => {
    const input: TaxFormUserInput = {
      t1r10_prijmy: 20000,

      priloha3_r11_socialne: 1000,
      priloha3_r13_zdravotne: 1000,
    };
    const result = calculate(input);
    expect(result.r105_dan).toBe(391.9);
  });

  test("Case 2", () => {
    const input: TaxFormUserInput = {
      t1r10_prijmy: 30000,

      priloha3_r11_socialne: 2000,
      priloha3_r13_zdravotne: 2000,
    };
    const result = calculate(input);
    expect(result.r105_dan).toBe(771.9);
  });

  test("Case 3 (high income)", () => {
    const input: TaxFormUserInput = {
      t1r10_prijmy: 45000,

      priloha3_r11_socialne: 1000,
      priloha3_r13_zdravotne: 1000,
    };
    const result = calculate(input);
    expect(result.r105_dan).toBe(3740.32);
  });

  test("Case 4 (high income 2)", () => {
    const input: TaxFormUserInput = {
      t1r10_prijmy: 51000,

      priloha3_r11_socialne: 1000,
      priloha3_r13_zdravotne: 1320,
    };
    const result = calculate(input);
    expect(result.r105_dan).toBe(5089.32);
  });
});
