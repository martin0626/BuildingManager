import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../services/userServices";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const { email, fullName, role } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({
        message: "email and fullName are required",
      });
    }

    const user = await createUser({ email, fullName, role });

    return res.status(201).json(user);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getUserHandler(req: Request, res: Response) {
  try {
    const user = await getUserByEmail();
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}