import ApiService from '../Util/ApiService';
import Urls from '../Util/Urls';
import ApiResponse from '../Mapping/ApiResponse';
import ProductTypeResponse from '../Mapping/Response/productTypeResponse';
import { omit } from 'lodash';
import currentConfig from '../Constant/env';


export const getListService = (params) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.PRODUCT_TYPE.getList,
        params: params,
        parser: parseData
    }).get();
}

export const getListAllService = () => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.PRODUCT_TYPE.all,
        parser: parseData
    }).get();
}

export const getCountService = () => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.PRODUCT_TYPE.getCount,
        parser: (res) => omit({ ...res, item: new ProductTypeResponse(res.result) }, ["result"])
    }).get();
}

export const createService = (data) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.PRODUCT_TYPE.create,
        parser: (res) => res
    }).post(data)
}

export const getDetailService = (id) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.PRODUCT_TYPE.getDetail,
        endpointParams: { id },
        parser: (data) => ({ ...data, result: new ProductTypeResponse(data?.result) })
    }).get()
}

export const updateService = (id, data) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.PRODUCT_TYPE.update,
        endpointParams: { id },
    }).put(data)
}

const parseData = (data) => data?.result?.length >= 0 ? {
    ...data,
    result: data.result.map((item) => new ProductTypeResponse(item))
} : new ApiResponse(data);