-- DropForeignKey
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_buildingId_fkey";

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE;
