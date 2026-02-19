import { upload } from "@vercel/blob/client";
export default class VercelBlobStorage {
    async upload(file) {
        const randomUID = crypto.randomUUID();
        try {
            const blob = await upload(randomUID, JSON.stringify(file), {
                access: "public",
                handleUploadUrl: "/upload",
                onUploadProgress: (progress) => {
                    console.log(`Upload Progress: ${progress.percentage}%`);
                }
            });
            return Promise.resolve(blob.url);
        }
        catch (e) {
            return Promise.reject(`Unable to upload the file ${e}`);
        }
    }
    async retrieve(id) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=vercel_blob_storage.js.map