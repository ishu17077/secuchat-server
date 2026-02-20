import type { Timestamp } from "firebase-admin/firestore";

export default interface Message {
    from: string,
    to: string,
    contents: string,
    iv: string,
    time: Timestamp,
}