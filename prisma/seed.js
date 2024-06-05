/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client"
import hashPassword from "../src/hashPassword.js"
const prisma = new PrismaClient()

async function seed() {
  try {
    // Crée un utilisateur
    const [passwordHash1, passwordSalt1] = hashPassword("user")
    const [passwordHash2, passwordSalt2] = hashPassword("admin")
    const newUser = await prisma.users.create({
      data: {
        userName: "User",
        email: "user@gmail.com",
        passwordHash: passwordHash1,
        passwordSalt: passwordSalt1,
        isAdmin: false,
      },
    })
    const newAdminUser = await prisma.users.create({
      data: {
        userName: "Admin",
        email: "admin@gmail.com",
        passwordHash: passwordHash2,
        passwordSalt: passwordSalt2,
        isAdmin: true,
      },
    })

    // Crée un type de recette
    const recipeType = await prisma.recipeType.create({
      data: {
        name: "Dessert",
        isCocktail: false,
      },
    })
    const recipeType2 = await prisma.recipeType.create({
      data: {
        name: "Cocktail",
        isCocktail: true,
      },
    })

    // Crée une recette
    const newRecipe = await prisma.recipes.create({
      data: {
        name: "Chocolate Cake",
        personNb: 8,
        description: "Delicious chocolate cake",
        imageUrl:
          "https://www.recipetineats.com/wp-content/uploads/2018/03/Chocolate-Cake_9-SQ.jpg",
        preparationTime: "1h 30m",
        step: "Step-by-step guide to make the cake",
        priceRange: 2,
        difficulty: 3,
        published: true,
        recipeTypeId: recipeType.id,
      },
    })
    const newRecipe2 = await prisma.recipes.create({
      data: {
        name: "Mojito",
        personNb: 1,
        description: "Refreshing cocktail",
        imageUrl:
          "https://cookieandkate.com/images/2020/08/best-mojito-recipe-2.jpg",
        preparationTime: "10m",
        step: "Step-by-step guide to make the cocktail",
        priceRange: 2,
        difficulty: 2,
        published: true,
        recipeTypeId: recipeType2.id,
      },
    })

    // Ajoute la recette aux favoris de l'utilisateur
    const favorite = await prisma.addFavorites.create({
      data: {
        userId: newUser.id,
        recipeId: newRecipe.id,
      },
    })

    console.log("Seed data created successfully:")
    console.log("User:", newUser)
    console.log("Admin User:", newAdminUser)
    console.log("Recipe Type:", recipeType)
    console.log("Recipe Type Cocktail:", recipeType2)
    console.log("Recipe:", newRecipe)
    console.log("Recipe Cocktail:", newRecipe2)
    console.log("Favorite:", favorite)
  } catch (error) {
    console.error("Error seeding data:", error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
