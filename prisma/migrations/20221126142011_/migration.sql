/*
  Warnings:

  - Added the required column `name` to the `Ingredients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredients" ADD COLUMN     "name" TEXT NOT NULL;
