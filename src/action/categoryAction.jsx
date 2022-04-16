import Types from "../Constant/Types/categoryType";
import { createAction } from "@reduxjs/toolkit"

export const createCategoryAction = createAction(Types.CREATE_CATEGORY_ACTION, (data) => ({ payload: data || {} }));
export const getListAllCategoryAction = createAction(Types.GET_LIST_CATEGORY_ALL_ACTION);
export const getListCategoryAction = createAction(Types.GET_LIST_CATEGORY_ACTION);
export const getDetailCategoryAction = createAction(Types.GET_DETAIL_CATEGORY_ACTION, (id) => ({ payload: id || {} }));
export const updateCategoryAction = createAction(Types.UPDATE_CATEGORY_ACTION, (id, data) => ({ payload: { ...data, params: id } }))
export const createCategorySuccess = createAction(Types.CREATE_CATEGORY_SUCCESS, (data) => ({ payload: data || {} }));
export const getListAllCategorySuccess = createAction(Types.GET_LIST_CATEGORY_ALL_SUCCESS);
export const getListCategorySuccess = createAction(Types.GET_LIST_CATEGORY_SUCCESS, categories => ({ payload: categories }));
export const getDetailCategorySuccess = createAction(Types.GET_DETAIL_CATEGORY_SUCCESS, (id) => ({ payload: id || {} }));
export const updateCategorySuccess = createAction(Types.UPDATE_CATEGORY_SUCCESS, (id, data) => ({ payload: { ...data, params: id } }));
export const createCategoryFailed = createAction(Types.CREATE_CATEGORY_FAILED);
export const getListAllCategoryFailed = createAction(Types.GET_LIST_CATEGORY_ALL_FAILED);
export const getListCategoryFailed = createAction(Types.GET_LIST_CATEGORY_FAILED);
export const getDetailCategoryFailed = createAction(Types.GET_DETAIL_CATEGORY_FAILED);
export const updateCategoryFailed = createAction(Types.UPDATE_CATEGORY_FAILED);
export const clearCategoryAction = createAction(Types.CLEAR_CATEGORY_ACTION);
