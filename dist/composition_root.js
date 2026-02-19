import FirebaseTokenService from "./uploader/data/services/firebase_token_service.js";
import VercelBlobStorage from "./uploader/data/services/vercel_blob_storage.js";
import UploadRouter from "./uploader/entrypoint/routers/upload_router.js";
import TokenValidator from "./uploader/helpers/token_validator.js";
export default class CompositionRoot {
    static tokenService;
    static cloudStorage;
    static configure() {
        this.tokenService = new FirebaseTokenService();
        const serviceAccount = {
            client_email: process.env.FIREBASE_CLIENT_EMAIL ?? '',
            client_id: process.env.FIREBASE_CLIENT_ID ?? '',
            private_key: process.env.FIREBASE_PRIVATE_KEY ?? '',
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID ?? '',
            project_id: process.env.FIREBASE_PROJECT_ID ?? '',
        };
        this.tokenService.configure(serviceAccount);
        this.cloudStorage = new VercelBlobStorage();
    }
    static uploadRouter() {
        const tokenValidator = new TokenValidator(this.tokenService);
        return UploadRouter.configure(tokenValidator, this.cloudStorage);
    }
}
//# sourceMappingURL=composition_root.js.map