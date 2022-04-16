import { createReducer } from "@reduxjs/toolkit";
import ActionType from "../action/productTypeAction";
import ProductTypeResponse from "../Mapping/Response/productTypeResponse";

const initialState = {
    isProductTypeFetching: false,
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
        .addCase(ActionType.createProductTypeAction, (state, action) => ({...state, isProductTypeFetching: true}))
        .addCase(ActionType.getCountProductTypeAction, (state, action) => ({...state, isProductTypeFetching: true}))
        .addCase(ActionType.getListProductTypeAction, (state, action) => ({...state, isProductTypeFetching: true}))
        .addCase(ActionType.getListAllProductTypeAction, (state, action) => ({...state, isProductTypeFetching: true}))
        .addCase(ActionType.getDetailProductTypeAction, (state, action) => ({...state, isProductTypeFetching: true}))
        .addCase(ActionType.updateProductTypeAction, (state, action) => ({...state, isProductTypeFetching: true}))
        .addCase(ActionType.createProductTypeSuccess, (state, action) => ({...state, isProductTypeFetching: false}))
        .addCase(ActionType.getCoutProductTypeSuccess, (state, action) => ({...state, isProductTypeFetching: false, ...(action).payload, item: (action).payload?.item || {}}))
        .addCase(ActionType.getListProductTypeSuccess, (state, action) => ({...state, isProductTypeFetching: false, ...(action).payload}))
        .addCase(ActionType.getListAllProductTypeSuccess, (state, action) => ({...state, isProductTypeFetching: false, ...(action).payload, all: (action).payload?.result}))
        .addCase(ActionType.getDetailProductTypeSuccess, (state, action) => ({...state, isProductTypeFetching: false, item: (action).payload.item, isUpdate: action.payload.isUpdate}))
        .addCase(ActionType.updateProductTypeSuccess, (state, action) => ({...state, isProductTypeFetching: false}))
        .addCase(ActionType.createProductTypeFailed, (state, action) => ({...state, isProductTypeFetching: false}))
        .addCase(ActionType.getCoutProductTypeFailed, (state, action) => ({...state, isProductTypeFetching: false}))
        .addCase(ActionType.getListProductTypeFailed, (state, action) => ({...state, isProductTypeFetching: false}))
        .addCase(ActionType.getListAllProductTypeFailed, (state, action) => ({...state, isProductTypeFetching: false}))
        .addCase(ActionType.getDetailProductTypeFailed, (state, action) => ({...state, isProductTypeFetching: false}))
        .addCase(ActionType.updateProductTypeFailed, (state, action) => ({...state, isProductTypeFetching: false}))
        .addCase(ActionType.clearProductTypeAction, (state, action) => ({...state, item: new ProductTypeResponse()}))
})