import { type Request, type Response, type NextFunction } from "express";
export declare const uploadValidation: () => import("express-validator").ValidationChain[];
export declare const validate: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=validators.d.ts.map