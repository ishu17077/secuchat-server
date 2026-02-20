import type File from "../models/file.js"
import express from "express"
export default interface ICloudStorage {
    upload(req: express.Request, res: express.Response): Promise<express.Response | string>
    retrieve(id: string): Promise<File>
}