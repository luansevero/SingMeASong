import { prisma } from "../database";

async function insertMany (data : any){
    await prisma.recommendation.createMany({data})
    return
}

async function deleteAll (){
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE;`;
    return
}

export default {
    insertMany,
    deleteAll
}