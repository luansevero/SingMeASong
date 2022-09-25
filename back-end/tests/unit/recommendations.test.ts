import recommendationFactory from "../factories/recommendationFactory";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";

jest.mock("../../src/repositories/recommendationRepository");

beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

function spyAndMock(
    functionName :   
        | "create" 
        | "findAll" 
        | "find"
        | "findByName"
        | "updateScore"
        | "getAmountByScore"
        | "remove"
    ,
    value? : any
){
    return jest
        .spyOn(recommendationRepository, functionName)
        .mockResolvedValue(value)
}

describe("POST /recommendations", () => {
    it("Should be : Insert a new recommendation", async () => {
        const recommendation = recommendationFactory.__createRecommendation("rightLink");
        const findByName = spyAndMock("findByName", null);
        const create = spyAndMock("create");
        const { insert } = recommendationService;

        await expect(insert(recommendation)).resolves.not.toThrow();
        expect(findByName).toBeCalled();
        expect(create).toBeCalled();
    });
    it("Should not : Insert a new recommendation", async () => {
        const recommendation = recommendationFactory.__createRecommendationData();
        const findByName = spyAndMock("findByName", recommendation);
        const create = spyAndMock("create");

        const { insert } = recommendationService;

        await expect(insert(recommendation)).rejects.toEqual({type: "conflict", message : "Recommendations names must be unique"});
        expect(findByName).toBeCalled();
        expect(create).not.toBeCalled();
    });
});

describe("POST /recommendations/:id/upvote", () => {
    it("Should be increase in 1 the recommendation score", async () => {
        const recommendation = recommendationFactory.__createRecommendationData();
        const find = spyAndMock("find", recommendation);
        const updateScore = spyAndMock("updateScore", recommendation);

        const { upvote } = recommendationService;

        await expect(upvote(recommendation["id"])).resolves.not.toThrow();
        expect(find).toBeCalled();
        expect(updateScore).toBeCalled();
    });
    it("Should not increase the score from id", async () => {
        const recommendation = recommendationFactory.__createRecommendationData();
        const find = spyAndMock("find", null);
        const updateScore = spyAndMock("updateScore", recommendation);

        const { upvote } = recommendationService;

        await expect(upvote(recommendation["id"])).rejects.toEqual({type: "not_found", message: ""});
        expect(find).toBeCalled();
        expect(updateScore).not.toBeCalled();
    });
});

describe("POST /recommendations/:id/downvote", () => {
    it("Should be decrease in 1 the recommendation score", async () => {
        const recommendation = recommendationFactory.__createRecommendationData();
        const find = spyAndMock("find", recommendation);
        const updateScore = spyAndMock("updateScore", recommendation);
        const remove = spyAndMock("remove");

        const { downvote } = recommendationService;

        await expect(downvote(recommendation["id"])).resolves.not.toThrow();
        expect(find).toBeCalled();
        expect(updateScore).toBeCalled();
        expect(remove).not.toBeCalled();

    })
    it("Should be decrease the score && Deleting the recommendation", async () => {
        const recommendation = recommendationFactory.__createRecommendationData();
        const find = spyAndMock("find", recommendation);
        const updateScore = spyAndMock("updateScore", {
            ...recommendation,
            score : -6
        });
        const remove = spyAndMock("remove");

        const { downvote } = recommendationService;

        await expect(downvote(recommendation["id"])).resolves.not.toThrow();
        expect(find).toBeCalled();
        expect(updateScore).toBeCalled();
        expect(remove).toBeCalled();
    })
    it("Should not decrease the score from id", async () => {
        const recommendation = recommendationFactory.__createRecommendationData();
        const find = spyAndMock("find", null);
        const updateScore = spyAndMock("updateScore", recommendation);
        const remove = spyAndMock("remove")

        const { downvote } = recommendationService;

        await expect(downvote(recommendation["id"])).rejects.toEqual({type: "not_found", message: ""});
        expect(find).toBeCalled();
        expect(updateScore).not.toBeCalled();
        expect(remove).not.toBeCalled();
    })
});

describe("GET /recommendations", () => {
    it("Should be show the last 10 recommendations", async () => {
        const getAll = spyAndMock("findAll");
        const { get } = recommendationService;

        await expect(get()).resolves.not.toThrow();
        expect(getAll).toBeCalled();
    })
});
describe("GET /recommendations/:id", () => {
    it("Should be show the recommendation", async () => {
        const recommendation = recommendationFactory.__createRecommendationData();
        const find = spyAndMock("find", recommendation);
        const { getById } = recommendationService;

        await expect(getById(recommendation["id"])).resolves.not.toThrow();
        expect(find).toBeCalled();
    });
    it("Should not showing the recommendation", async () => {
        const recommendation = recommendationFactory.__createRecommendationData();
        const find = spyAndMock("find", null);
        const { getById } = recommendationService;

        await expect(getById(recommendation["id"])).rejects.toEqual({type: "not_found", message : ""});
        expect(find).toBeCalled();
    })
});