/*
  Warnings:

  - Added the required column `apartmentId` to the `VoteResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VoteResponse" ADD COLUMN     "apartmentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "VoteResponse" ADD CONSTRAINT "VoteResponse_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
