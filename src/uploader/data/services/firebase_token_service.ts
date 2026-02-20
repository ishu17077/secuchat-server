import admin from "firebase-admin"
import type ITokenService from "../../services/itoken_service.js";
import type ServiceAccount from "../models/service_account.js";

export default class FirebaseTokenService implements ITokenService {
    private firebaseApp: admin.app.App | null = null
    async configure(serviceAccount: ServiceAccount): Promise<void> {
        const adminConfig: admin.ServiceAccount = {
            projectId: serviceAccount.project_id,
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key,
        }
        try {
            this.firebaseApp = admin.initializeApp({ credential: admin.credential.cert(adminConfig) })
        } catch (err) {
            if (!admin.apps) {
                this.firebaseApp = admin.initializeApp({
                    credential: admin.credential.cert(adminConfig)
                })
            }
        }

    }
    async validate(token: string): Promise<string> {
        if (!this.firebaseApp) {
            return Promise.reject("Configure function not called in Token Validator")
        }
        try {
            // const decodedToken = await this.firebaseApp.auth().verifyIdToken(token)
            return Promise.resolve("dsadasdasdsad")
        } catch (e) {
            return Promise.reject("Invalid or expired token");
        }
    }

}