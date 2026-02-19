import express from "express";
import TokenValidator from "../../helpers/token_validator.js";
import type ICloudStorage from "../../services/icloud_storage.js";
export default class UploadRouter {
    static configure(tokenValidator: TokenValidator, cloudStorage: ICloudStorage): express.Router;
    private static composeController;
}
//# sourceMappingURL=upload_router.d.ts.map