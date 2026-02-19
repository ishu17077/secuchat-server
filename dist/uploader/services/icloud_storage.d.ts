import type File from "../models/file.js";
export default interface ICloudStorage {
    upload(file: File): Promise<string>;
    retrieve(id: string): Promise<File>;
}
//# sourceMappingURL=icloud_storage.d.ts.map