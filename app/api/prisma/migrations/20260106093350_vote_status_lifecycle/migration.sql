/*
  Warnings:

  - You are about to drop the column `isActive` on the `Vote` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VoteStatus" AS ENUM ('DRAFT', 'ACTIVE', 'CLOSED');

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "isActive",
ADD COLUMN     "status" "VoteStatus" NOT NULL DEFAULT 'DRAFT';
