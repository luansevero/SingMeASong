import recommendationFactory from "../factories/recommendationFactory";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";

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
        const recommendation = recommendationFactory.__createRecommendation("rightLink");
        const findByName = jest
            .spyOn(recommendationRepository, "findByName")
            .mockResolvedValue({
                ...recommendation,
                id : 1,
                score : 5
            });
        const create = jest
            .spyOn(recommendationRepository, "create")
            .mockResolvedValue();

        const { insert } = recommendationService;

        await expect(insert(recommendation)).rejects.toEqual({type: "conflict", message : "Recommendations names must be unique"});
        expect(findByName).toBeCalled();
        expect(create).not.toBeCalled();
    });
});