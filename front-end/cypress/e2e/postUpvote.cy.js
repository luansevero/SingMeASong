before(() => {
    cy.insertData();

});

describe("POST /recommendations/upvote", () => {
    it("Should be increase in 1 the score of the music && See if the score increase in 1", () => {
        cy.visit("/");
        let previousScore;
        cy.get('[data-cy="score"]').eq(0).invoke("text").then((score) => {
            previousScore = Number(score);
        });
        cy.get('[data-cy="ArrowUp"]').eq(0).click();
        cy.wait(2000);
        cy.get('[data-cy="score"]').eq(0).invoke("text").then((score) => {
            expect(Number(score)).to.be.greaterThan(previousScore);
        });
    });
});

after(() => {
    cy.resetData();
});