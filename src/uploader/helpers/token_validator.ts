import * as admin from "firebase-admin"
import type ITokenService from "../services/itoken_service.js";
import { type Request, type Response, type NextFunction } from "express"


export default class TokenValidator {
    constructor(private readonly tokenService: ITokenService) {
    }
    public async validate(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ "error": "Authorization required" })
        }
        const uid: string | null = await this.tokenService.validate(authHeader).catch((err) => null)
        if (uid && req.body["from"] === uid) {
            next()
            return
        }
        return res.status(403).json({ "error": "Unautorized" })
    }
}