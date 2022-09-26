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

function __createManyRecommendantiosn(amount : number){
    let index = amount;
    if(amount > 10) index = 10;
    const recommendantions : any = []
    for(let i = 0; i < amount; i++){
        const recommendation = {
            id : i + 1,
            name : `${i}A${i}B`,
            youtubeLink: `https>//www.youtube.com/watch?v=${i}1${i+1}A`,
            score : `${i}`
        }
        recommendantions.push(recommendation);
    }
    return recommendantions;
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
    __createRecommendationData,
    __createManyRecommendantiosn
}