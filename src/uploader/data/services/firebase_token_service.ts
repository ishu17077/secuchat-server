import admin from "firebase-admin"
import type ITokenService from "../../services/itoken_service.js";
import FirebaseAdminService from "../../../services/firebase_admin_service.js";

export default class FirebaseTokenService extends FirebaseAdminService implements ITokenService {
    async validate(token: string): Promise<string> {
        if (!this.firebaseApp) {
            return Promise.reject("Configure function not called in Token Validator")
        }
        try {
            const decodedToken = await this.firebaseApp.auth().verifyIdToken(token)
            return Promise.resolve(decodedToken.uid)
        } catch (e) {
            return Promise.reject("Invalid or expired token");
        }
    }

}