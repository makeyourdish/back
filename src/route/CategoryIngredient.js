import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const GetCategoryIngredients = async (req, res) => {
  try {
    const categoryIngredients = await prisma.categoryIngredients.findMany({});
    console.log(categoryIngredients)
    res.status(200).send({categoryIngredients: categoryIngredients})
  } catch (error) {
    res.status(400).send("Problème survenue : " + error);
  }
};

export const CreateCategoryIngredient = async (req, res) => {
    const {
        body: { name },
      } = req;
    try {
      const categoryIngredients = await prisma.categoryIngredients.create({
        data: {
            name: name,
        },
      });
      console.log(categoryIngredients)
      res.status(200).send({categoryIngredients: categoryIngredients})
    } catch (error) {
      res.status(400).send("Problème survenue : " + error);
    }
  };

  export const UpdateCategoryIngredient = async (req, res) => {
    const {
        body: { idCategoryIngredient, name },
      } = req;
    try {
      const categoryIngredients = await prisma.categoryIngredients.update({
        where:{id: idCategoryIngredient},
        data: {
            name: name,
        },
      });
      console.log(categoryIngredients)
      res.status(200).send({categoryIngredients: categoryIngredients})
    } catch (error) {
      res.status(400).send("Problème survenue : " + error);
    }
  };

  export const DeleteCategoryIngredient = async (req, res) => {
    const {
        body: { idCategoryIngredient } }= req
    try {
      const categoryIngredients = await prisma.categoryIngredients.delete({
        where:{id: idCategoryIngredient},
      });
      console.log(categoryIngredients)
      res.status(200).send({categoryIngredients: categoryIngredients})
    } catch (error) {
      res.status(400).send("Problème survenue : " + error);
    }
  }