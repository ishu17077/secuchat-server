import { upload } from "@vercel/blob/client"
import type ICloudStorage from "../../services/icloud_storage.js";
import type File from "../../models/file.js";
import type { PutBlobResult } from "@vercel/blob";

export default class VercelBlobStorage implements ICloudStorage {
    public async upload(file: File): Promise<string> {
        const randomUID = crypto.randomUUID();
        try {
            const blob: PutBlobResult = await upload(
                randomUID,
                JSON.stringify(file),
                {
                    access: "public",
                    handleUploadUrl: "/upload",
                    onUploadProgress: (progress) => {
                        console.log(`Upload Progress: ${progress.percentage}%`)
                    }
                }

            )
            return Promise.resolve(blob.url)
        } catch (e) {
            return Promise.reject(`Unable to upload the file ${e}`)
        }

    }
    public async retrieve(id: string): Promise<File> {
        throw new Error("Method not implemented.");
    }
}