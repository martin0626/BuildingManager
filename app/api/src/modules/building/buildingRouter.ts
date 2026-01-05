import { Router } from "express";
import { createBuildingHandler, deleteBuildingHandler, getBuildingByIdHandler, getBuildingsHandler, updateBuildingHandler } from "./buildingController";
import apartmentRoutes from "../apartment/apartmentRouter";

const router = Router();

router.use("/:buildingId/apartments", apartmentRoutes);
router
    .post("/", createBuildingHandler)
    .get("/:id", getBuildingByIdHandler)
    .get('/', getBuildingsHandler)
    .patch('/:id', updateBuildingHandler)
    .delete('/:id', deleteBuildingHandler)

export default router;