import { prisma } from "../../src/database";
import supertest from "supertest";
import app from "../../src/app";
import recommendationFactory from "../factories/recommendationFactory";

const agent = supertest(app);

describe("POST /recommendations", () => {
    it("Given a correct body - StatusCode(201 - Created)", async () => {
        const musicData = recommendationFactory.__createRecommendation("rightLink");
        const response = await agent.post("/recommendations").send(musicData);
        expect(response.status).toBe(201);
    });
    it("Name(from body) is already in used - StatusCode(409 - Conflict)", async () => {
        const musicData = recommendationFactory.__createRecommendation("rightLink");
        const response = await agent.post("/recommendations").send(musicData);
        expect(response.status).toBe(409);
    });
    it("Link(from body) incorrect link format - StatusCode(422 - Unprocessable Entity) ", async () => {
        const musicData = recommendationFactory.__createRecommendation("wrongLink");
        const response = await agent.post("/recommendations").send(musicData);
        expect(response.status).toBe(422);
    });

})

describe("POST /recommendations/:id/upvote", () => {
    it("Given a correct ID - StatusCode(200 - OK!)", async () => {
        const response = await agent.post("/recommendations/1/upvote");
        expect(response.status).toBe(200);

    });
    it("Given a invalid ID - StatusCode(404 - Not found!)", async () => {
        const response = await agent.post("/recommendations/0/upvote");
        expect(response.status).toBe(404);
    });
});

describe("POST /recommendations/:id/downvote", () => {
    it("Given a correct ID - StatusCode(200 - OK!)", async () => {
        const response = await agent.post("/recommendations/1/downvote");
        expect(response.status).toBe(200);
    });
    it("Given a incorrect ID - StatusCode(404 - Not found!)", async () => {
        const response = await agent.post("/recommendations/0/downvote");
        expect(response.status).toBe(404);
    });
    it("Given a correct ID(StatusCode(200 - OK!)) but the ID is deleted(StatusCode(404 - Not found!))", async () => {
        const id = await recommendationFactory.__getWorstRecommendationId();
        const response = await agent.post(`/recommendations/${id}/downvote`);
        const deletedResponse = await agent.post(`/recommendations/${id}/downvote`);
        expect(response.status).toBe(200);
        expect(deletedResponse.status).toBe(404);
    });
})

describe("GET /recommendations", () => {
    it("Get the last 10 recommendations - StatusCode(200 - OK!)", async () => {
        const response = await agent.get(`/recommendations`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
})

describe("GET /recommendations/:id", () => {
    it("Given a valid recommendation id - StatusCode(200 - OK!)", async () => {
        const id = await recommendationFactory.__getBestRecommendationId();
        const response = await agent.get(`/recommendations/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
    it("Given a invalid recommendation id - StatusCode(404 - Not found!)", async () => {
        const response = await agent.get(`/recommendations/0`);
        expect(response.status).toBe(404);
    });
});

describe("GET /recommendations/random", () => {
    it("Get random recommendation - StatusCode(200 - OK!", async () => {
        const response = await agent.get("/recommendations/random");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
    it("Don't have a random recommendation - StatusCode(404 - Not found!", async () => {
        await prisma.$executeRaw`TRUNCATE TABLE "recommendations"`;
        const response = await agent.get("/recommendations/random");
        expect(response.status).toBe(404);
    });
    afterAll(async () => {
        await recommendationFactory.__fillRecommendationTable();
    });
});

describe("GET /recommendation/top/:amount", () => {
    it("Get the top 3 recommendations - StatusCode(200 - OK!)", async () => {
        const response = await agent.get("/recommendations/top/3");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeLessThanOrEqual(3);
    });
    it("Get the top 5 recommendations - StatusCode(200 - OK!)", async () => {
        const response = await agent.get("/recommendations/top/5");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeLessThanOrEqual(5);
    });
    it("Get the top 10 recommendations - StatusCode(200 - OK!)", async () => {
        const response = await agent.get("/recommendations/top/10");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeLessThanOrEqual(10);
    });
})

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "recommendations"`
    await prisma.$disconnect();
})