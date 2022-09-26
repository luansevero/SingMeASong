import { prisma } from "./seedConfig";

export async function restartTable(){
    try{
        await prisma.$queryRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE;`;
    } catch(e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}