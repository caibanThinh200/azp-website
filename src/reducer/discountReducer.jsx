import { createReducer } from "@reduxjs/toolkit";
import ActionType from "../action/discountAction";

const initialState = {
    isDiscountFetching: false,
    result: [],
    item: {},
    all: [],
    isSubmit: false,
    isUpdate: false,
    total: 0,
    page_index: 1,
    page_size: 5,
    page_count: 1
}

export default createReducer(initialState, reducer => {
    reducer
        .addCase(ActionType.createDiscountAction, (state, action) => ({...state, isDiscountFetching: true}))
        .addCase(ActionType.getListDiscountAction, (state, action) => ({...state, isDiscountFetching: true}))
        .addCase(ActionType.getListAllDiscountAction, (state, action) => ({...state, isDiscountFetching: true}))
        .addCase(ActionType.getDetailDiscountAction, (state, action) => ({...state, isDiscountFetching: true}))
        .addCase(ActionType.updateDiscountAction, (state, action) => ({...state, isDiscountFetching: true}))
        .addCase(ActionType.createDiscountSuccess, (state, action) => ({...state, isDiscountFetching: false}))
        .addCase(ActionType.getListDiscountSuccess, (state, action) => ({...state, isDiscountFetching: false, ...(action).payload}))
        .addCase(ActionType.getListAllDiscountSuccess, (state, action) => ({...state, isDiscountFetching: false, ...(action).payload, all: (action).payload?.result, result: []}))
        .addCase(ActionType.getDetailDiscountSuccess, (state, action) => ({...state, isDiscountFetching: false, item: (action).payload}))
        .addCase(ActionType.updateDiscountSuccess, (state, action) => ({...state, isDiscountFetching: false}))
})