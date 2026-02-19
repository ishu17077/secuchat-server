import admin from "firebase-admin";
export default class FirebaseTokenService {
    firebaseApp = null;
    async configure(serviceAccount) {
        const adminConfig = {
            projectId: serviceAccount.project_id,
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key,
        };
        try {
            this.firebaseApp = admin.initializeApp({ credential: admin.credential.cert(adminConfig) });
        }
        catch (err) {
            if (!admin.apps) {
                this.firebaseApp = admin.initializeApp({
                    credential: admin.credential.cert(adminConfig)
                });
            }
        }
    }
    async validate(token) {
        if (!this.firebaseApp) {
            return Promise.reject("Configure function not called in Token Validator");
        }
        try {
            const decodedToken = await this.firebaseApp.auth().verifyIdToken(token);
            return Promise.resolve(decodedToken.uid);
        }
        catch (e) {
            return Promise.reject("Invalid or expired token");
        }
    }
}
//# sourceMappingURL=firebase_token_service.js.map