import { validate } from "../src/pages/odklad/prijmy-zo-zahranicia";
import { testValidation } from "./utils/testValidation";

describe("odklad/prijmy-zo-zahranicia", () => {
  describe("#validate", () => {
    testValidation(validate, [
      {
        input: { prijmy_zo_zahranicia: undefined },
        expected: ["prijmy_zo_zahranicia"],
      },
      { input: { prijmy_zo_zahranicia: true }, expected: [] },
      { input: { prijmy_zo_zahranicia: false }, expected: [] },
    ]);
  });
});
