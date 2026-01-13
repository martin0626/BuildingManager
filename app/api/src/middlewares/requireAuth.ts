import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import AppError from "../utils/appError";

export function requireAuth(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authentication required", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = verifyJwt(token);

      req.user = {
        id: payload.sub as string,
        role: payload.role,
      };

      next();
    } catch {
      throw new AppError("Invalid or expired token", 401);
    }
}
