import ApiService from '../Util/ApiService';
import Urls from '../Util/Urls';
import ApiResponse from '../Mapping/ApiResponse';
import AccessoryResponse from '../Mapping/Response/attributeResponse';
import currentConfig from '../Constant/env';

export const getListService = (params) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.ATTRIBUTE.getList,
        params: params,
        parser: parseData
    }).get();
}

export const getListAllService = () => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.ATTRIBUTE.all,
        parser: parseData
    }).get();
}

export const createService = data => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.ATTRIBUTE.create,
    }).post(data);
}

export const updateService = (id, data) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.ATTRIBUTE.update,
        endpointParams: {id},
    }).put(data);
}

export const getDetailService = id => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.ATTRIBUTE.getDetail,
        endpointParams: {id},
        parser: parseItem
    }).get();
}

// export const getDetailService = (id: string) => {
//     return new ApiService({
//         baseURL: currentConfig.API_URL || "",
//         endpoint: Urls.PRODUCT.getDetail,
//         endpointParams: {id},
//         parser: (data: ResponseInterface) => ({...data, result: new ProductResponse(data?.result)})
//     }).get()
// }

const parseItem = (data) => Object.keys(data?.result)?.length > 0 ? {
    ...data,
    result: new AccessoryResponse(data?.result)
} : new ApiResponse(data);

const parseData = (data) => data?.result?.length >= 0 ? {
    ...data,
    result: data.result.map((item) => new AccessoryResponse(item))
} : new ApiResponse(data);