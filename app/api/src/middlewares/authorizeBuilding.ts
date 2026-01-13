import { UserRole } from "@prisma/client";
import AppError from "../utils/appError";
import { NextFunction, Request, Response } from "express";

type Options = {
  requireMember?: boolean;
  requireOwner?: boolean;
};

export function authorizeBuilding(options: Options = {}) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { user, building, membership } = req;

    if (!user || !building) {
      throw new AppError("Invalid authorization context", 500);
    }

    // ADMIN always allowed
    if (user.role === UserRole.ADMIN) {
      return next();
    }

    // Building creator / manager
    if (building.managerId === user.id) {
      return next();
    }

    // Owner inside membership
    if (options.requireOwner && membership?.isOwner) {
      return next();
    }

    // Any member
    if (options.requireMember && membership) {
      return next();
    }

    throw new AppError("Not authorized for this action", 403);
  };
}