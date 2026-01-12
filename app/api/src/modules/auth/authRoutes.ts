import { Router } from "express";
import {
  googleAuth,
  googleAuthCallback,
  logout,
} from "./authController";

const router = Router();

router.get("/google", googleAuth);

router.get("/google/callback", googleAuthCallback);

router.post("/logout", logout);

export default router;
