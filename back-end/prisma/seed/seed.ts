import { prisma } from "./seedConfig";
import {restartTable} from "./seedRestart";
import seedInsert from "./seedInsert";

async function main() {
    try {
        console.log("(1/6)===Starting seed creation!===");
        console.log("(2/6)===Restarting All tables...===");
        await restartTable();
        console.log("(3/6)===Restaing is complete===");
        console.log("(4/6)===Starting insert recommendations in database===");
        await seedInsert.recommendations();
        console.log("(5/6)===All insertings complete===");
        console.log("(6/6)===Seed creation complete!===")
    } catch (e) {
        console.log(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

main();