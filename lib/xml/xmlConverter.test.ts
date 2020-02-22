import { convertToJson } from "./xmlConverter";
import basicTaxForm from "./basicTaxForm";
import basic from "./basic";

describe("Basic", () => {
  test("Case 1", () => {
    const input = {};
    const result = convertToJson(basicTaxForm);
    expect(result).toMatchObject(basic);
  });
});
