import * as serviceAccount from "../../../e2eencryptedchatapp-firebase-adminsdk-dm8po-b13da396cc.json";
import * as admin from "firebase-admin"
import type ITokenService from "../services/itoken_service.js";
import { Request, Response, NextFunction } from "express"


export default class TokenValidator {
    constructor(private readonly tokenService: ITokenService) {

    }
    public async validate(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(401).json({ "error": "Authorization required" })
        }
    }
}