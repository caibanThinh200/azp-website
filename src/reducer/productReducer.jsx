import {createReducer} from '@reduxjs/toolkit';
import { 
    createProductAction, 
    getListProductAction, 
    getDetailProductAction, 
    updateProductAction, 
    getListProductSuccess, 
    getDetailProductSuccess, 
    updateProductSuccess, 
    createProductSuccess, 
    getInitProductAction, 
    getInitProductSuccess ,
    createProductFailed,
    getListProductFailed,
    getInitProductFailed,
    getDetailProductFailed,
    updateProductFailed,
    clearProductAction
} from '../action/productAction';
import ProductResponse from '../Mapping/Response/productResponse';

const initialState = {
    isProductFetching: false,
    result: [],
    item: {},
    isSubmit: false,
    isUpdate: false,
    total: 0,
    page_index: 1,
    page_size: 5,
    page_count: 1,
    disable_scroll: false,
}

export default createReducer(initialState, reducer => {
    reducer
        .addCase(createProductAction, (state, action) => ({...state, isProductFetching: true}))
        .addCase(getListProductAction, (state, action) => ({...state, isProductFetching: true}))
        .addCase(getInitProductAction, (state, action) => ({...state, isUpdate: false, isProductFetching: true}))
        .addCase(getDetailProductAction, (state, action) => ({...state, isProductFetching: true}))
        .addCase(updateProductAction, (state, action) => ({...state, isProductFetching: true}))
        .addCase(createProductSuccess, (state, action) => ({...state, isProductFetching: false}))
        .addCase(getInitProductSuccess, (state, action) => ({...state, isProductFetching: false, item: (action).payload}))
        .addCase(getListProductSuccess, (state, action) => ({...state, isProductFetching: false, ...(action).payload}))
        .addCase(getDetailProductSuccess, (state, action) => ({...state, isUpdate: true, isProductFetching: false, item: (action).payload}))
        .addCase(updateProductSuccess, (state, action) => ({...state, isProductFetching: false}))
        .addCase(createProductFailed, (state, action) => initialState)
        .addCase(getListProductFailed, (state, action) => initialState)
        .addCase(getInitProductFailed, (state, action) => initialState)
        .addCase(getDetailProductFailed, (state, action) => initialState)
        .addCase(updateProductFailed, (state, action) => initialState)
        .addCase(clearProductAction, (state, action) => ({...state, item: new ProductResponse()}))
});