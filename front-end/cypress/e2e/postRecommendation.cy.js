beforeEach(() => {
    cy.visit("/top");
});

describe('GET /recommendations', () => {
    it('Should be creating a new recommendation', () => {
      cy.get('.sc-gsnTZi > :nth-child(1)').click();
      cy.url().should("eq", "http://localhost:3000/");

      cy.get('[data-cy="name"]').type("Project Vela - Never Let Her Go");
      cy.get('[data-cy="youtubeLink"]').type("https://www.youtube.com/watch?v=QU5iITYpYN8");
      cy.get('[data-cy="create"]').click();

    });
    it('Should not creating a new recommendation', () => {
        cy.get('.sc-gsnTZi > :nth-child(1)').click();
        cy.url().should("eq", "http://localhost:3000/");
  
        cy.get('[data-cy="name"]').type("Project Vela - Never Let Her Go");
        cy.get('[data-cy="youtubeLink"]').type("https://www.youtube.com/watch?v=QU5iITYpYN8");
        cy.get('[data-cy="create"]').click();
  
      });
  });

  afterAll(() => {
    
  })