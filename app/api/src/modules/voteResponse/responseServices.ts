import { prisma } from "../../lib/prisma";
import AppError from "../../utils/appError";
import { VoteStatus } from "@prisma/client";



type CreateVoteResponseInput = {
  optionId: string;
};


export async function createVoteResponse(
  buildingId: string,
  voteId: string,
  apartmentId: string,
  data: CreateVoteResponseInput,
) {
    /**
     * 1. Load vote with minimal data
     */
    const vote = await prisma.vote.findFirst({
        where: {
            id: voteId,
            buildingId,
        },
        select: {
            id: true,
            status: true,
        },
    });

    if (!vote) {
        throw new AppError("Vote not found in this building", 404);
    }

    /**
     * 2. Vote must be active
     */
    if (vote.status !== VoteStatus.ACTIVE) {
        throw new AppError("Voting is not active", 400);
    }




    /**
     * 3. Option must belong to the vote
     */
    const option = await prisma.voteOption.findFirst({
        where: {
        id: data.optionId,
        voteId,
        },
        select: { id: true },
    });

    if (!option) {
        throw new AppError("Invalid vote option", 400);
    }

    /**
     * 4. Prevent double voting (explicit check)
     */
    const alreadyVoted = await prisma.voteResponse.findFirst({
        where: {
            voteId,
            apartmentId,
        },
    });

    if (alreadyVoted) {
        throw new AppError("User has already voted", 400);
    }

    /**
        * 5. Apartment must belong to building
    */

    //TODO: Verify apartment ownership (ownerId or tenantId) - Must be added connection between apartment and user/membership
    const apartment = await prisma.apartment.findFirst({
        where: {
            id: apartmentId,
            buildingId,
        },
        select: {
            id: true,
            // ownerId: true, // or tenantId
        },
    });

  if (!apartment) {
    throw new AppError("Apartment not found in this building", 404);
  }

    /**
     * 6. Create response
     */
    return prisma.voteResponse.create({
        data: {
            voteId,
            optionId: data.optionId,
            apartmentId
        },
    });
}


export async function getVoteResponses(buildingId: string, voteId: string) {
    const vote = await prisma.vote.findFirst({
        where: { id: voteId, buildingId },
        select: { id: true },
    });

    if (!vote) {
        throw new AppError("Vote not found in this building", 404);
    }

    return prisma.voteResponse.findMany({
        where: { voteId },
        select: {
            id: true,
            createdAt: true,
            option: {
                select: {
                    id: true,
                    label: true,
                },
            },
            apartment: {
                select: {
                    id: true,
                    number: true,
                },
            },
        },
    });
}


export async function getVoteResults(buildingId: string, voteId: string) {
    const vote = await prisma.vote.findFirst({
        where: { id: voteId, buildingId },
        select: { id: true, status: true },
    });

    if (!vote) {
        throw new AppError("Vote not found in this building", 404);
    }

    if (vote.status !== VoteStatus.CLOSED) {
        throw new AppError("Vote results are not available yet", 400);
    }

    const results = await prisma.voteOption.findMany({
        where: { voteId },
        select: {
            id: true,
            label: true,
            _count: {
                select: {
                    options: true, // VoteResponse relation
                },
            },
        },
    });

    return results.map((opt) => ({
        optionId: opt.id,
        label: opt.label,
        votes: opt._count.options,
    }));
}