import DashboardResponse from "../Mapping/Response/dashboardResponse";
import ApiService from "../Util/ApiService";
import Urls from "../Util/Urls";

export const getRevenueService = () => {
    return new ApiService({
        baseURL: process.env.REACT_APP_FURNITURE_HOST || "",
        endpoint: Urls.GENERAL.revenue,
        parser: parseRevenue
    }).get();
};

export const getMonthRevenueService = () => {
    return new ApiService({
        baseURL: process.env.REACT_APP_FURNITURE_HOST || "",
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