import { createReducer } from "@reduxjs/toolkit";
import dashboardAction from '../action/dashboardAction';

const initialState = {
    isDashBoardFetching: false,
    result: {
        revenue: [],
        monthRevenue: []
    },
    item: {
        revenue: {},
        monthRevenue: {}
    }
}

const dashBoardReducer = createReducer(initialState, reducer => {
    reducer
        .addCase(dashboardAction.getDashboardRevenueAction, (state, action) => ({...state, isDashBoardFetching: true}))
        .addCase(dashboardAction.getDashboardRevenueSuccess, (state, action) => ({...state, isDashBoardFetching: false, item: {...state.item, revenue: action.payload}}))
        .addCase(dashboardAction.getDashboardRevenueFailed, () => (initialState))
        .addCase(dashboardAction.getDashboardMonthRevenueAction, (state, action) => ({...state, isDashBoardFetching: true}))
        .addCase(dashboardAction.getDashboardMonthRevenueSuccess, (state, action) => ({...state, isDashBoardFetching: false, result: {...state.result, monthRevenue: action.payload}}))
        .addCase(dashboardAction.getDashboardMonthRevenueFailed, () => (initialState))
})

export default dashBoardReducer;