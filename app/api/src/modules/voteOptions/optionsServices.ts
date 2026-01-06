import { prisma } from "../../lib/prisma";
import AppError from "../../utils/appError";
import { VoteStatus } from "@prisma/client";


export type CreateVoteOptionInput = {
  label: string;
};

export type BulkCreateVoteOptionsInput = {
  labels: string[];
};


export async function createVoteOption(voteId: string, data: CreateVoteOptionInput) {
    const vote = await prisma.vote.findUnique({
        where: { id: voteId },
        select: {
            id: true,
            status: true,
        },
    });

    if (!vote) {
        throw new AppError("Vote not found", 404);
    }

    // Business rule: options cannot be added after vote is active
    if (vote.status === VoteStatus.ACTIVE || vote.status === VoteStatus.CLOSED) {
        throw new AppError("Cannot add options to an Active vote", 400);
    }

    return prisma.voteOption.create({
        data: {
        label: data.label,
        voteId,
        },
    });
}




export async function createVoteOptionsBulk(voteId: string, data: BulkCreateVoteOptionsInput) {
    const vote = await prisma.vote.findUnique({
        where: { id: voteId },
        select: {
        id: true,
        status: true,
        },
    });



    if (!vote) {
        throw new AppError("Vote not found", 404);
    }

    if (vote.status === VoteStatus.ACTIVE || vote.status === VoteStatus.CLOSED) {
        throw new AppError("Cannot add options to an Active vote", 400);
    }

    if (!data.labels.length) {
        throw new AppError("At least one option is required", 400);
    }

    

    return prisma.voteOption.createMany({
        data: data.labels.map((label) => ({
            label,
            voteId,
        })),
    });
}


export async function getVoteOptions(voteId: string) {
  return prisma.voteOption.findMany({
    where: { voteId },
    select: {
      id: true,
      label: true,
    },
    orderBy: {
      label: "asc",
    },
  });
}




export async function updateVoteOption(voteId: string, optionId: string, label: string) {
    const option = await prisma.voteOption.findFirst({
            where: {
                id: optionId,
                voteId,
            },
            include: {
            vote: {
                select: {
                    status: true,
                },
            },
        },
    });

    if(label.trim() === "") {
        throw new AppError("Option label cannot be empty", 400);
    }

    if (!option) {
        throw new AppError("Vote option not found", 404);
    }

    // Do not allow changes once voting starts
    if (option.vote.status === VoteStatus.ACTIVE || option.vote.status === VoteStatus.CLOSED) {
        throw new AppError("Cannot update option after vote has started", 400);
    }

    return prisma.voteOption.update({
        where: { id: optionId },
        data: { label },
    });
}




export async function deleteVoteOption(voteId: string, optionId: string ) {
    const option = await prisma.voteOption.findFirst({
        where: {
            id: optionId,
            voteId,
        },
        include: {
        vote: {
            select: {
            status: true,
            },
        },
    }});

    if (!option) throw new AppError("Vote option not found", 404);
    

    // Strong rule: options are immutable once vote is active
    if (option.vote.status === VoteStatus.ACTIVE || option.vote.status === VoteStatus.CLOSED) {
        throw new AppError("Cannot delete option after vote has started", 400);
    }

    return prisma.voteOption.delete({
        where: { id: optionId },
    });
}