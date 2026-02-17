import express from "express"

export default class UploadRouter {
    public static configure(): express.Router {
        const router = express.Router()
        router.post("/upload", (req, resp) => { })

        
        return router
    }
}