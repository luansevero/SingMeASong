import { Request, Response } from "express";
import testService from "../services/testService";
import testRepository from "../repositories/testRepository";

async function insertDatabase(req:Request, res:Response){
    await testService.insertRecommendations();
    return res.status(200).send("All data inserted");
};

async function resetDatabase(req:Request, res:Response){
    await testRepository.deleteAll();
    return res.status(204).send("All data are deleted");
};

export default {
    insertDatabase,
    resetDatabase
};