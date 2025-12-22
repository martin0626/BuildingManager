import { create } from "node:domain";
import {prisma} from "../lib/prisma";

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


export async function getUserByEmail() {
  return prisma.user.findMany({select: {
    email: true,
    fullName: true,
    role: true,
  }});
}