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
    
    send(notification: Notification): void {
        const message: Message = {
            // notification:{
            // },
            data: {
                "message": "New Message",
            },
            android: {},
            topic: notification.to,

        }
        this.firebaseApp?.messaging().send(message).then((response: string) => {        
            console.log("Successfully sent a message: ", response)
        }).catch(err => {
            console.log("Error sending a message ", err)
        })
    }

}