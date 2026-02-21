import type ServiceAccount from "./models/service_account.js"
import FirebaseNotificationService from "./notification/data/services/firebase_notification_service.js"
import FirebaseNotifications from "./notification/helpers/firebase_notifications.js"
import type INotificationService from "./notification/services/inotification_service.js"
import FirebaseAdminService from "./services/firebase_admin_service.js"
import FirebaseTokenService from "./uploader/data/services/firebase_token_service.js"
import VercelBlobStorage from "./uploader/data/services/vercel_blob_storage.js"
import UploadRouter from "./uploader/entrypoint/routers/upload_router.js"
import TokenValidator from "./uploader/helpers/token_validator.js"
import type ICloudStorage from "./uploader/services/icloud_storage.js"
import type ITokenService from "./uploader/services/itoken_service.js"
import type { Router } from "express"
import admin from "firebase-admin"

export default class CompositionRoot {
    private static firebaseAdminService: FirebaseAdminService
    private static tokenService: ITokenService
    private static cloudStorage: ICloudStorage

    public static configure(): void {
        this.firebaseAdminService = new FirebaseAdminService()
        const serviceAccount: ServiceAccount = {
            client_email: process.env.FIREBASE_CLIENT_EMAIL ?? '',
            client_id: process.env.FIREBASE_CLIENT_ID ?? '',
            private_key: process.env.FIREBASE_PRIVATE_KEY ?? '',
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID ?? '',
            project_id: process.env.FIREBASE_PROJECT_ID ?? '',
        }
        this.firebaseAdminService.configure(serviceAccount)
        this.cloudStorage = new VercelBlobStorage()
    }

    public static uploadRouter(): Router {
        const tokenValidator = new TokenValidator(this.tokenService)
        return UploadRouter.configure(tokenValidator, this.cloudStorage)
    }

    public static startNotificationService(): void {
        const notificationService: INotificationService = new FirebaseNotificationService(this.firebaseAdminService.firebaseApp!)
        const firebaseNotification = new FirebaseNotifications(notificationService, this.firebaseAdminService.firebaseApp?.firestore()!)
        firebaseNotification.start()
    }
}