import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const GetRecipes = async (req, res) => {
  try {
    const recipes = await prisma.recipes.findMany({});
    console.log(recipes)
    res.status(200).send({recipes: recipes})
  } catch (error) {
    res.status(400).send("Problème survenue : " + error);
  }
};

export const CreateRecipes = async (req, res) => {
    const {
        body: { name, personNb, description, imageUrl, preparationTime, step, priceRange, difficulty, published, recipeTypeId },
      } = req;
    try {
      const recipes = await prisma.recipes.create({
        data: {
            name: name,
            personNb:personNb,
            Description: description,
            imageUrl: imageUrl,
            preparationTime: preparationTime,
            step: step,
            priceRange: priceRange,
            difficulty: difficulty,
            published: published,
            recipeTypeId:recipeTypeId
        },
      });
      console.log(recipes)
      res.status(200).send({recipes: recipes})
    } catch (error) {
      res.status(400).send("Problème survenue : " + error);
    }
  };

  export const UpdateRecipes = async (req, res) => {
    const {
        body: { idRecipe,name, personNb, description, imageUrl, preparationTime, step, priceRange, difficulty, published, recipeTypeId },
      } = req;
    try {
      const recipes = await prisma.recipes.update({
        where:{id: idRecipe},
        data: {
            name: name,
            personNb:personNb,
            Description: description,
            imageUrl: imageUrl,
            preparationTime: preparationTime,
            step: step,
            priceRange: priceRange,
            difficulty: difficulty,
            published: published,
            recipeTypeId:recipeTypeId
        },
      });
      console.log(recipes)
      res.status(200).send({recipes: recipes})
    } catch (error) {
      res.status(400).send("Problème survenue : " + error);
    }
  };

  export const DeleteRecipe = async (req, res) => {
    const {
        body: { idRecipe } }= req
    try {
      const recipes = await prisma.recipes.delete({
        where:{id: idRecipe},
      });
      console.log(recipes)
      res.status(200).send({recipes: recipes})
    } catch (error) {
      res.status(400).send("Problème survenue : " + error);
    }
  }