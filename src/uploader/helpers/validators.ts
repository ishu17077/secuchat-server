import { body, validationResult } from "express-validator"
import { type Request, type Response, type NextFunction } from "express"


export const uploadValidation = () => {
    return [
        body("data", "File Data is required").notEmpty(),
        body("from", "Message sender cannot be empty").notEmpty(),
        body("to", "Message recipient cannot be empty").notEmpty(),
        body("file_type", "Invalid File Type").notEmpty().isIn(["image", "audio", "document", "video"]),
    ]
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }

    let extractedErrs = ""

    errors.array({ onlyFirstError: true }).map((err: { type: any, msg: any }) => {
        extractedErrs = err.msg
    })

    return res.status(422).json({ "error": extractedErrs })

}