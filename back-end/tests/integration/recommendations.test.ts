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

afterAll( async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "recommendations"`
    await prisma.$disconnect();
})