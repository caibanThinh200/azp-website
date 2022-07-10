import currentConfig from "../Constant/env"
import { DistrictResponse, ProvinceResponse, WardResponse } from "../Mapping/Response/destinationResponse"
import ApiService from "../Util/ApiService"
import Urls from "../Util/Urls"

export const getListProvinceService = () => {
    return new ApiService({
        baseURL: currentConfig.DESTINATION || "",
        endpoint: "/",
        params: { depth: 2 },
        credential: false,
        parser: parseProvinceResult
    }).get()
}

export const getListDistrictService = (code) => {
    return new ApiService({
        baseURL: currentConfig.DESTINATION || "",
        endpoint: Urls.DESTINATION.getListDistrict,
        endpointParams: { code },
        params: { depth: 2 },
        credential: false,
        parser: parseDistrictResult
    }).get()
}

export const getListWardService = code => {
    return new ApiService({
        baseURL: currentConfig.DESTINATION || "",
        endpoint: Urls.DESTINATION.getListWard,
        endpointParams: { code },
        params: { depth: 2 },
        credential: false,
        parser: parseWardResult
    }).get()
}

const parseProvinceResult = data => ({
    result: (data || []).map(item => new ProvinceResponse(item))
});

const parseDistrictResult = data => ({
    ...data,
    result: (data?.districts || []).map(item => new DistrictResponse(item))
});

const parseWardResult = data => ({
    ...data,
    result: (data?.wards || []).map(item => new WardResponse(item))
});