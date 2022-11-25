-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "userName" TEXT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "passwordSalt" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "personNb" INTEGER NOT NULL,
    "Description" TEXT,
    "imageUrl" TEXT NOT NULL,
    "preparationTime" TIME NOT NULL,
    "step" TEXT NOT NULL,
    "priceRange" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT,
    "caategoryIngredientsId" INTEGER NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RecipeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryIngredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CategoryIngredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddFavorites" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "AddFavorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contain" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "Contain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "RecipeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_caategoryIngredientsId_fkey" FOREIGN KEY ("caategoryIngredientsId") REFERENCES "CategoryIngredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddFavorites" ADD CONSTRAINT "AddFavorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddFavorites" ADD CONSTRAINT "AddFavorites_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contain" ADD CONSTRAINT "Contain_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contain" ADD CONSTRAINT "Contain_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
