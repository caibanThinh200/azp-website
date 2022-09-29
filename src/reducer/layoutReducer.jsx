import { createReducer } from "@reduxjs/toolkit";
import ActionType from "../action/layoutAction";

const initialState = {
    isLayoutFetching: false,
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
        .addCase(ActionType.createLayoutAction, (state, action) => ({...state, isLayoutFetching: true}))
        .addCase(ActionType.getListLayoutAction, (state, action) => ({...state, isLayoutFetching: true}))
        .addCase(ActionType.getListAllLayoutAction, (state, action) => ({...state, isLayoutFetching: true}))
        .addCase(ActionType.getDetailLayoutAction, (state, action) => ({...state, isLayoutFetching: true}))
        .addCase(ActionType.updateLayoutAction, (state, action) => ({...state, isLayoutFetching: true}))
        .addCase(ActionType.createLayoutSuccess, (state, action) => ({...state, isLayoutFetching: false}))
        .addCase(ActionType.getListLayoutSuccess, (state, action) => ({...state, isLayoutFetching: false, ...(action).payload}))
        .addCase(ActionType.getListAllLayoutSuccess, (state, action) => ({...state, isLayoutFetching: false, ...(action).payload, all: (action).payload?.result, result: []}))
        .addCase(ActionType.getDetailLayoutSuccess, (state, action) => ({...state, isLayoutFetching: false, item: (action).payload}))
        .addCase(ActionType.updateLayoutSuccess, (state, action) => ({...state, isLayoutFetching: false}))
        .addCase(ActionType.clearLayoutAction, () => initialState)
})