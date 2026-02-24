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

    private _firebaseApp: admin.app.App | null = null
    public get firebaseApp(): admin.app.App | null {
        return this._firebaseApp
    }


    configure(serviceAccount: ServiceAccount) {
        if (this._firebaseApp != null) {
            return
        }
        const adminConfig: admin.ServiceAccount = {
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key,
            projectId: serviceAccount.project_id,
        }

        try {
            this._firebaseApp = admin.initializeApp({ credential: admin.credential.cert(adminConfig) })
        } catch (err) {
            console.log(err)

        }
    }
}