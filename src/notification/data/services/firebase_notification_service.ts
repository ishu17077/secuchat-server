import type { Message } from "firebase-admin/messaging";
import FirebaseAdminService from "../../../services/firebase_admin_service.js";
import admin from "firebase-admin"
import type Notification from "../../models/notification.js";
import type INotificationService from "../../services/inotification_service.js";

export default class FirebaseNotificationService implements INotificationService {
    private firebaseApp: admin.app.App
    constructor(firebaseApp: admin.app.App) {
        this.firebaseApp = firebaseApp
    }
    
    async send(notification: Notification): Promise<void> {
        const message: Message = {
            // notification:{
            // },
            data: {
                "message": "New Message",
            },
            android: {},
            topic: notification.to,

        }
        try {
            const response = await this.firebaseApp?.messaging().send(message)
            console.log(`[${new Date().toISOString()}] Successfully sent a message: ${response}`)
        } catch (err) {
            console.error(`[${new Date().toISOString()}] Error sending a message: `, err)
            throw err
        }
    }

}