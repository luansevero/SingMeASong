import { prisma } from "../../src/database";

function __createMusic(
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
}

export default {
    __createMusic,
    __getWorstRecommendationId,
    __getBestRecommendationId
}