import recommendationFactory from "../factories/recommendationFactory";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import internal from "stream";

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
};

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

    });
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
    });
    it("Should not decrease the score from id", async () => {
        const recommendation = recommendationFactory.__createRecommendationData();
        const find = spyAndMock("find", null);
        const updateScore = spyAndMock("updateScore", recommendation);
        const remove = spyAndMock("remove");

        const { downvote } = recommendationService;

        await expect(downvote(recommendation["id"])).rejects.toEqual({type: "not_found", message: ""});
        expect(find).toBeCalled();
        expect(updateScore).not.toBeCalled();
        expect(remove).not.toBeCalled();
    });
});

describe("GET /recommendations", () => {
    it("Should be show the last 10 recommendations", async () => {
        const getAll = spyAndMock("findAll");
        const { get } = recommendationService;
        await expect(get()).resolves.not.toThrow();
        expect(getAll).toBeCalled();
    });
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
    });
});

describe("GET /recommendations/random", () => {
    // it("Should be returning an recommendation with score > 10 | 70% of time", async () => {
    //     const randomNumber = Math.random();
        // const math = jest.spyOn(Math, "random").mockResolvedValueOnce(0.7);
    // });
    // it("Should be returning an recommendation between -5 and 10 | 30% of time", async () => {

    // });
    // it("IF(Only have recommendations with score > 10 our scorce <=10) Should be returning any recommendation", async () => {

    // });
    it("Should not returning any recommendations", async () => {
        const findAll = spyAndMock("findAll", []);
        const { getRandom } = recommendationService;
        expect(getRandom()).rejects.toEqual({type: "not_found", message:""})
        expect(findAll).toBeCalled();
    })
});

describe('GET /recommendations/top/:amount', () => {
    it("Should be returning 3 recommendation", async () => {
        const amount = 5;
        const recommendations = recommendationFactory.__createManyRecommendantiosn(amount);
        const getAmountByScore = spyAndMock("getAmountByScore", recommendations)
        const { getTop } = recommendationService;
        const topRecommendations = await getTop(amount);
        await expect(getTop(amount)).resolves.not.toThrow();
        expect(getAmountByScore).toBeCalled();
        expect(topRecommendations).toBeInstanceOf(Array);
        expect(topRecommendations).toEqual(recommendations);
        expect(topRecommendations.length).toBeGreaterThanOrEqual(amount);
    })
})
