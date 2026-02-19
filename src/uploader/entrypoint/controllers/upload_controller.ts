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

        const downloadUrl: string | null = await this.cloudStorage.upload(file).catch((err) => {
            errs = err;
            return null;
        });

        if (downloadUrl) {
            return res.status(200).json({ "url": downloadUrl });
        }
        return res.status(500).json({ "error": errs });
    }
}