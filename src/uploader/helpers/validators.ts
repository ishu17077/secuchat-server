import { body } from "express-validator"

export const uploadValidation = () => {
    return [
        body("data", "File Data is required").notEmpty(),
        body("from", "Message sender cannot be empty").notEmpty(),
        body("file_type", "Invalid File Type").notEmpty().isIn(["image", "audio", "document", "video"])
    ]
}