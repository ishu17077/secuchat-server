import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import CompositionRoot from "./composition_root.js"

dotenv.config()

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(morgan("combined"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
CompositionRoot.configure()

app.get("/", (_req, res) => {
    res.status(200).json({ status: "ok", service: "secuchat-uploader-service" })
})

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "healthy" })
})

app.use("/api", CompositionRoot.uploadRouter())
CompositionRoot.startNotificationService()
app.listen(PORT, (err: any) => {
    if (err) {
        return console.error("Error starting the server:", err)
    }
    console.log(`[${new Date().toISOString()}] Listening to port: ${PORT}`)
})


console.log(`[${new Date().toISOString()}] Notification service started`)
