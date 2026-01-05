import { Router } from "express";
import { createApartmentHandler, deleteApartmentHandler, getApartmentByIdHandler, getApartmentsHandler, updateApartmentHandler } from "./apartmentController";

const router = Router({mergeParams: true});

router
    .post("/", createApartmentHandler)
    .get("/:id", getApartmentByIdHandler)
    .get('/', getApartmentsHandler)
    .patch('/:id', updateApartmentHandler)
    .delete('/:id', deleteApartmentHandler)

export default router;