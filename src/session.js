import auth from "./middleware/auth.js"
import { ExempleGetIngredients } from "./route/exemple.js"
import {
  userSession,
  userSignIn,
  userSignUp,
  userAccount,
} from "./route/Users.js"

const sessionRoutes = ({ app }) => {
  //ALL definition route are here
  app.get("/ingredients", auth, async (req, res) => {
    await ExempleGetIngredients(req, res)
  })

  app.post("/sign-in", async (req, res) => {
    await userSignIn(req, res)
  })
  app.post("/sign-up", async (req, res) => {
    await userSignUp(req, res)
  })
  app.get("/session", async (req, res) => {
    await userSession(req, res)
  })
  app.get("/accounts/:userId", auth, async (req, res) => {
    await userAccount(req, res)
  })
}

export default sessionRoutes
