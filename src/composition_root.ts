import type ServiceAccount from "./uploader/data/models/service_account.js"
import FirebaseTokenService from "./uploader/data/services/firebase_token_service.js"

export default class CompositionRoot {
    async configure(): Promise<void> {
        const tokenService = new FirebaseTokenService()
        const serviceAccount: ServiceAccount = {
            client_email: process.env.FIREBASE_CLIENT_EMAIL ?? '',
            client_id: process.env.FIREBASE_CLIENT_ID ?? '',
            private_key: process.env.FIREBASE_PRIVATE_KEY ?? '',
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID ?? '',
            project_id: process.env.FIREBASE_PROJECT_ID ?? '',
        }
        tokenService.configure(serviceAccount)
    }
}