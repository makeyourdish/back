import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const GetRecipeType = async (req, res) => {
  try {
    const recipeType = await prisma.recipeType.findMany({});
    console.log(recipeType)
    res.status(200).send({recipeType: recipeType})
  } catch (error) {
    res.status(400).send("Problème survenue : " + error);
  }
};

export const CreateRecipeType = async (req, res) => {
    const {
        body: { name },
      } = req;
    try {
      const recipeType = await prisma.recipeType.create({
        data: {
            name: name,
        },
      });
      console.log(recipeType)
      res.status(200).send({recipeType: recipeType})
    } catch (error) {
      res.status(400).send("Problème survenue : " + error);
    }
  };

  export const UpdateRecipeType = async (req, res) => {
    const {
        body: { idRecipeType, name },
      } = req;
    try {
      const recipeType = await prisma.recipeType.update({
        where:{id: idRecipeType},
        data: {
            name: name,
        },
      });
      console.log(recipeType)
      res.status(200).send({recipeType: recipeType})
    } catch (error) {
      res.status(400).send("Problème survenue : " + error);
    }
  };

  export const DeleteRecipeType = async (req, res) => {
    const {
        body: { idRecipeType } }= req
    try {
      const recipeType = await prisma.recipeType.delete({
        where:{id: idRecipeType},
      });
      console.log(recipeType)
      res.status(200).send({recipeType: recipeType})
    } catch (error) {
      res.status(400).send("Problème survenue : " + error);
    }
  }