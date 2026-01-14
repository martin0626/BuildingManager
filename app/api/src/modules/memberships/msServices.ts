import { prisma } from "../../lib/prisma";
import AppError from "../../utils/appError";



export async function addMemberToBuilding(
    buildingId: string,
    userId: string,
    userIdToAdd: string,
    isOwner = false
) {

    if(!userId) throw new Error("User ID is required to create a building");

    const requesterMembership = await prisma.membership.findUnique({
        where: {
            userId_buildingId: {
                userId,
                buildingId,
            },
        },
    });

    if (!requesterMembership?.isOwner) {
        throw new AppError("Only owners can add members", 403);
    }

    return prisma.membership.create({
        data: {
            userId: userIdToAdd,
            buildingId,
            isOwner,
        },
    });
}



export async function removeMemberFromBuilding(
    buildingId: string,
    userId: string,
    userIdToRemove: string
) {

    if(!userId) throw new Error("User ID is required to create a building");


    if (userId === userIdToRemove) {
        throw new AppError("Owners cannot remove themselves", 400);
    }

    const requesterMembership = await prisma.membership.findUnique({
        where: {
        userId_buildingId: {
            userId,
            buildingId,
        },
        },
    });

    if (!requesterMembership?.isOwner) {
        throw new AppError("Only owners can remove members", 403);
    }

    return prisma.membership.delete({
        where: {
        userId_buildingId: {
            userId: userIdToRemove,
            buildingId,
        },
        },
    });
}



export async function updateMembershipOwnership(
    buildingId: string,
    userId: string,
    targetUserId: string,
    isOwner: boolean
) {
    const requesterMembership = await prisma.membership.findUnique({
        where: {
        userId_buildingId: {
            userId,
            buildingId,
        },
        },
    });

    if (!requesterMembership?.isOwner) {
        throw new AppError("Only owners can change roles", 403);
    }

    return prisma.membership.update({
        where: {
        userId_buildingId: {
            userId: targetUserId,
            buildingId,
        },
        },
        data: { isOwner },
    });
}


export async function getBuildingMembers(buildingId: string) {
  return prisma.membership.findMany({
    where: { buildingId },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
}