import type ICloudStorage from "../../services/icloud_storage.js";
import type File from "../../models/file.js";
export default class VercelBlobStorage implements ICloudStorage {
    upload(file: File): Promise<string>;
    retrieve(id: string): Promise<File>;
}
//# sourceMappingURL=vercel_blob_storage.d.ts.map