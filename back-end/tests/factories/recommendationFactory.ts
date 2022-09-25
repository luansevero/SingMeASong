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

async function __getWorstRecommendation(){
    const recommendation = await prisma.recommendation.findMany({
        orderBy : { score : "asc"},
        take : 1
    })
    console.log(recommendation[0])
    console.log(recommendation[0]["id"])
    return recommendation[0]["id"]
}

export default {
    __createMusic,
    __getWorstRecommendation
}