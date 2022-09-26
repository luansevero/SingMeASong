before(() => {
    cy.insertData();

});

describe("POST /recommendations/downvote", () => {
    it("Should be decrease the vote and if the vote is -5 the recommendation should be deleted", () => {
        cy.visit("/");
        cy.get('[data-cy="ArrowDown"]').eq(1).click();

    });
});

after(() => {
    cy.resetData();
});