import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

type CreateBuildingInput = {
    name: string;
    address: string;
    city: string;
    managerId: string;
    imageUrl?: string;
}


type  GetBuildingsQuery = {
  city?: string;
  name?: string;
  address?: string;
}

export async function createBuilding(data: CreateBuildingInput, userId?: string) {

  if(!userId) throw new Error("User ID is required to create a building");

  return prisma.building.create({
      data: {
          name: data.name,
          address: data.address,
          city: data.city,
          managerId: userId,
          imageUrl: data.imageUrl,
      },
  });
}


export async function getBuildingById(id: string) {
  return prisma.building.findUnique({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
        },
      },
      //TODO: Add select fields as needed when including relations
      apartments: {
        select: {
          id: true,
          number: true,
          floor: true,
          areaSqm: true,
        },
      },
      announcements: true,
      expenses: true,
      votes: true,
    },
  });
};


export async function getAllBuildings(filters: GetBuildingsQuery) {
  const where: Prisma.BuildingWhereInput = {};

  if (filters.city) {
    where.city = {
      equals: filters.city,
      mode: 'insensitive',
    };
  }

  if(filters.address){
    where.address = {
      contains: filters.address,
      mode: 'insensitive',
    };
  }

  if (filters.name) {
    where.name = {
      contains: filters.name,
      mode: 'insensitive',
    };
  }

  return prisma.building.findMany({
    where,
    select: {
      id: true,
      imageUrl: true,
      name: true,
      address: true,
      city: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};


export async function deleteBuilding(id: string) {
    return prisma.building.delete({
        where: {
            id: id
        }
    });
}


export async function updateBuilding(id: string, data: Partial<CreateBuildingInput>) {
    return prisma.building.update({
        where: {
            id: id
        },
        data: data
    });
};