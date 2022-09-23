import { prisma } from "./seedConfig";

async function recommendations(){
    try{
        console.log("(4/6)===Starting insert recommendations in database===");
        await prisma.recommendation.createMany({
            data : [
                { name :"Metal:Hellsinger - No Tomorrow ft. Serj Tankian from System of a Down", youtubeLink :"https://www.youtube.com/watch?v=CVyPO_tR540", score : 2421},
                { name :"Post Malone - Take What You Want ft. Ozzy Osbourne, Travis Scott", youtubeLink :"https://www.youtube.com/watch?v=LYa_ReqRlcs", score : 11952},
                { name :"Project Vela - I'm Sorry", youtubeLink :"https://www.youtube.com/watch?v=HaP8JsVUYyg", score : 77},
                { name :"Project Vela - You Can't Fix Me", youtubeLink :"https://www.youtube.com/watch?v=P_uPn62oj2s", score : 100},
                { name :"Dark Signal - Heart Like A Hurricane", youtubeLink :"https://www.youtube.com/watch?v=OyqZMdqgQFU", score : 41},
                { name :"Void Chapter - A Thousand Cries", youtubeLink :"https://www.youtube.com/watch?v=_9NMSwk-0M0", score : 54},
                { name :"Ozzy Osbourne - One of Those Days ft. Eric Clapton", youtubeLink :"https://www.youtube.com/watch?v=N7FKAhIVD80", score : 1449},
                { name :"Ozzy Osbourne - A Thousand Shades ft. Jeff Beck", youtubeLink :"https://www.youtube.com/watch?v=ZNVs-dfFUj0", score : 210},
                { name :"One Desire - Battlefield of Love", youtubeLink :"https://www.youtube.com/watch?v=_fy7CJTgFe4", score : 121},
                { name :"One Desire - After You're Gone", youtubeLink :"https://www.youtube.com/watch?v=fquFgJXr48Y", score : 1039},
                { name :"Blue Sky Theory - For a Friend", youtubeLink :"https://www.youtube.com/watch?v=rWqJmee1nfo", score : 3}
            ]
        })
        console.log("(5/6)===All insertings complete===")
    } catch(e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

export default {
    recommendations
}