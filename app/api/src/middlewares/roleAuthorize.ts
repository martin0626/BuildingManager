import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";



export function roleAuthorize(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userRole = req.user.role as keyof typeof UserRole;

    if (!allowedRoles.includes(UserRole[userRole])) {
      throw new AppError("User Role not authorized!", 403);
    }

    next();
  };
}