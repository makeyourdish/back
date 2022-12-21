import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

export const GetRecipeType = async (req, res) => {
  try {
    const recipeType = await prisma.recipeType.findMany({})

    res.status(200).send(recipeType)
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const CreateRecipeType = async (req, res) => {
  const {
    body: { name },
  } = req

  try {
    const recipeType = await prisma.recipeType.create({
      data: {
        name: name,
      },
    })

    res.status(200).send({ recipeType: recipeType })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const UpdateRecipeType = async (req, res) => {
  const {
    body: { name },
    params: { idRecipeType },
  } = req

  try {
    const recipeType = await prisma.recipeType.update({
      where: { id: Number(idRecipeType) },
      data: {
        name: name,
      },
    })

    res.status(200).send({ recipeType: recipeType })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}

export const DeleteRecipeType = async (req, res) => {
  const { idRecipeType } = req.params

  try {
    const recipeType = await prisma.recipeType.delete({
      where: { id: Number(idRecipeType) },
    })

    res.status(200).send({ recipeType: recipeType })
  } catch (error) {
    res.status(400).send("Problème survenu : " + error)
  }
}
