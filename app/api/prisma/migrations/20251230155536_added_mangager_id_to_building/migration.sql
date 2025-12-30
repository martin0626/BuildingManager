/*
  Warnings:

  - A unique constraint covering the columns `[managerId]` on the table `Building` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `managerId` to the `Building` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Building" ADD COLUMN     "managerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Building_managerId_key" ON "Building"("managerId");

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
