import { createAction } from '@reduxjs/toolkit';
import Types from "../Constant/Types/dashboardTypes";

const dashboardAction = {
    getDashboardRevenueAction: createAction(Types.GET_DASHBOARD_REVENUE_ACTION),
    getDashboardRevenueSuccess: createAction(Types.GET_DASHBOARD_REVENUE_SUCCESS, (revenue) => ({payload: revenue})),
    getDashboardRevenueFailed: createAction(Types.GET_DASHBOARD_REVENUE_FAILED),
    getDashboardMonthRevenueAction: createAction(Types.GET_DASHBOARD_MONTH_REVENUE_ACTION),
    getDashboardMonthRevenueSuccess: createAction(Types.GET_DASHBOARD_MONTH_REVENUE_SUCCESS, (revenue) => ({payload: revenue})),
    getDashboardMonthRevenueFailed: createAction(Types.GET_DASHBOARD_MONTH_REVENUE_FAILED)
}  

export default dashboardAction;