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
        this.firestore.collection("messages").onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((docChange) => {
                if (docChange.type == "added") {
                    const message: Message = docChange.doc.data() as Message
                    const notification: Notification = {
                        from: message.from,
                        to: message.to,
                        time: message.time
                    }
                    this.notificationService.send(notification)
                }
            })
        })
    }

}