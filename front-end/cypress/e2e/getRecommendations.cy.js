describe('GET /recommendations', () => {
  it('Should be visiting the route', () => {
    cy.visit("/");
    cy.url().should("eq", "http://localhost:3000/");
  });
  it("Shoulg be gettting up to 10 recommendations", () => {
    cy.get("body").find("article").then((arroz) => {
      expect(arroz.length).to.be.lessThan(11);
    });
  });
});
