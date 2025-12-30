import { Router } from "express";
import { createUserHandler, deleteUserHandler, getAllUserHandler, getSingleUserHandler, updateUserHandler } from "./userController";

const router = Router();

router
    .post("/", createUserHandler)
    .get("/:id", getSingleUserHandler)
    .get('/', getAllUserHandler)
    .patch('/:id', updateUserHandler)
    .delete('/:id', deleteUserHandler)



export default router;