// import DEFINE_INFORMATION from '../../Constant/define';
import INFO_DEFINE from '../../Constant/infoDefine';

export default class UploadResponse {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.destination = data?.destination || "";
        this.encoding = data?.encoding || "";
        this.fieldname = data?.fieldname || "";
        this.filename = this.generateThumbUrl(data?.filename) || "";
        this.mimetype = data?.mimetype || "";
        this.originalname = data?.originalname || "";
        this.path = data?.path || "";
        this.size = data?.size || 0
    }

    generateThumbUrl(url) {
        return url ? `${process.env.REACT_APP_FURNITURE_HOST}/${INFO_DEFINE.UPLOAD.key}/${url}` : ""
    }

    getFileName() {
        return this.filename;
    }
}

