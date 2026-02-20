import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import express from "express"
import type ICloudStorage from "../../services/icloud_storage.js";
import type File from "../../models/file.js";

export default class VercelBlobStorage implements ICloudStorage {
    public async upload(req: express.Request, res: express.Response): Promise<express.Response | string> {
        const randomUID = crypto.randomUUID();
        const body = req.body;
        try {
            const jsonResp = await handleUpload({
                body: body,
                request: req,
                onBeforeGenerateToken: async (pathname) => {
                    return {
                        allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
                        addRandomSuffix: true,
                    }
                },
                onUploadCompleted: async ({ blob, tokenPayload }) => {
                    console.log("blob upload completed", blob, tokenPayload)
                }
            })

            return res.status(200).json(jsonResp)
        } catch (e) {
            return res.status(400).json({ "error": `Unable to upload the file ${e}` })
        }
    }

    public async retrieve(id: string): Promise<File> {
        throw new Error("Method not implemented.");
    }
}