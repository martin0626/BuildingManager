import { Prisma, VoteStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/appError";



export type CreateVoteInput = {
    title: string;
    description: string;
};

export type UpdateVoteInput = {
    title?: string;
    description?: string;
    status?: string;
};

export type VoteQueryParams = {
    title?: string;
    status?: string;
};

export async function createVote(buildingId: string, data: CreateVoteInput,) {
    // Ensure building exists
    await prisma.building.findUniqueOrThrow({
        where: { id: buildingId },
    });

    return prisma.vote.create({
        data: {
        title: data.title,
        description: data.description,
        buildingId,
        },
    });
}



export async function getAllVotes(buildingId: string, query: VoteQueryParams) {
    const where: Prisma.VoteWhereInput = { buildingId };

    if (query.title !== undefined) {
        where.title = { contains: query.title, mode: "insensitive" };
    }

    if (query.status == VoteStatus.DRAFT || query.status == VoteStatus.ACTIVE || query.status == VoteStatus.CLOSED) {
        where.status = query.status;
    }

    return prisma.vote.findMany({
        where,
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            createdAt: true,
        },
    });
}



export async function getVoteById(buildingId: string, voteId: string) {
    return prisma.vote.findFirst({
        where: {
        id: voteId,
        buildingId,
        },
        include: {
        options: {
            select: {
            id: true,
            label: true,
            },
        },
        responses: {
            select: {
            id: true,
            optionId: true,
            apartmentId: true,
            },
        },
        },
    });
}



export async function updateVote(
  buildingId: string,
  voteId: string,
  data: UpdateVoteInput,
) {
    const vote = await prisma.vote.findFirst({
        where: {
        id: voteId,
        buildingId,
        },
    });

    if (!vote) {
        throw new AppError("Vote not found in this building", 404);
    }

    const responsesCount = await prisma.voteResponse.count({
        where: { voteId },
    });

    /**
     * Do not allow editing title/description
     * after responses exist
     */
    if (
        responsesCount > 0 &&
        (data.title !== undefined || data.description !== undefined)
    ) {
        throw new AppError(
        "Cannot modify vote content after responses have been submitted",
        400,
        );
    }

    /**
        * Status transition validation
    */
    let status: VoteStatus | undefined;

    if (data.status !== undefined) {
    if (!(data.status in VoteStatus)) {
      throw new AppError("Invalid vote status", 400);
    }

    status = VoteStatus[data.status as keyof typeof VoteStatus];

    // Enforce lifecycle rules
    if (vote.status === VoteStatus.CLOSED) {
      throw new AppError("Closed votes cannot be modified", 400);
    }

    if (
      vote.status === VoteStatus.DRAFT &&
      status === VoteStatus.CLOSED
    ) {
      throw new AppError(
        "Vote must be activated before it can be closed",
        400,
      );
    }

    if (
        vote.status === VoteStatus.ACTIVE &&
        status === VoteStatus.DRAFT
        ) {
        throw new AppError(
            "Cannot revert an active vote to draft",
            400,
        );
        }
    }

    return prisma.vote.update({
        where: { id: voteId },
        data: {
        title: data.title,
        description: data.description,
        status,
        },
    });
}



export async function deleteVote(buildingId: string, voteId: string) {
    const vote = await prisma.vote.findFirst({
        where: {
        id: voteId,
        buildingId,
        },
    });

    if (!vote) {
        throw new AppError("Vote not found in this building", 404);
    }

    const responseCount = await prisma.voteResponse.count({
        where: { voteId },
    });

    if (responseCount > 0) {
        throw new AppError(
        "Cannot delete vote with existing responses",
        400,
        );
    }

    return prisma.vote.delete({
        where: { id: voteId },
    });
}



export async function activateVote(buildingId: string, voteId: string) {
    const vote = await prisma.vote.findFirst({
        where: { id: voteId, buildingId },
    });

    if (!vote) {
        throw new AppError("Vote not found", 404);
    }

    if (vote.status !== "DRAFT") {
        throw new AppError("Vote cannot be activated", 400);
    }

    const optionsCount = await prisma.voteOption.count({
        where: { voteId },
    });

    if (optionsCount < 2) {
        throw new AppError("At least two options are required", 400);
    }

    return prisma.vote.update({
        where: { id: voteId },
        data: { status: "ACTIVE" },
    });
}


export async function closeVote(buildingId: string, voteId: string) {
    const vote = await prisma.vote.findFirst({
        where: { id: voteId, buildingId },
    });

    if (!vote) {
        throw new AppError("Vote not found", 404);
    }

    if (vote.status !== "ACTIVE") {
        throw new AppError("Vote is not active", 400);
    }

    return prisma.vote.update({
        where: { id: voteId },
        data: { status: "CLOSED" },
    });
}