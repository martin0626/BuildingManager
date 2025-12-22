import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export  { prisma }; 


// Edit prisma/schema.prisma to define your models

// Run migration to apply to DB:

// npx prisma migrate dev --name init


// Generate Prisma client:

// npx prisma generate

