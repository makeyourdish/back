/*
  Warnings:

  - You are about to drop the column `Description` on the `Recipes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipes" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isCocktail" BOOLEAN NOT NULL DEFAULT false;
