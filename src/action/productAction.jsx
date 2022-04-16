import Types from "../Constant/Types/productType";
import {createAction} from "@reduxjs/toolkit"

export const createProductAction = createAction(Types.CREATE_PRODUCT_ACTION, (data) => ({payload: data || {}}));
export const getListProductAction = createAction(Types.GET_LIST_PRODUCT_ACTION, (data) => ({payload: data || {}}));
export const getInitProductAction = createAction(Types.GET_INIT_PRODUCT_ACTION);
export const getDetailProductAction = createAction(Types.GET_DETAIL_PRODUCT_ACTION, (id) => ({payload: id || {}}));
export const updateProductAction = createAction(Types.UPDATE_PRODUCT_ACTION, (data) => ({payload: data}));
export const clearProductAction = createAction(Types.CLEAR_PRODUCT_ACTION);
export const createProductSuccess = createAction(Types.CREATE_PRODUCT_SUCCESS, (data) => ({payload: data || {}}));
export const getListProductSuccess = createAction(Types.GET_LIST_PRODUCT_SUCCESS);
export const getInitProductSuccess = createAction(Types.GET_INIT_PRODUCT_SUCCESS);
export const getDetailProductSuccess = createAction(Types.GET_DETAIL_PRODUCT_SUCCESS, (id) => ({payload: id || {}}));
export const updateProductSuccess = createAction(Types.UPDATE_PRODUCT_SUCCESS, (data) => ({payload: data}));
export const createProductFailed = createAction(Types.CREATE_PRODUCT_FAILED);
export const getListProductFailed = createAction(Types.GET_LIST_PRODUCT_FAILED);
export const getInitProductFailed = createAction(Types.GET_INIT_PRODUCT_FAILED);
export const getDetailProductFailed = createAction(Types.GET_DETAIL_PRODUCT_FAILED);
export const updateProductFailed = createAction(Types.UPDATE_PRODUCT_FAILED);
