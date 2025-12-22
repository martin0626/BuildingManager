import { Router } from "express";
import { createUserHandler, getUserHandler } from "../controllers/userController";

const router = Router();

router.post("/", createUserHandler).get('/', getUserHandler);

export default router;