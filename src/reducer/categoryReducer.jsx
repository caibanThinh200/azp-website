import { createReducer } from '@reduxjs/toolkit';
import {
    createCategoryAction,
    getListAllCategoryAction,
    getDetailCategoryAction,
    updateCategoryAction,
    getListAllCategorySuccess,
    getDetailCategorySuccess,
    updateCategorySuccess,
    createCategorySuccess,
    getListCategoryAction,
    getListCategorySuccess,
    createCategoryFailed,
    getListAllCategoryFailed,
    getListCategoryFailed,
    getDetailCategoryFailed,
    updateCategoryFailed,
    clearCategoryAction
} from '../action/categoryAction';
import CategoryResponse from "../Mapping/Response/categoryResponse";

const initialState = {
    isCategoryFetching: false,
    result: [],
    item: new CategoryResponse(),
    isSubmit: false,
    isUpdate: false,
    total: 0,
    page_index: 1,
    page_size: 5,
    page_count: 1
}

export default createReducer(initialState, reducer => {
    reducer
        .addCase(createCategoryAction, (state, action) => ({ ...state, isCategoryFetching: true }))
        .addCase(getListCategoryAction, (state, action) => ({ ...state, isCategoryFetching: true }))
        .addCase(getListAllCategoryAction, (state, action) => ({ ...state, isCategoryFetching: true }))
        .addCase(getDetailCategoryAction, (state, action) => ({ ...state, isCategoryFetching: true }))
        .addCase(updateCategoryAction, (state, action) => ({ ...state, isCategoryFetching: true }))
        .addCase(createCategorySuccess, (state, action) => ({ ...state, isCategoryFetching: false }))
        .addCase(getListAllCategorySuccess, (state, action) => ({ ...state, isCategoryFetching: false, result: (action).payload }))
        .addCase(getListCategorySuccess, (state, action) => ({ ...state, isCategoryFetching: false, result: (action).payload }))
        .addCase(getDetailCategorySuccess, (state, action) => ({ ...state, isCategoryFetching: false, item: action.payload }))
        .addCase(updateCategorySuccess, (state, action) => ({ ...state, isCategoryFetching: false }))
        .addCase(createCategoryFailed, initialState)
        .addCase(getListAllCategoryFailed, initialState)
        .addCase(getListCategoryFailed, initialState)
        .addCase(getDetailCategoryFailed, initialState)
        .addCase(updateCategoryFailed, initialState)
        .addCase(clearCategoryAction, (state, action) => ({ ...state, item: new CategoryResponse() }))
})