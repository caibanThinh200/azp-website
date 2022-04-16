import { createReducer } from "@reduxjs/toolkit";
import ActionType from "../action/accessoryAction";

const initialState = {
    isAccessoryFetching: false,
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
        .addCase(ActionType.createAccessoryAction, (state, action) => ({...state, isAccessoryFetching: true}))
        .addCase(ActionType.getListAccessoryAction, (state, action) => ({...state, isAccessoryFetching: true}))
        .addCase(ActionType.getListAllAccessoryAction, (state, action) => ({...state, isAccessoryFetching: true}))
        .addCase(ActionType.getDetailAccessoryAction, (state, action) => ({...state, isAccessoryFetching: true}))
        .addCase(ActionType.updateAccessoryAction, (state, action) => ({...state, isAccessoryFetching: true}))
        .addCase(ActionType.createAccessorySuccess, (state, action) => ({...state, isAccessoryFetching: false}))
        .addCase(ActionType.getListAccessorySuccess, (state, action) => ({...state, isAccessoryFetching: false, ...(action).payload}))
        .addCase(ActionType.getListAllAccessorySuccess, (state, action) => ({...state, isAccessoryFetching: false, ...(action).payload, all: (action).payload?.result, result: []}))
        .addCase(ActionType.getDetailAccessorySuccess, (state, action) => ({...state, isAccessoryFetching: false, item: (action).payload}))
        .addCase(ActionType.updateAccessorySuccess, (state, action) => ({...state, isAccessoryFetching: false}))
})