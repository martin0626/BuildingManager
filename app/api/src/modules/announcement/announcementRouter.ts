import { Router } from "express";
import {  createAnnouncementHandler, getAnnouncementByIdHandler, getAnnouncementsHandler, updateAnnouncementHandler, deleteAnnouncementHandler } from "./announcementController";

const router = Router({ mergeParams: true });

router
    .post("/", createAnnouncementHandler)
    .get("/:id", getAnnouncementByIdHandler)
    .get('/', getAnnouncementsHandler)
    .patch('/:id', updateAnnouncementHandler)
    .delete('/:id', deleteAnnouncementHandler)

export default router;

