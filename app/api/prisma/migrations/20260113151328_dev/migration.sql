/*
  Warnings:

  - You are about to drop the column `apartmentId` on the `Membership` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,buildingId]` on the table `Membership` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `buildingId` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_apartmentId_fkey";

-- DropIndex
DROP INDEX "Membership_userId_apartmentId_key";

-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "apartmentId",
ADD COLUMN     "buildingId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_buildingId_key" ON "Membership"("userId", "buildingId");

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
