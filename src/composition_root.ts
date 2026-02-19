import type ServiceAccount from "./uploader/data/models/service_account.js"
import FirebaseTokenService from "./uploader/data/services/firebase_token_service.js"
import VercelBlobStorage from "./uploader/data/services/vercel_blob_storage.js"
import UploadRouter from "./uploader/entrypoint/routers/upload_router.js"
import TokenValidator from "./uploader/helpers/token_validator.js"
import type ICloudStorage from "./uploader/services/icloud_storage.js"
import type ITokenService from "./uploader/services/itoken_service.js"
import type { Router } from "express"

export default class CompositionRoot {
    private static tokenService: ITokenService
    private static cloudStorage: ICloudStorage

    public static configure(): void {
        this.tokenService = new FirebaseTokenService()
        const serviceAccount: ServiceAccount = {
            client_email: process.env.FIREBASE_CLIENT_EMAIL ?? '',
            client_id: process.env.FIREBASE_CLIENT_ID ?? '',
            private_key: process.env.FIREBASE_PRIVATE_KEY ?? '',
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID ?? '',
            project_id: process.env.FIREBASE_PROJECT_ID ?? '',
        }
        this.tokenService.configure(serviceAccount)
        this.cloudStorage = new VercelBlobStorage()
    }

    public static uploadRouter(): Router {
        const tokenValidator = new TokenValidator(this.tokenService)
        return UploadRouter.configure(tokenValidator, this.cloudStorage)
    }
}