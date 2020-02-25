import { withPartnerInput } from "../../__tests__/testCases/withPartnerInput";

describe("The Home Page", function() {
  it("successfully loads", function() {
    cy.visit("/");
    cy.contains("Suhlasím").click();
    cy.get('input[name="t1r10_prijmy"]').type(
      withPartnerInput.t1r10_prijmy.toString(),
    );
  });
});
