import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/appError";


type CreateApartmentInput = {
    number: string
    floor: number
    areaSqm: number
}


type  GetApartmentsQuery = {
  number?: string;
  floor?: number;
  areaSqm?: number;
}

export async function createApartment(buildingId: string, data: CreateApartmentInput) {
    // Ensure building exists
    await prisma.building.findUniqueOrThrow({
        where: { id: buildingId },
    });

    // Optional uniqueness check (DB-level unique is better)
    const exists = await prisma.apartment.findFirst({
        where: {
            buildingId: buildingId,
            number: data.number,
        },
    });

    if (exists) {
        throw new AppError("Apartment number already exists in this building", 400);
    }
    
    return prisma.apartment.create({
        data: {
            number: data.number,
            floor: data.floor,
            areaSqm: data.areaSqm,
            buildingId: buildingId,
        },
    });
};


export async function getApartmentById(buildingId: string, apartmentId: string,) {
    return prisma.apartment.findFirst({
        where: {
            id: apartmentId,
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
            memberships: true,
        },
    });
}


export async function getAllApartments(buildingId: string, filters: GetApartmentsQuery) {

    const where: Prisma.ApartmentWhereInput = {buildingId: buildingId};

    if (filters.number) {
        where.number = {
            contains: filters.number,
            mode: 'insensitive',
        };
    }

    if (filters.floor !== undefined) {
        where.floor = {
            equals: Number(filters.floor),
        };
    }

    if (filters.areaSqm !== undefined) {
        where.areaSqm = {
            gte: Number(filters.areaSqm),
        };
    }

    return prisma.apartment.findMany({
        where,
        select: {
                id: true,
                number: true,
                floor: true,
                areaSqm: true,
                buildingId: true,
            },
    });
}


export async function updateApartment(buildingId: string, apartmentId: string, data: Partial<CreateApartmentInput>) {

    const apartment = await prisma.apartment.findFirst({
        where: { id: apartmentId, buildingId },
    });

    if (!apartment) {
        throw new AppError("Apartment not found in this building", 404);
    }


    const exists = await prisma.apartment.findFirst({
        where: {
            buildingId: buildingId,
            number: data.number,
        },
    });

    if (exists) {
        throw new AppError("Apartment number already exists in this building", 400);
    }


    return prisma.apartment.update({
        where: { id: apartmentId },
        data,
    });
}

export async function deleteApartment(buildingId: string, apartmentId: string) {
    const apartment = await prisma.apartment.findFirst({
        where: { id: apartmentId, buildingId },
    });

    if (!apartment) {
        throw new AppError("Apartment not found in this building", 400);
    }

    return prisma.apartment.delete({
        where: {
            id: apartmentId,
        },
    });
}