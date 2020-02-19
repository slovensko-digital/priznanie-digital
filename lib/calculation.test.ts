import { calculate } from "./calculation";

test("Should calculate r080", () => {
  const input: TaxForm = {
    income: 20000,
    expense: 12000,

    priloha3_r11: 0,
    priloha3_r13: 0
  };
  const result = calculate(input);
  expect(result.r080).toBe(4062.65);
});

test("Should calculate r080 with insurance deduction", () => {
  const input: TaxForm = {
    income: 20000,
    expense: 12000,

    priloha3_r11: 1000,
    priloha3_r13: 1000
  };
  const result = calculate(input);
  expect(result.r080).toBe(2062.65);
});
