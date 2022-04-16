import CategoryResponse from '../Mapping/Response/categoryResponse';
import ApiService from '../Util/ApiService';
import ApiResponse from '../Mapping/ApiResponse';
import Urls from '../Util/Urls';
import currentConfig from '../Constant/env';

export const getListService = () => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.CATEGORY.getList,
        parser: parseData
    }).get()
}

export const getListAllService = () => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.CATEGORY.all,
        parser: parseData
    }).get()
}

export const createService = data => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.CATEGORY.create,
    }).post(data);
}

export const getDetailService = id => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.CATEGORY.getDetail,
        endpointParams: {id},
        parser: parseItem
    }).get();
}

export const updateService = (id, data) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.CATEGORY.update,
        endpointParams: {id},
    }).put(data);
}

const parseItem = (data) => {
    if(Object.keys(data.result).length > 0) {
        return {
            ...data,
            test: 1,
            result: new CategoryResponse(data.result)
        }
    }
}

const parseData = (data) => {
    return data?.result?.length > 0 ? {
        ...data,
        result: data.result.map((item) => new CategoryResponse(item))
    } : new ApiResponse(data)
};