enum FileType { image, audio, document, video }

export default interface File {
    data: Uint8Array,
    file_name: string,
    from: string,
    to: string,
    file_type: FileType,
    auth_token: string,
}