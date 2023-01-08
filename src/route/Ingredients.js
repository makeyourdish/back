import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

export const GetIngredients = async (req, res) => {
  try {
    const ingredients = await prisma.ingredients.findMany({
      include: { categoryIngredients: true },
    })

    res.status(200).send(ingredients)
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const GetNormalIngredients = async (req, res) => {
  try {
    const ingredients = await prisma.categoryIngredients.findMany({
      where: { isCocktail: false},
      include: { ingredients: true },
    })

    res.status(200).send(ingredients)
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const GetCocktailIngredients= async (req, res) => {
  try {
    const ingredients = await prisma.categoryIngredients.findMany({
      where: { isCocktail: true},
      include: { ingredients: true },
    })

    res.status(200).send(ingredients)
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const GetIngredient = async (req, res) => {
  const { idIngredient } = req.params

  try {
    const ingredients = await prisma.ingredients.findUnique({
      where: { id: Number(idIngredient) },
    })

    res.status(200).send(ingredients)
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const CreateIngredients = async (req, res) => {
  const {
    body: { name, imageUrl, categoryIngredientsId },
  } = req

  try {
    const ingredients = await prisma.ingredients.create({
      data: {
        name: name,
        imageUrl: imageUrl,
        categoryIngredientsId: categoryIngredientsId,
      },
    })

    res.status(200).send({ ingredients: ingredients })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const UpdateIngredient = async (req, res) => {
  const {
    body: { name, imageUrl, categoryIngredientsId },
    params: { idIngredient },
  } = req

  try {
    const ingredients = await prisma.ingredients.update({
      where: { id: Number(idIngredient) },
      data: {
        name: name,
        imageUrl: imageUrl,
        categoryIngredientsId: categoryIngredientsId,
      },
    })

    res.status(200).send({ ingredients: ingredients })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const DeleteIngredient = async (req, res) => {
  const { idIngredient } = req.params

  try {
    const ingredients = await prisma.ingredients.delete({
      where: { id: Number(idIngredient) },
    })

    res.status(200).send({ ingredients: ingredients })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}
