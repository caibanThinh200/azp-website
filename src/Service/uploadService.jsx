import UploadResponse from "../Mapping/Response/uploadResponse";
import ApiService from "../Util/ApiService";
import Urls from "../Util/Urls";

export const uploadService = data => {
    return new ApiService({
        baseURL: process.env.REACT_APP_FURNITURE_HOST || "",
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