import { prisma } from "../../src/database";
import supertest from "supertest";
import app from "../../src/app";
import recommendationFactory from "../factories/recommendationFactory";

const agent = supertest(app);

describe("POST /recommendations", () => {
    it("Given a correct body - StatusCode(201 - Created)", async () => {
        const musicData = recommendationFactory.__createMusic("rightLink");
        const response = await agent.post("/recommendations").send(musicData);
        expect(response.status).toBe(201);
    });
    it("Name(from body) is already in used - StatusCode(409 - Conflict)", async () => {
        const musicData = recommendationFactory.__createMusic("rightLink");
        const response = await agent.post("/recommendations").send(musicData);
        expect(response.status).toBe(409);
    })
    it("Link(from body) incorrect link format - StatusCode(422 - Unprocessable Entity) ", async () => {
        const musicData = recommendationFactory.__createMusic("wrongLink");
        const response =  await agent.post("/recommendations").send(musicData);
        expect(response.status).toBe(422);
    });

})

describe("POST /recommendations/:id/upvote", () => {
    it("Given a correct ID - StatusCode(200 - OK!)", async () => {
        const response = await agent.post("/recommendations/1/upvote");
        expect(response.status).toBe(200);

    })
    it("Given a invalid ID - StatusCode(404 - Not found!)", async () => {
        const response = await agent.post("/recommendations/0/upvote");
        expect(response.status).toBe(404);
    })
})

afterAll( async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "recommendations"`
    await prisma.$disconnect();
})