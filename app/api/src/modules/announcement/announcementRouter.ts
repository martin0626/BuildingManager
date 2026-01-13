import { Router } from "express";
import {  createAnnouncementHandler, getAnnouncementByIdHandler, getAnnouncementsHandler, updateAnnouncementHandler, deleteAnnouncementHandler } from "./announcementController";
import { roleAuthorize } from "../../middlewares/roleAuthorize";

const router = Router({ mergeParams: true });

router
    .post("/", roleAuthorize(["ADMIN", "MANAGER"]), createAnnouncementHandler)
    .get("/:id", getAnnouncementByIdHandler)
    .get('/', getAnnouncementsHandler)
    .patch('/:id', roleAuthorize(["ADMIN", "MANAGER"]), updateAnnouncementHandler)
    .delete('/:id', roleAuthorize(["ADMIN", "MANAGER"]), deleteAnnouncementHandler)
export default router;

