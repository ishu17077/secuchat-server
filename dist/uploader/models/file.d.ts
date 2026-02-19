declare enum FileType {
    image = 0,
    audio = 1,
    document = 2,
    video = 3
}
export default interface File {
    data: Uint8Array;
    file_name: string;
    from: string;
    to: string;
    file_type: FileType;
}
export {};
//# sourceMappingURL=file.d.ts.map