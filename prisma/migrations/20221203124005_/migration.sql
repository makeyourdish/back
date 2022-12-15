/*
  Warnings:

  - You are about to drop the column `recipeId` on the `Recipes` table. All the data in the column will be lost.
  - Added the required column `recipeTypeId` to the `Recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Recipes" DROP CONSTRAINT "Recipes_recipeId_fkey";

-- AlterTable
ALTER TABLE "Recipes" DROP COLUMN "recipeId",
ADD COLUMN     "recipeTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_recipeTypeId_fkey" FOREIGN KEY ("recipeTypeId") REFERENCES "RecipeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
