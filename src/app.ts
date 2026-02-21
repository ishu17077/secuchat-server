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
app.use("/api", CompositionRoot.uploadRouter())

app.listen(PORT, (err: any) => {
    if (err) {
        return console.log("Error starting the server")
    }
    console.log(`Listening to port: ${PORT}`)
})
CompositionRoot.startNotificationService()
