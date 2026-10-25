import admin, { type App } from "firebase-admin"
import type ITokenService from "../../services/itoken_service.js";
import FirebaseAdminService from "../../../services/firebase_admin_service.js";
import { Auth, getAuth } from "firebase-admin/auth";

export default class FirebaseTokenService implements ITokenService {
    private firebaseAuth: Auth
    constructor(firebaseApp: App) {
        this.firebaseAuth = getAuth(firebaseApp)
    }
    async validate(token: string): Promise<string> {
        if (!this.firebaseAuth) {
            return Promise.reject("Configure function not called in Token Validator")
        }
        try {
            const decodedToken = await this.firebaseAuth.verifyIdToken(token)
            return Promise.resolve(decodedToken.uid)
        } catch (e) {
            return Promise.reject("Invalid or expired token");
        }
    }

}