import ApiService from '../Util/ApiService';
import Urls from '../Util/Urls';
import ApiResponse from '../Mapping/ApiResponse';
import AuthResponse from '../Mapping/Response/authResponse';
import currentConfig from '../Constant/env';

export const registerService = (data) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.AUTH.register
    }).post(data);
}

export const loginService = (data) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.AUTH.login
    }).post(data);
}

export const getDetailWithJWTService = (jwt) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.AUTH.token,
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        parser: parseData
    }).get();
}

const parseData = (data) =>  {
    return data.result ? {
        ...data,
        result: new AuthResponse(data.result)
    } : new ApiResponse(data)
}