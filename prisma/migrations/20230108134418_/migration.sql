/*
  Warnings:

  - You are about to drop the column `isCocktail` on the `Recipes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CategoryIngredients" ADD COLUMN     "isCocktail" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "RecipeType" ADD COLUMN     "isCocktail" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Recipes" DROP COLUMN "isCocktail";
