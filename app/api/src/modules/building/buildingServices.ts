import { prisma } from "../../lib/prisma";

type CreateBuildingInput = {
    name: string;
    address: string;
    city: string;
    managerId: string;
}

export async function createBuilding(data: CreateBuildingInput) {

    return prisma.building.create({
        data: {
            name: data.name,
            address: data.address,
            city: data.city,
            managerId: data.managerId,
        },
    });
}
export async function getBuildings(id?: string) {

  if(!id){
      return prisma.building.findMany({select: {
        id: true,
        name: true,
        address: true,
        city: true,
        managerId: true,
      }});
  }else{
    return prisma.building.findMany({
      where: {
        id: { contains: id, mode: 'insensitive'  }
      },
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
        managerId: true,
      }
    });
  }
};


export async function deleteBuilding(id: string) {
    return prisma.building.delete({
        where: {
            id: id
        }
    });
}