import admin from "firebase-admin"
import FirebaseAdminService from "../../services/firebase_admin_service.js";
import type INotificationService from "../services/inotification_service.js";
import type Message from "../data/models/message.js";
import type Notification from "../models/notification.js";

export default class FirebaseNotifications {
    private firestore: admin.firestore.Firestore
    private readonly notificationService: INotificationService
    constructor(notificationService: INotificationService, firestore: admin.firestore.Firestore) {
        this.notificationService = notificationService
        this.firestore = firestore
    }

    public start(): void {
        console.log(`[${new Date().toISOString()}] Starting Firestore message listener`)
        this.firestore.collection("messages").onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(async (docChange) => {
                if (docChange.type == "added") {
                    const message: Message = docChange.doc.data() as Message
                    const notification: Notification = {
                        from: message.from,
                        to: message.to,
                        time: message.time
                    }
                    try {
                        await this.notificationService.send(notification)
                        console.log(`[${new Date().toISOString()}] Notification sent successfully: from=${message.from} to=${message.to}`)
                    } catch (err) {
                        console.error(`[${new Date().toISOString()}] Error sending notification:`, err)
                    }
                }
            })
        }, (err) => {
            console.error(`[${new Date().toISOString()}] Firestore listener error:`, err)
        })
    }

}