import { calculate } from "./calculation";

test("Should calculate r080", () => {
  const input: TaxForm = {
    income: 20000,
    expense: 12000,

    priloha3_r11_socialne: 0,
    priloha3_r13_zdravotne: 0
  };
  const result = calculate(input);
  expect(result.r080_zaklad_dane).toBe(4062.65);
});

test("Should calculate r080 with insurance deduction", () => {
  const input: TaxForm = {
    income: 20000,
    expense: 12000,

    priloha3_r11_socialne: 1000,
    priloha3_r13_zdravotne: 1000
  };
  const result = calculate(input);
  expect(result.r080_zaklad_dane).toBe(2062.65);
});
