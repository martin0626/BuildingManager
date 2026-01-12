import { prisma } from "../../lib/prisma";
import { AuthProvider, User } from "@prisma/client";


export type OAuthUserInput = {
  provider: AuthProvider;
  providerId: string;
  email: string;
  fullName: string;
};


export async function findOrCreateOAuthUser(
  input: OAuthUserInput
): Promise<User> {
  const { provider, providerId, email, fullName } = input;

  let user = await prisma.user.findUnique({
    where: {
      provider_providerId: {
        provider,
        providerId,
      },
    },
  });

  if (user) {
    return user;
  }

  // Optional: enforce single account per email
  const existingEmailUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmailUser) {
    throw new Error(
      "An account with this email already exists. Please contact support."
    );
  }

  return prisma.user.create({
    data: {
      provider,
      providerId,
      email,
      fullName,
    },
  });
}

