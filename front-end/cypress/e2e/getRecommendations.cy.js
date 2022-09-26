beforeEach(() => {
  cy.visit("/top");
})

describe('GET /recommendations', () => {
  it('Should be visiting the route && Shoulg be gettting up to 10 recommendations', () => {
    cy.get('.sc-gsnTZi > :nth-child(1)').click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("body").find("article").then((recommendation) => {
      expect(recommendation.length).to.be.lessThan(11);
    });
  });
});
