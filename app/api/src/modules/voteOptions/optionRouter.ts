import { Router } from "express";
import {  createOptionHandler, createBulkOptionHandler, getOptionsHandler, updateOptionHandler, deleteOptionHandler } from "./optionsController";
import { roleAuthorize } from "../../middlewares/roleAuthorize";


const router = Router({ mergeParams: true });


router
    .post("/", roleAuthorize(["ADMIN", "MANAGER"]), createOptionHandler)
    .post("/bulk", roleAuthorize(["ADMIN", "MANAGER"]), createBulkOptionHandler)
    .get('/', getOptionsHandler)
    .patch('/:id', roleAuthorize(["ADMIN", "MANAGER"]), updateOptionHandler)
    .delete('/:id', roleAuthorize(["ADMIN", "MANAGER"]), deleteOptionHandler)

export default router;