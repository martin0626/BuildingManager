import {prisma} from "../../lib/prisma";

type CreateUserInput = {
  email: string;
  fullName: string;
  role?: "ADMIN" | "MANAGER" | "RESIDENT";
}

type GetUsersFilters = {
  email?: string;
  fullName?: string;
}

export async function createUser(data: CreateUserInput) {

  return prisma.user.create({
    data: {
      email: data.email,
      fullName: data.fullName,
      role: data.role ?? "RESIDENT",
    },
  });
}



export const getUsers = async (filters: GetUsersFilters) => {
  const { email, fullName } = filters;
  const where: any = {};

  if (email) {
    where.email = {
      contains: email,
      mode: "insensitive",
    };
  }

  if (fullName) {
    where.fullName = {
      contains: fullName,
      mode: "insensitive",
    };
  }

  return prisma.user.findMany({
    where,
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });
};


export async function getUserById(id?: string) {
  if(!id){
      return prisma.user.findMany({select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      }});
  }else{
    return prisma.user.findMany({
      where: {
        id: { contains: id, mode: 'insensitive'  }
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      }
    });
  }
}


export async function updateUser(id: string, data: Partial<CreateUserInput>) {

  return prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });
}


export async function deleteUser(id: string) {

  return prisma.user.delete({
    where: {
      id: id,
    },
  });
}