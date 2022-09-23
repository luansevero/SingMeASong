import { prisma } from "./seedConfig";

export async function restartTable(){
    try{
        console.log("(2/6)===Restarting All tables...===");
        await prisma.$queryRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE;`;
        console.log("(3/6)===Restaing is complete===");
    } catch(e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}