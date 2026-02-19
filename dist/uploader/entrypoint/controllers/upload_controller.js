export default class UploadController {
    cloudStorage;
    constructor(cloudStorage) {
        this.cloudStorage = cloudStorage;
    }
    async upload(req, res) {
        const { data, file_name, from, to, file_type, auth_token } = req.body;
        const file = req.body;
        let errs = "";
        const downloadUrl = await this.cloudStorage.upload(file).catch((err) => {
            errs = err;
            return null;
        });
        if (downloadUrl) {
            return res.status(200).json({ "url": downloadUrl });
        }
        return res.status(500).json({ "error": errs });
    }
}
//# sourceMappingURL=upload_controller.js.map