import * as admin from "firebase-admin";
import {} from "express";
export default class TokenValidator {
    tokenService;
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async validate(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ "error": "Authorization required" });
        }
        const uid = await this.tokenService.validate(authHeader).catch((err) => null);
        if (uid && req.body["from"] === uid) {
            return next();
        }
        return res.status(403).json({ "error": "Unauthorized" });
    }
}
//# sourceMappingURL=token_validator.js.map