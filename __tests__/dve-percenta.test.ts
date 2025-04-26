import { validate } from "../src/pages/dve-percenta";
import { testValidation } from "./utils/testValidation";

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    autoformPublicToken: "foobar",
  },
}));

describe("dve-percenta", () => {
  describe("#validate", () => {
    testValidation(validate, [
      {
        input: { dve_percenta_podporujem: undefined },
        expected: ["dve_percenta_podporujem"],
      },
      { input: { dve_percenta_podporujem: "nie" }, expected: [] },
      {
        input: { dve_percenta_podporujem: "ano-inu" },
        expected: ["r142_ico", "r142_obchMeno"],
      },
      {
        input: {
          dve_percenta_podporujem: "ano-inu",
          r142_ico: "1",
          r142_obchMeno: "Fake, o.z.",
        },
        expected: [],
      },
      {
        input: {
          dve_percenta_podporujem: "ano-inu",
          r142_ico: "12 345 67",
          r142_obchMeno: "Fake, o.z.",
        },
        expected: [],
      },
      {
        input: {
          dve_percenta_podporujem: "ano-inu",
          r142_ico: "12 345 678",
          r142_obchMeno: "Fake, o.z.",
        },
        expected: [],
      },
      {
        input: {
          dve_percenta_podporujem: "ano-inu",
          r142_ico: "12 345 6",
          r142_obchMeno: "Fake, o.z.",
        },
        expected: [],
      },
    ]);
  });
});
