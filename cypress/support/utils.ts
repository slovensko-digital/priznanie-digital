export const visitPage = (url: string): void => {
  cy.window().then((win) => win.sessionStorage.clear())
  cy.visit(url)
}
