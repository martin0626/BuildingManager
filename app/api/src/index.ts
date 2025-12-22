import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoter";
import {prisma} from "./lib/prisma";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await prisma.$connect();
  console.log(`API running on port ${PORT}`);
});