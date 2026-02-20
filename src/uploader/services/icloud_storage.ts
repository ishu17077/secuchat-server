import type File from "../models/file.js"
import express from "express"
export default interface ICloudStorage {
    upload(file: File): Promise<string>
    retrieve(id: string): Promise<File>
}