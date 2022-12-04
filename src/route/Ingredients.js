import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const GetIngredients = async (req, res) => {
  try {
    const ingredients = await prisma.ingredients.findMany({});
    console.log(ingredients)
    res.status(200).send({ingredients: ingredients})
  } catch (error) {
    res.status(400).send("Problème survenue : " + error);
  }
};

export const CreateIngredients = async (req, res) => {
    const {
        body: { name, imageUrl,  categoryIngredientsId },
      } = req;
    try {
      const ingredients = await prisma.ingredients.create({
        data: {
            name: name,
            imageUrl: imageUrl,
            categoryIngredientsId:categoryIngredientsId
        },
      });
      console.log(ingredients)
      res.status(200).send({ingredients: ingredients})
    } catch (error) {
      res.status(400).send("Problème survenue : " + error);
    }
  };

  export const UpdateIngredient = async (req, res) => {
    const {
        body: { idIngredient, name, imageUrl,  categoryIngredientsId },
      } = req;
    try {
      const ingredients = await prisma.ingredients.update({
        where:{id: idIngredient},
        data: {
            name: name,
            imageUrl: imageUrl,
            categoryIngredientsId:categoryIngredientsId
        },
      });
      console.log(ingredients)
      res.status(200).send({ingredients: ingredients})
    } catch (error) {
      res.status(400).send("Problème survenue : " + error);
    }
  };

  export const DeleteIngredient = async (req, res) => {
    const {
        body: { idIngredient } }= req
    try {
      const ingredients = await prisma.ingredients.delete({
        where:{id: idIngredient},
      });
      console.log(ingredients)
      res.status(200).send({ingredients: ingredients})
    } catch (error) {
      res.status(400).send("Problème survenue : " + error);
    }
  }