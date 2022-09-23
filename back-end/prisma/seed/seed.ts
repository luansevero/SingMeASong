import {prisma} from "./seedConfig";
import { restartTable } from "./seedRestart";
import seedInsert from "./seedInsert";

async function main(){
    try{
        console.log("(1/6)===Starting seed creation!===");
        await restartTable();
        await seedInsert.recommendations();
        console.log("(6/6)===Seed creation complete!===")
    } catch (e) {
        console.log(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

main();