import { Router } from "express";
import { createBuildingHandler, deleteBuildingHandler, getBuildingByIdHandler, getBuildingsHandler, updateBuildingHandler } from "./buildingController";

const router = Router();

router
    .post("/", createBuildingHandler)
    .get("/:id", getBuildingByIdHandler)
    .get('/', getBuildingsHandler)
    .patch('/:id', updateBuildingHandler)
    .delete('/:id', deleteBuildingHandler)

export default router;