import type Notification from "../models/notification.js";

export default interface INotificationService {
    send(notification: Notification): void
}