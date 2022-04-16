import currentConfig from "../Constant/env";
import UploadResponse from "../Mapping/Response/uploadResponse";
import ApiService from "../Util/ApiService";
import Urls from "../Util/Urls";

export const uploadService = data => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.UPLOAD.loadFile,
        parser: parseItem
    }).post(data);
};

const parseItem = (data) => {
    if(Object.keys(data.result).length > 0) {
        return {
            ...data,
            result: new UploadResponse(data.result)
        }
    }
}