import { Router } from "express";
import {  createOptionHandler, createBulkOptionHandler, getOptionsHandler, updateOptionHandler, deleteOptionHandler } from "./optionsController";


const router = Router({ mergeParams: true });


router
    .post("/", createOptionHandler)
    .post("/bulk", createBulkOptionHandler)
    .get('/', getOptionsHandler)
    .patch('/:id', updateOptionHandler)
    .delete('/:id', deleteOptionHandler)

export default router;