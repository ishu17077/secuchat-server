import type { Request, Response } from "express";
import type ICloudStorage from "../../services/icloud_storage.js";
export default class UploadController {
    private readonly cloudStorage;
    constructor(cloudStorage: ICloudStorage);
    upload(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=upload_controller.d.ts.map