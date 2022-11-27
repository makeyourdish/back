import express from "express"
import sessionRoutes from "./src/session.js"
import cors from "cors"
import "dotenv/config"
import morgan from "morgan"
import pino from "pino"

const logger = pino()

const app = express()
const port = process.env.SERVER_PORT

app.options(
  "*",
  cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }) // todo: change with .env variables (https://makeyourdish.vercel.app)
)

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 })) // todo: change with .env variables (https://makeyourdish.vercel.app)
app.use(morgan("dev"))
app.use(express.json())

sessionRoutes({ app })

app.listen(port, () => logger.info(`🍹 Listening on :${port}`))
