import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

export const GetIngredients = async (req, res) => {
  try {
    const ingredients = await prisma.ingredients.findMany({})

    res.status(200).send({ ingredients: ingredients })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const GetIngredient = async (req, res) => {
  const { idIngredient } = req.params

  try {
    const ingredients = await prisma.ingredients.findUnique({
      where: { id: idIngredient },
    })

    res.status(200).send({ ingredients: ingredients })
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
    body: { idIngredient, name, imageUrl, categoryIngredientsId },
  } = req

  try {
    const ingredients = await prisma.ingredients.update({
      where: { id: idIngredient },
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
  const {
    body: { idIngredient },
  } = req

  try {
    const ingredients = await prisma.ingredients.delete({
      where: { id: idIngredient },
    })

    res.status(200).send({ ingredients: ingredients })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}
