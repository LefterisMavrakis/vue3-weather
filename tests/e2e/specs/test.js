// https://docs.cypress.io/api/table-of-contents

describe("Dummy test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("button", "Now");
    cy.contains("button", "Today");
  });
});
