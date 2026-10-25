import {Firestore} from "firebase-admin/firestore"
import FirebaseAdminService from "../../services/firebase_admin_service.js";
import type INotificationService from "../services/inotification_service.js";
import type Message from "../data/models/message.js";
import type Notification from "../models/notification.js";

export default class FirebaseNotifications {
    private firestore: Firestore
    private readonly notificationService: INotificationService
    constructor(notificationService: INotificationService, firestore: Firestore) {
        this.notificationService = notificationService
        this.firestore = firestore
    }

    public start(): void {
        console.log(`[${new Date().toISOString()}] Starting Firestore message listener`)
        this.firestore.collection("messages").onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(async (docChange) => {
                if (docChange.type == "added" || docChange.type == "modified") {
                    const message: Message = docChange.doc.data() as Message
                    const notification: Notification = {
                        from: message.from,
                        to: message.to,
                        time: message.time
                    }
                    await this.notificationService.send(notification)
                }
            })
        }, (err) => {
            console.error(`[${new Date().toISOString()}] Firestore listener error:`, err)
        })
    }

}