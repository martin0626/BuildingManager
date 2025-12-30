import { Router } from "express";
import { createBuildingHandler, deleteBuildingHandler, getAllBuildingHandler, getSingleBuildingHandler, updateBuildingHandler } from "./buildingController";

const router = Router();

router
    .post("/", createBuildingHandler)
    .get("/:id", getSingleBuildingHandler)
    .get('/', getAllBuildingHandler)
    .patch('/:id', updateBuildingHandler)
    .delete('/:id', deleteBuildingHandler)

export default router;