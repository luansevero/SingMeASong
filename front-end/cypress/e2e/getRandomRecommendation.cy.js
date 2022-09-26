beforeEach(() => {
    cy.visit("/");
  })
  
  
  describe('GET /recommendations/random', () => {
    it('Should be visiting the route && Should be getting up to the amount size of recommendations', () => {
        cy.get('.sc-gsnTZi > :nth-child(3)').click();
      cy.url().should("eq", "http://localhost:3000/random");
      cy.get("body").find("article").then((recommendation) => {
        expect(recommendation.length).to.be.lessThan(2);
      });
    });
  });
  
  