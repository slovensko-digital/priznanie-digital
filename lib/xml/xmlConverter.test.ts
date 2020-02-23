import { convertToJson, convertToXML } from "./xmlConverter";
import basicTaxForm from "./basicTaxForm";
import basic from "./basic";
// import basic from "./basic.xml";

describe("convertToJson", () => {
  test("Case 1", () => {
    const result = convertToJson(basicTaxForm);
    expect(result).toMatchObject(basic);
  });
});

describe("convertToXML", () => {
  test("Case 1", () => {
    const result = convertToXML(basicTaxForm);
    // expect(result).toBe("");
  });
});
