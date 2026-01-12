import express from "express";
import dotenv from "dotenv";
import userRoutes from "./modules/user/userRouter";
import buildingRoutes from "./modules/building/buildingRouter";
import {prisma} from "./lib/prisma";
import globalErrorHandler from "./utils/errorsController";
import passport from "passport";
import "./modules/auth/googleStrategy";
import authRoutes from "./modules/auth/authRoutes";
import { requireAuth } from "./middlewares/requireAuth";

dotenv.config();

const app = express();
app.use(express.json());

app.use(passport.initialize());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});


//router.get("/", requireAuth, getBuildingsHandler); - example of protected route with passport
app.use("/users", userRoutes);
app.use("/buildings",  requireAuth, buildingRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await prisma.$connect();
  console.log(`API running on port ${PORT}`);
});

app.use(globalErrorHandler);