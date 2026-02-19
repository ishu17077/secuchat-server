import express from "express";
import UploadController from "../controllers/upload_controller.js";
import { uploadValidation, validate } from "../../helpers/validators.js";
import TokenValidator from "../../helpers/token_validator.js";
import FirebaseTokenService from "../../data/services/firebase_token_service.js";
import VercelBlobStorage from "../../data/services/vercel_blob_storage.js";
export default class UploadRouter {
    static configure(tokenValidator, cloudStorage) {
        const router = express.Router();
        let controller = UploadRouter.composeController(cloudStorage);
        router.post("/upload", uploadValidation(), validate, (req, res, next) => tokenValidator.validate(req, res, next), (req, res) => controller.upload(req, res));
        return router;
    }
    static composeController(cloudStorage) {
        const controller = new UploadController(cloudStorage);
        return controller;
    }
}
//# sourceMappingURL=upload_router.js.map