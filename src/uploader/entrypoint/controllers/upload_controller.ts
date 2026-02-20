import type TokenValidator from "../../helpers/token_validator.js";
import type { Request, Response } from "express";
import type ICloudStorage from "../../services/icloud_storage.js";
import type File from "../../models/file.js";

export default class UploadController {
    private readonly cloudStorage: ICloudStorage

    constructor(cloudStorage: ICloudStorage) {
        this.cloudStorage = cloudStorage
    }

    public async upload(req: Request, res: Response) {
        const { data, file_name, from, to, file_type, auth_token } = req.body;
        const file: File = req.body as File;
        let errs = "";

        return await this.cloudStorage.upload(req, res).catch((err) => {
            return { "error": err }
        });

    }
}