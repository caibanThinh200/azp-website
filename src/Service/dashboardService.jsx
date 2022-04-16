import currentConfig from "../Constant/env";
import DashboardResponse from "../Mapping/Response/dashboardResponse";
import ApiService from "../Util/ApiService";
import Urls from "../Util/Urls";

export const getRevenueService = () => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.GENERAL.revenue,
        parser: parseRevenue
    }).get();
};

export const getMonthRevenueService = () => {
    return new ApiService({
        baseURL: currentConfig.API_URL || "",
        endpoint: Urls.GENERAL.monthRevenue,
        parser: parseMonthRevenue
    }).get();
}

const parseRevenue = data => ({
    ...data,
    result: new DashboardResponse(data?.result).getRevenue()
});

const parseMonthRevenue = data => ({
    ...data,
    result: data?.result.map(item => new DashboardResponse(item).getMonthRevenue())
});