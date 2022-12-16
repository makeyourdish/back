import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

export const GetRecipes = async (req, res) => {
  try {
    const recipes = await prisma.recipes.findMany({})

    res.status(200).send({ recipes: recipes })
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

    res.status(200).send({ recipes: recipe })
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
        recipeTypeId: recipeTypeId,
      },
    })
    ingredients.map(
      async ({ id, quantity, quantityType }) =>
        await prisma.contain.create({
          data: {
            ingredientId: id,
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
      idRecipe,
      name,
      personNb,
      description,
      imageUrl,
      preparationTime,
      step,
      priceRange,
      difficulty,
      published,
      recipeTypeId,
    },
  } = req

  try {
    const recipes = await prisma.recipes.update({
      where: { id: idRecipe },
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
        recipeTypeId: recipeTypeId,
      },
    })

    res.status(200).send({ recipes: recipes })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const DeleteRecipe = async (req, res) => {
  const {
    body: { idRecipe },
  } = req

  try {
    const recipes = await prisma.recipes.delete({
      where: { id: idRecipe },
    })

    res.status(200).send({ recipes: recipes })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}
