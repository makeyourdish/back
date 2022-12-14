import auth from "./middleware/auth.js";
import authMaster from "./middleware/authMaster.js";
import { CreateCategoryIngredient, DeleteCategoryIngredient, GetCategoryIngredients, UpdateCategoryIngredient } from "./route/CategoryIngredient.js";
import { ExempleGetIngredients } from "./route/exemple.js";
import { CreateIngredients, DeleteIngredient, GetIngredient, GetIngredients, UpdateIngredient } from "./route/Ingredients.js";
import { CreateRecipes, DeleteRecipe, GetRecipe, GetRecipes, UpdateRecipes } from "./route/Recipes.js";
import { CreateRecipeType, DeleteRecipeType, GetRecipeType, UpdateRecipeType } from "./route/RecipeType.js";
import { userSession, userSignIn, userSignUp } from "./route/Users.js";


const sessionRoutes = ({ app }) => {
//ALL definition route are here
//exemple route
app.get("/exemple/ingredients", async (req, res) => {
    await ExempleGetIngredients(req, res);
  });
  //User
  app.post("/sign-in", async (req, res) => {
    await userSignIn(req, res);
  });
  app.post("/sign-up", async (req, res) => {
    await userSignUp(req, res);
  });
  app.get("/session", async (req, res) => {
    await userSession(req, res);
  });
  //Recipe
  app.get('/allRecipes', auth, async (req,res) => {
    await GetRecipes(req,res);
  })
  app.get('/recipe/:idRecipe', auth, async (req,res) => {
    await GetRecipe(req,res);
  })
  app.post('/recipe', authMaster,async (req,res) => {
    await CreateRecipes(req,res);
  })
  app.put('/recipe', authMaster, async (req,res) => {
    await UpdateRecipes(req,res);
  })
  app.delete('/recipe', authMaster, async (req,res) => {
    await DeleteRecipe(req,res);
  })
  //ingredient
  app.get('/allIngredient', auth, async (req,res) => {
    await GetIngredients(req,res);
  })
  app.get('/ingredient/:idIngredient', auth, async (req,res) => {
    await GetIngredient(req,res);
  })
  app.post('/ingredient', authMaster, async (req,res) => {
    await CreateIngredients(req,res);
  })
  app.put('/ingredient', authMaster, async (req,res) => {
    await UpdateIngredient(req,res);
  })
  app.delete('/ingredient', authMaster, async (req,res) => {
    await DeleteIngredient(req,res);
  })
  //CategoryIngredient
  app.get('/allCategoryIngredient', auth, async (req,res) => {
    await GetCategoryIngredients(req,res);
  })
  app.post('/categoryIngredient', authMaster, async (req,res) => {
    await CreateCategoryIngredient(req,res);
  })
  app.put('/categoryIngredient', authMaster, async (req,res) => {
    await UpdateCategoryIngredient(req,res);
  })
  app.delete('/categoryIngredient', authMaster, async (req,res) => {
    await DeleteCategoryIngredient(req,res);
  })
  //RecipeType
  app.get('/allRecipeType', auth, async (req,res) => {
    await GetRecipeType(req,res);
  })
  app.post('/recipeType', authMaster, async (req,res) => {
    await CreateRecipeType(req,res);
  })
  app.put('/recipeType', authMaster, async (req,res) => {
    await UpdateRecipeType(req,res);
  })
  app.delete('/recipeType', authMaster, async (req,res) => {
    await DeleteRecipeType(req,res);
  })
};

export default sessionRoutes;