/*
  Warnings:

  - You are about to drop the column `userId` on the `VoteResponse` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[apartmentId,voteId]` on the table `VoteResponse` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "VoteResponse" DROP CONSTRAINT "VoteResponse_userId_fkey";

-- DropIndex
DROP INDEX "VoteResponse_userId_voteId_key";

-- AlterTable
ALTER TABLE "VoteResponse" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "VoteResponse_apartmentId_voteId_key" ON "VoteResponse"("apartmentId", "voteId");
