import { Router } from "express";
import { createBuildingHandler, deleteBuildingHandler, getBuildingByIdHandler, getBuildingsHandler, updateBuildingHandler } from "./buildingController";
import apartmentRoutes from "../apartment/apartmentRouter";
import announcementRoutes from "../announcement/announcementRouter";
import expensesRoutes from "../expense/expenseRouter";


const router = Router();


router.use("/:buildingId/apartments", apartmentRoutes);
router.use("/:buildingId/announcements", announcementRoutes);
router.use("/:buildingId/expenses", expensesRoutes);



router
    .post("/", createBuildingHandler)
    .get("/:id", getBuildingByIdHandler)
    .get('/', getBuildingsHandler)
    .patch('/:id', updateBuildingHandler)
    .delete('/:id', deleteBuildingHandler)

export default router;