import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { NextFunction, Request, Response } from "express";

export async function loadBuildingContext(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    const buildingId = req.params.buildingId;

    if (!buildingId) {
        throw new AppError("Building ID is required", 400);
    }

    const [building, membership] = await Promise.all([
        prisma.building.findUnique({
            where: { id: buildingId },
        }),
        prisma.membership.findUnique({
            where: {
                userId_buildingId: {
                    userId: req.user!.id,
                    buildingId,
                },
            },
        }),
    ]);

    if (!building) {
        throw new AppError("Building not found", 404);
    }

    req.building = building;
    req.membership = membership; 

    next();
}
