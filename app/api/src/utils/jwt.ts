import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { User } from "@prisma/client";

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) ?? "7d";

export function signJwt(user: User): string {
  const payload: JwtPayload = {
    sub: user.id,
    role: user.role,
  };

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
  };

  return jwt.sign(payload, JWT_SECRET, options);
}



export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}