beforeEach(() => {
  cy.visit("/");
})

describe('GET /recommendations', () => {
  it('Should be visiting the route && Shoulg be gettting up to 10 recommendations', () => {
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("body").find("article").then((recommendation) => {
      expect(recommendation.length).to.be.lessThan(11);
    });
  });
});
