/*
  Warnings:

  - You are about to drop the column `caategoryIngredientsId` on the `Ingredients` table. All the data in the column will be lost.
  - Added the required column `categoryIngredientsId` to the `Ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_caategoryIngredientsId_fkey";

-- AlterTable
ALTER TABLE "Ingredients" DROP COLUMN "caategoryIngredientsId",
ADD COLUMN     "categoryIngredientsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_categoryIngredientsId_fkey" FOREIGN KEY ("categoryIngredientsId") REFERENCES "CategoryIngredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
