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
    it("Insert a new recommendation", async () => {
        const recommendation = recommendationFactory.__createRecommendation("rightLink");
        const findByName = spyAndMock("findByName", null);
        const create = spyAndMock("create");
        const { insert } = recommendationService;

        await expect(insert(recommendation)).resolves.not.toThrow();
        expect(findByName).toBeCalled();
        expect(create).toBeCalled();
    });
    it("Inserting a existing recommendation", async () => {
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
    it("Giving a valid ID", async () => {
        const recommendation = recommendationFactory.__createRecommendationData();
        const find = spyAndMock("find", recommendation);
        const updateScore = spyAndMock("updateScore", recommendation);

        const { upvote } = recommendationService;

        await expect(upvote(recommendation["id"])).resolves.not.toThrow();
        expect(find).toBeCalled();
        expect(updateScore).toBeCalled();
    });
    it("Giving a invalid ID", async () => {
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
    it("Givin a valid ID", async () => {
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
    it("Givin a valid ID && Deleting the recommendation", async () => {
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
    it("Givin a invalid ID", async () => {
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