import { getMessaging, type Message, type Messaging } from "firebase-admin/messaging";
import FirebaseAdminService from "../../../services/firebase_admin_service.js";
import {type App,} from "firebase-admin/app"
import type Notification from "../../models/notification.js";
import type INotificationService from "../../services/inotification_service.js";

export default class FirebaseNotificationService implements INotificationService {
    private messaging: Messaging
    constructor(firebaseApp: App) {
       this.messaging= getMessaging(firebaseApp)
    }

    async send(notification: Notification): Promise<void> {
        const message: Message = {
            // notification:{
            // },
            data: {
                "message": "New Message",
            },
            android: {
                priority: "high",
            },
            apns:{
                headers:{
                    "apns-priority": "5",
                    "apns-push-type": "background"
                },
                payload:{
                    aps:{
                        contentAvailable: true,
                    }
                }
            },
            
            topic: notification.to,

        }
        try {
            const response = await this.messaging.send(message)
            console.log(`[${new Date().toISOString()}] Successfully sent a message: ${response}`)
        } catch (err) {
            console.error(`[${new Date().toISOString()}] Error sending a message: `, err)
            throw err
        }
    }

}