import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

export const GetCategoryIngredients = async (req, res) => {
  try {
    const categoryIngredients = await prisma.categoryIngredients.findMany({})

    res.status(200).send(categoryIngredients)
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const CreateCategoryIngredient = async (req, res) => {
  const {
    body: { name },
  } = req

  try {
    const categoryIngredients = await prisma.categoryIngredients.create({
      data: {
        name: name,
      },
    })

    res.status(200).send({ categoryIngredients: categoryIngredients })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const UpdateCategoryIngredient = async (req, res) => {
  const {
    body: { idCategoryIngredient, name },
  } = req

  try {
    const categoryIngredients = await prisma.categoryIngredients.update({
      where: { id: idCategoryIngredient },
      data: {
        name: name,
      },
    })

    res.status(200).send({ categoryIngredients: categoryIngredients })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const DeleteCategoryIngredient = async (req, res) => {
  const {
    body: { idCategoryIngredient },
  } = req

  try {
    const categoryIngredients = await prisma.categoryIngredients.delete({
      where: { id: idCategoryIngredient },
    })

    res.status(200).send({ categoryIngredients: categoryIngredients })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}
