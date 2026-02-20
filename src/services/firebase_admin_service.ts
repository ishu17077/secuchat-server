import admin from "firebase-admin"
import type ServiceAccount from "../models/service_account.js"

export default class FirebaseAdminService {
    private static instance: FirebaseAdminService;

    constructor() {
        if (FirebaseAdminService.instance) {
            return FirebaseAdminService.instance
        }
        FirebaseAdminService.instance = this
        return this
    }

    protected firebaseApp: admin.app.App | null = null

    configure(serviceAccount: ServiceAccount) {
        if (this.firebaseApp != null) {
            return
        }
        const adminConfig: admin.ServiceAccount = {
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key,
            projectId: serviceAccount.project_id,
        }

        try {
            this.firebaseApp = admin.initializeApp({ credential: admin.credential.cert(adminConfig) })
        } catch (e) {
            console.log(e)
            if (!admin.apps) {
                this.firebaseApp = admin.initializeApp({
                    credential: admin.credential.cert(adminConfig)
                })
            }
        }
    }
}