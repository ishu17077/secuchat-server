// import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import type ICloudStorage from "../../services/icloud_storage.js";
import type File from "../../models/file.js";
import { put } from "@vercel/blob";

const crypto = globalThis.crypto;

export default class VercelBlobStorage implements ICloudStorage {
    public async upload(file: File): Promise<string> {
        const randomUID = crypto.randomUUID();
        try {
            const uploadFile = await put(
                randomUID,
                JSON.stringify(file),
                {
                    access: "public",
                }
            );
            return Promise.resolve(uploadFile.url);
        } catch (e) {
            return Promise.reject("Cannot upload the file")
        }
    }

    public async retrieve(id: string): Promise<File> {
        throw new Error("Method not implemented.");
    }
}