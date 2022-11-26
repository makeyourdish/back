import { ExempleGetIngredients } from "./route/exemple.js";


const sessionRoutes = ({ app }) => {
//ALL definition route are here
app.get("/ingredients", async (req, res) => {
    await ExempleGetIngredients(req, res);
  });
};

export default sessionRoutes;