import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

export const ExempleGetIngredients = async (req, res) => {
  try {
    const ingredients = await prisma.ingredients.findMany({
      include: { categoryIngredients: true },
    })
    console.log(ingredients)
    res.status(200).send({ ingredients: ingredients })
  } catch (error) {
    res.status(400).send("Problème survenue : " + error)
  }
}
