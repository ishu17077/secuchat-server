import type TokenValidator from "../../helpers/token_validator.js";
import type { Request, Response } from "express";
export default class UploadController {
    private readonly tokenValidator: TokenValidator

    constructor(tokenValidator: TokenValidator) {
        this.tokenValidator = tokenValidator
    }

    public async upload(req: Request, res: Response) {
        try {
            const { data, file_name, from, to, file_type, auth_token } = req.body

        }
    }
}