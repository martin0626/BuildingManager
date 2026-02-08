import { Router } from "express";
import { createBuildingHandler, deleteBuildingHandler, getBuildingByIdHandler, getBuildingsHandler, updateBuildingHandler } from "./buildingController";
import apartmentRoutes from "../apartment/apartmentRouter";
import announcementRoutes from "../announcement/announcementRouter";
import voteRoutes from "../votes/voteRouters";
import expensesRoutes from "../expense/expenseRouter";
import membershipRoutes from "../memberships/msRouters";

import { loadBuildingContext } from "../../middlewares/loadBuildingCtx";
import { authorizeBuilding } from "../../middlewares/authorizeBuilding";


const router = Router();


router.use("/:buildingId/apartments", apartmentRoutes);
router.use("/:buildingId/announcements", announcementRoutes);
router.use("/:buildingId/expenses", expensesRoutes);
router.use("/:buildingId/votes", voteRoutes);
router.use("/:buildingId/memberships", membershipRoutes);




router
    .post("/", createBuildingHandler)
    .get("/:buildingId", getBuildingByIdHandler)
    .get('/', getBuildingsHandler)
    .patch('/:buildingId', loadBuildingContext, authorizeBuilding({requireOwner: true}), updateBuildingHandler)
    .delete('/:buildingId', loadBuildingContext, authorizeBuilding({requireOwner: true}), deleteBuildingHandler)

export default router;