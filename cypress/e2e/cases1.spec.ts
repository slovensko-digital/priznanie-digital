import { executeAllTestCases } from "./executeCase";

describe("Cases", () => {
  executeAllTestCases([
    "base",
    "withPartner",
    "withEmployment",
    "withPension",
    "withChildren",
    "withChildren2",
  ]);
});
