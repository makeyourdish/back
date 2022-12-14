import auth from "./middleware/auth.js"
import authMaster from "./middleware/authMaster.js"
import {
  CreateCategoryIngredient,
  DeleteCategoryIngredient,
  GetCategoryIngredients,
  GetCategoryIngredient,
  UpdateCategoryIngredient,
} from "./route/CategoryIngredient.js"
import {
  CreateIngredients,
  DeleteIngredient,
  GetCocktailIngredients,
  GetIngredient,
  GetIngredients,
  GetNormalAndCocktailIngredients,
  UpdateIngredient,
} from "./route/Ingredients.js"
import {
  CreateRecipes,
  DeleteRecipe,
  GetCocktailRecipes,
  GetNormalRecipes,
  GetRecipe,
  GetRecipes,
  UpdateRecipes,
} from "./route/Recipes.js"
import {
  CreateRecipeType,
  DeleteRecipeType,
  GetRecipeTypes,
  GetRecipeType,
  UpdateRecipeType,
} from "./route/RecipeType.js"
import {
  updateUserPassword,
  userSession,
  userSignIn,
  userCreate,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  userSignUp,
} from "./route/Users.js"

//************************ ALL definition route are here ************************
const sessionRoutes = ({ app }) => {
  //*********************** Users **********************
  app.post("/sign-in", async (req, res) => {
    await userSignIn(req, res)
  })
  app.post("/sign-up", async (req, res) => {
    await userSignUp(req, res)
  })
  app.post("/user", authMaster, async (req, res) => {
    await userCreate(req, res)
  })
  app.get("/userGetAll", authMaster, async (req, res) => {
    await getUsers(req, res)
  })
  app.get("/user/:idUser", auth, async (req, res) => {
    await getUser(req, res)
  })
  app.put("/user/:idUser", auth, async (req, res) => {
    await updateUser(req, res)
  })
  app.delete("/user/:idUser", auth, async (req, res) => {
    await deleteUser(req, res)
  })
  app.get("/session", async (req, res) => {
    await userSession(req, res)
  })
  app.put("/user/:idUser/updatePassword", auth, async (req, res) => {
    await updateUserPassword(req, res)
  })
  //*********************** Recipes **********************
  app.get("/allRecipe", async (req, res) => {
    await GetRecipes(req, res)
  })
  app.get("/NormalRecipe", async (req, res) => {
    await GetNormalRecipes(req, res)
  })
  app.get("/CocktailRecipe", async (req, res) => {
    await GetCocktailRecipes(req, res)
  })
  app.get("/recipe/:idRecipe", async (req, res) => {
    await GetRecipe(req, res)
  })
  app.post("/recipe", auth, async (req, res) => {
    await CreateRecipes(req, res)
  })
  app.put("/recipe/:idRecipe", auth, async (req, res) => {
    await UpdateRecipes(req, res)
  })
  app.delete("/recipe/:idRecipe", authMaster, async (req, res) => {
    await DeleteRecipe(req, res)
  })
  //*********************** Ingredients **********************
  app.get("/allIngredient", async (req, res) => {
    await GetIngredients(req, res)
  })
  app.get("/NormalIngredients", async (req, res) => {
    await GetNormalAndCocktailIngredients(req, res)
  })
  app.get("/CocktailIngredients", async (req, res) => {
    await GetCocktailIngredients(req, res)
  })
  app.get("/ingredient/:idIngredient", auth, async (req, res) => {
    await GetIngredient(req, res)
  })
  app.post("/ingredient", authMaster, async (req, res) => {
    await CreateIngredients(req, res)
  })
  app.put("/ingredient/:idIngredient", authMaster, async (req, res) => {
    await UpdateIngredient(req, res)
  })
  app.delete("/ingredient/:idIngredient", authMaster, async (req, res) => {
    await DeleteIngredient(req, res)
  })
  //*********************** CategoriesIngredients **********************
  app.get("/allCategoryIngredient", async (req, res) => {
    await GetCategoryIngredients(req, res)
  })
  app.get(
    "/categoryIngredient/:idCategoryIngredient",
    authMaster,
    async (req, res) => {
      await GetCategoryIngredient(req, res)
    }
  )
  app.post("/categoryIngredient", authMaster, async (req, res) => {
    await CreateCategoryIngredient(req, res)
  })
  app.put(
    "/categoryIngredient/:idCategoryIngredient",
    authMaster,
    async (req, res) => {
      await UpdateCategoryIngredient(req, res)
    }
  )
  app.delete(
    "/categoryIngredient/:idCategoryIngredient",
    authMaster,
    async (req, res) => {
      await DeleteCategoryIngredient(req, res)
    }
  )
  //*********************** RecipeTypes **********************
  app.get("/allRecipeType", auth, async (req, res) => {
    await GetRecipeTypes(req, res)
  })
  app.get("/recipeType/:idRecipeType", authMaster, async (req, res) => {
    await GetRecipeType(req, res)
  })
  app.post("/recipeType", authMaster, async (req, res) => {
    await CreateRecipeType(req, res)
  })
  app.put("/recipeType/:idRecipeType", authMaster, async (req, res) => {
    await UpdateRecipeType(req, res)
  })
  app.delete("/recipeType/:idRecipeType", authMaster, async (req, res) => {
    await DeleteRecipeType(req, res)
  })
}

export default sessionRoutes
