import express from "express"
import UploadController from "../controllers/upload_controller.js"
import { uploadValidation, validate } from "../../helpers/validators.js"
import TokenValidator from "../../helpers/token_validator.js"
import FirebaseTokenService from "../../data/services/firebase_token_service.js"
import type ServiceAccount from "../../data/models/service_account.js"
import VercelBlobStorage from "../../data/services/vercel_blob_storage.js"
import type ITokenService from "../../services/itoken_service.js"
import type ICloudStorage from "../../services/icloud_storage.js"

export default class UploadRouter {

    public static configure(tokenValidator: TokenValidator, cloudStorage: ICloudStorage): express.Router {
        const router = express.Router()
        let controller = UploadRouter.composeController(cloudStorage)
        router.post("/upload", uploadValidation(), validate,
            //  (req: express.Request, res: express.Response, next: express.NextFunction) => tokenValidator.validate(req, res, next), 
            (req: express.Request, res: express.Response) => controller.upload(req, res))
        return router
    }

    private static composeController(cloudStorage: ICloudStorage): UploadController {
        const controller = new UploadController(cloudStorage)
        return controller
    }
}