import INFO_DEFINE from "../../Constant/infoDefine";
import ProductTypeResponse from "./productTypeResponse";
import { getThumbsUrl } from "../../Util/function"

export default class CategoryResponse {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.id = data?._id || "";
        this.name = data?.name || "";
        this.code = data?.code || "";
        this.productTypes = (data?.productTypes || []).length > 0 ? (data?.productTypes || []).map(item => new ProductTypeResponse(item)) : [];
        this.products = (data?.products || []).length > 0 ? (data?.products || []).map(item => new ProductTypeResponse(item)) : [];
        this.thumb = getThumbsUrl(data?.thumb)[0];
        this.created_at = data?.created_at || "";
        this.updated_at = data?.updated_at || "";
    }

    // getThumbUrls(thumb = {}) {
    //     return Object.keys(thumb).length > 0 && {
    //         ...thumb,
    //         name: `${process.env.REACT_APP_FURNITURE_DEV_HOST}/${INFO_DEFINE.UPLOAD.key}/${thumb?.name}`
    //     } || {};
    // }
}