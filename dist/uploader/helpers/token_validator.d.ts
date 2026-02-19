import type ITokenService from "../services/itoken_service.js";
import { type Request, type Response, type NextFunction } from "express";
export default class TokenValidator {
    private readonly tokenService;
    constructor(tokenService: ITokenService);
    validate(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
//# sourceMappingURL=token_validator.d.ts.map