import { Router } from "express";
import { createApartmentHandler, deleteApartmentHandler, getApartmentByIdHandler, getApartmentsHandler, updateApartmentHandler } from "./apartmentController";
import { roleAuthorize } from "../../middlewares/roleAuthorize";

const router = Router({mergeParams: true});

router
    .post("/", roleAuthorize(["ADMIN", "MANAGER"]), createApartmentHandler)
    .get("/:id", getApartmentByIdHandler)
    .get('/', getApartmentsHandler)
    .patch('/:id', roleAuthorize(["ADMIN", "MANAGER"]), updateApartmentHandler)
    .delete('/:id', roleAuthorize(["ADMIN", "MANAGER"]), deleteApartmentHandler)
export default router;