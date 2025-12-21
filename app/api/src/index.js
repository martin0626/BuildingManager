import express from "express";
import { prisma } from "./lib/prisma";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    req.body.name;
    res.send("Express + TypeScript is working 🚀");
});
app.post("/echo", (req, res) => {
    prisma.user.findMany().then(users => {
        console.log('Users in database:', users);
    });
    return res.json({ received: req.body });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
