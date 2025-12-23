import { create } from "node:domain";
import {prisma} from "../../lib/prisma";

type CreateUserInput = {
  email: string;
  fullName: string;
  role?: "ADMIN" | "MANAGER" | "RESIDENT";
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


export async function getUsers(name?: string) {

  if(!name){
      return prisma.user.findMany({select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
      }});
  }else{
    return prisma.user.findMany({
      where: {
        fullName: { contains: name, mode: 'insensitive'  }
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