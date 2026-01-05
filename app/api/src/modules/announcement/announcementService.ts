import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/appError";


type CreateAnnouncementInput  = {
    title: string
    content: string
}

type  GetAnnouncementQuery = {
  title?: string;
  content?: string;
}

export async function createAnnouncement(buildingId: string, data: CreateAnnouncementInput ) {
    // Ensure building exists
    await prisma.building.findUniqueOrThrow({
        where: { id: buildingId },
    });

    return prisma.announcement.create({
        data: {
        title: data.title,
        content: data.content,
        buildingId,
        },
    });
};


export async function getAnnouncementById(buildingId: string, announcementId: string,) {
    return prisma.announcement.findFirst({
        where: {
            id: announcementId,
            buildingId: buildingId,
        },
        include: {
            building: {
                select: {
                    id: true,
                    name: true, 
                    address: true, 
                    city: true,
                    imageUrl: true,
                },
            },
        },
    });
}


export async function getAllAnnouncements(buildingId: string, filters: GetAnnouncementQuery) {

    const where: Prisma.AnnouncementWhereInput = {buildingId: buildingId};

    if (filters.title !== undefined) {
        where.title = {
            contains: filters.title,
            mode: 'insensitive',
        };
    }

    if (filters.content !== undefined) {
        where.content = {
            contains: filters.content,
            mode: 'insensitive',
        };
    }
    
    return prisma.announcement.findMany({
        where,
        select: {
            id: true,
            title: true,
            content: true,
            buildingId: true,
        },
    });
}


export async function updateAnnouncement(buildingId: string, announcementId: string, data: Partial<CreateAnnouncementInput >) {

    const announcement = await prisma.announcement.findFirst({
        where: { id: announcementId, buildingId },
    });

    if (!announcement) {
        throw new AppError("Announcement not found in this building", 404);
    }

    return prisma.announcement.update({
        where: { id: announcementId },
        data,
    });
}

export async function deleteAnnouncement(buildingId: string, announcementId: string) {
    const announcement = await prisma.announcement.findFirst({
        where: { id: announcementId, buildingId },
    });

    if (!announcement) {
        throw new AppError("Announcement not found in this building", 404);
    }

    return prisma.announcement.delete({
        where: {
            id: announcementId,
        },
    });
}