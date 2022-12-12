/*
  Warnings:

  - Added the required column `quantity` to the `Contain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contain" ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantityType" TEXT;
