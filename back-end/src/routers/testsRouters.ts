import { Router } from "express";
import testController from "../controllers/testController";
const testRouter = Router();

testRouter.get("/insert", testController.insertDatabase);
testRouter.get("/reset", testController.resetDatabase);

export default testRouter;