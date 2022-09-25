import { prisma } from "../../src/database";
import seedInsert from "../../prisma/seed/seedInsert";

function __createRecommendation(
        youtubeMethod : "rightLink" | "wrongLink"
    ){
    const youtubeLink = {
        rightLink : "https://www.youtube.com/watch?v=pYcSTrdDu5g",
        wrongLink : "www.google.com"
    };
    return {
        name : "Majestica - Night Call Girl",
        youtubeLink : youtubeLink[youtubeMethod]
    };
};

function __createRecommendationData(){
    const recommendation = __createRecommendation("rightLink");
    return {
        ...recommendation,
        id: 1,
        score: 5
    }
}

async function __getWorstRecommendationId(){
    const recommendation = await prisma.recommendation.findMany({
        orderBy : { score : "asc"},
        take : 1
    })
    console.log(recommendation[0])
    console.log(recommendation[0]["id"])
    return recommendation[0]["id"]
};

async function __getBestRecommendationId(){
    const recommendation = await prisma.recommendation.findMany({
        orderBy : { score : "desc"},
        take : 1
    });
    return recommendation[0]["id"]
};

async function __fillRecommendationTable(){
    await seedInsert.recommendations();
}

export default {
    __createRecommendation,
    __getWorstRecommendationId,
    __getBestRecommendationId,
    __fillRecommendationTable,
    __createRecommendationData
}