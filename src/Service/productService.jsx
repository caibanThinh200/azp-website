import ApiService from '../Util/ApiService';
import Urls from '../Util/Urls';
import ApiResponse from '../Mapping/ApiResponse';
import ProductResponse from '../Mapping/Response/productResponse';
import { get } from 'lodash';
import currentConfig from '../Constant/env';


export const getListService = (params) => {
    return new ApiService({
        baseURL: currentConfig.API_URL,
        endpoint: Urls.PRODUCT.getList,
        params: params,
        parser: parseData
    }).get();
}

export const getInitService = () => {
    return new ApiService({
        baseURL: process.env.REACT_APP_FURNITURE_HOST || "",
        endpoint: Urls.PRODUCT.init,
        parser: parseItem
    }).get();
}

export const getDetailService = (slug) => {
    return new ApiService({
        baseURL: process.env.REACT_APP_FURNITURE_DEV_HOST || "",
        endpoint: Urls.PRODUCT.getDetail,
        endpointParams: {slug},
        parser: parseItem
    }).get();
}

export const createService = (data) => {
    return new ApiService({
        baseURL: process.env.REACT_APP_FURNITURE_HOST || "",
        endpoint: Urls.PRODUCT.create,
    }).post(data);
}

export const updateService = (id, data) => {
    return new ApiService({
        baseURL: process.env.REACT_APP_FURNITURE_HOST || "",
        endpointParams: {id},
        endpoint: Urls.PRODUCT.update
    }).put(data);
}

const parseItem = (data) => {
    return {
        ...data,
        result: new ProductResponse(data.result)
    }
}

const parseData = (data) => {
    return {
        ...data,
        result: (data.result || []).map((item) => new ProductResponse(item)) || []
    }
};