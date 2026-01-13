import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
    membership?: import("@prisma/client").Membership | null;
    building?: import("@prisma/client").Building | null;
  }
}