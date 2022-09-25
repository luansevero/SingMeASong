import recommendationFactory from "../factories/recommendationFactory";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import { not } from "joi";

jest.mock("../../src/repositories/recommendationRepository");

beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe("POST /recommendations", () => {
    it("Insert a new recommendation", async () => {
        const recommendation = recommendationFactory.__createRecommendation("rightLink");
        const findByName = jest
            .spyOn(recommendationRepository, "findByName")
            .mockResolvedValue(null);
        const create = jest
            .spyOn(recommendationRepository, "create")
            .mockResolvedValue();

        const { insert } = recommendationService;

        await expect(insert(recommendation)).resolves.not.toThrow();
        expect(findByName).toBeCalled();
        expect(create).toBeCalled();
    });
    it("Inserting a existing recommendation", async () => {
        const recommendation = recommendationFactory.__createRecommendationData();
        const findByName = jest
            .spyOn(recommendationRepository, "findByName")
            .mockResolvedValue(recommendation);
        const create = jest
            .spyOn(recommendationRepository, "create")
            .mockResolvedValue();

        const { insert } = recommendationService;

        await expect(insert(recommendation)).rejects.toEqual({type: "conflict", message : "Recommendations names must be unique"});
        expect(findByName).toBeCalled();
        expect(create).not.toBeCalled();
    });
});

describe("POST /recommendations/:id/upvote", () => {
    it("Giving a valid ID", async () => {
        const recommendation = recommendationFactory.__createRecommendationData();
        const find = jest
            .spyOn(recommendationRepository, "find")
            .mockResolvedValue(recommendation)
        const updateScore = jest
            .spyOn(recommendationRepository, "updateScore")
            .mockResolvedValue(recommendation)

        const { upvote } = recommendationService;

        await expect(upvote(recommendation["id"])).resolves.not.toThrow();
        expect(find).toBeCalled();
        expect(updateScore).toBeCalled();
    });
    it("Giving a invalid ID", async () => {
        const recommendation = recommendationFactory.__createRecommendationData();
        const find = jest
            .spyOn(recommendationRepository, "find")
            .mockResolvedValue(null)
        const updateScore = jest
            .spyOn(recommendationRepository, "updateScore")
            .mockResolvedValue(recommendation)

        const { upvote } = recommendationService;

        await expect(upvote(recommendation["id"])).rejects.toEqual({type: "not_found", message: ""});
        expect(find).toBeCalled();
        expect(updateScore).not.toBeCalled();
    });

});