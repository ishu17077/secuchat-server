import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"

dotenv.config()

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(morgan)