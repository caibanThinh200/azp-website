import ApiResponse from "../Mapping/ApiResponse";
import BillResponse from "../Mapping/Response/billResponse";
import ApiService from "../Util/ApiService"
import Urls from "../Util/Urls"
import DashboardResponse from '../Mapping/Response/dashboardResponse';
import currentConfig from "../Constant/env";

export const getListService = (params) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.BILL_REPORT.getList,
        params: params,
        parser: parseData
    }).get();
}

export const getDetailService = (id) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.BILL_REPORT.detail,
        endpointParams: {id},
        parser: parseItem
    }).get();
}

export const updateService = (data) => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.BILL_REPORT.update,
        endpointParams: {id: data.id},
    }).put(data);
}

export const getRevenueService = () => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.BILL_REPORT.revenue,
        parser: res => ({...res, result: new DashboardResponse(res.result)})
    }).get()
}

const parseItem = (data) => Object.keys(data?.result).length > 0 ? {
    ...data, 
    result: new BillResponse(data?.result)
} : new ApiResponse(data);

const parseData = (data) => data?.result?.length >= 0 ? {
    ...data,
    result: data.result.map((item) => new BillResponse(item))
} : new ApiResponse(data);