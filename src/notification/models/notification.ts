import type { Timestamp } from "firebase-admin/firestore";

export default interface Notification {
    from: string,
    to: string,
    time: Timestamp
} 