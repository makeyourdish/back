import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

export const GetRecipes = async (req, res) => {
  try {
    const recipes = await prisma.recipes.findMany({
      include: { recipeType: true, ingredients: true },
    })

    res.status(200).send(recipes)
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const GetNormalRecipes = async (req, res) => {
  try {
    const recipes = await prisma.recipes.findMany({
      where: { recipeType:{isCocktail: false} },
      include: { recipeType: true, ingredients:true },
    })

    res.status(200).send(recipes)
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const GetCocktailRecipes = async (req, res) => {
  try {
    const recipes = await prisma.recipes.findMany({
      where: { recipeType:{isCocktail: true} },
      include: { recipeType: true,ingredients:true },
    })

    res.status(200).send(recipes)
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const GetRecipe = async (req, res) => {
  const { idRecipe } = req.params

  try {
    const recipe = await prisma.recipes.findUnique({
      where: { id: Number(idRecipe) },
      include: { ingredients: { include: { ingredient: true } } },
    })

    if (!recipe) {
      res.status(404).send("La recette n'a pas été trouvée !")
    } else {
      res.status(200).send(recipe)
    }
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const CreateRecipes = async (req, res) => {
  const {
    body: {
      name,
      personNb,
      description,
      imageUrl,
      preparationTime,
      step,
      priceRange,
      difficulty,
      published,
      isCocktail,
      recipeTypeId,
      ingredients,
    },
  } = req

  try {
    const recipe = await prisma.recipes.create({
      data: {
        name: name,
        personNb: personNb,
        description: description,
        imageUrl: imageUrl,
        preparationTime: preparationTime,
        step: step,
        priceRange: priceRange,
        difficulty: difficulty,
        published: published,
        isCocktail: isCocktail,
        recipeTypeId: recipeTypeId,
      },
    })
    ingredients.map(
      async ({ ingredientId, quantity, quantityType }) =>
        await prisma.contain.create({
          data: {
            ingredientId: ingredientId,
            quantity: quantity,
            quantityType: quantityType,
            recipeId: recipe.id,
          },
        })
    )
    const recipes = await prisma.recipes.findUnique({
      where: {
        id: recipe.id,
      },
      include: { ingredients: { include: { ingredient: true } } },
    })

    res.status(200).send({ recipes: recipes })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const UpdateRecipes = async (req, res) => {
  const {
    body: {
      name,
      personNb,
      description,
      imageUrl,
      preparationTime,
      step,
      priceRange,
      difficulty,
      published,
      isCocktail,
      recipeTypeId,
      ingredients,
    },
    params: { idRecipe },
  } = req

  try {
    const recipe = await prisma.recipes.update({
      where: { id: Number(idRecipe) },
      data: {
        name: name,
        personNb: personNb,
        description: description,
        imageUrl: imageUrl,
        preparationTime: preparationTime,
        step: step,
        priceRange: priceRange,
        difficulty: difficulty,
        published: published,
        isCocktail: isCocktail,
        recipeTypeId: recipeTypeId,
      },
    })
    ingredients.map(
      async ({ id, ingredientId, quantity, quantityType }) =>
        await prisma.contain.update({
          where: { id: id },
          data: {
            ingredientId: ingredientId,
            quantity: quantity,
            quantityType: quantityType,
            recipeId: recipe.id,
          },
        })
    )

    res.status(200).send({ recipe: recipe })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const DeleteRecipe = async (req, res) => {
  const { idRecipe } = req.params

  try {
    await prisma.contain.deleteMany({
      where: { recipeId: Number(idRecipe) },
    })

    const recipes = await prisma.recipes.delete({
      where: { id: Number(idRecipe) },
    })

    res.status(200).send({ recipes: recipes })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}
