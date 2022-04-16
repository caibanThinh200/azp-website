import { createAction } from "@reduxjs/toolkit";
import Types from "../Constant/Types/productTypeTypes";

const productTypeAction = {
    createProductTypeAction: createAction(Types.CREATE_PRODUCT_TYPE_ACTION, (data) => ({ payload: data || {} })),
    getCountProductTypeAction: createAction(Types.GET_PRODUCT_TYPE_COUNT_ACTION),
    getListProductTypeAction: createAction(Types.GET_LIST_PRODUCT_TYPE_ACTION, (data) => ({ payload: data || {} })),
    getListAllProductTypeAction: createAction(Types.GET_LIST_ALL_PRODUCT_TYPE_ACTION),
    getDetailProductTypeAction: createAction(Types.GET_DETAIL_PRODUCT_TYPE_ACTION, (id) => ({ payload: id || {} })),
    updateProductTypeAction: createAction(Types.UPDATE_PRODUCT_TYPE_ACTION, (id, data) => ({ payload: { ...data, params: id } })),
    createProductTypeSuccess: createAction(Types.CREATE_PRODUCT_TYPE_SUCCESS, (data) => ({ payload: data || {} })),
    getCoutProductTypeSuccess: createAction(Types.GET_PRODUCT_TYPE_COUNT_SUCCESS),
    getListProductTypeSuccess: createAction(Types.GET_LIST_PRODUCT_TYPE_SUCCESS),
    getListAllProductTypeSuccess: createAction(Types.GET_LIST_ALL_PRODUCT_TYPE_SUCCESS, (data) => ({ payload: data || {} })),
    getDetailProductTypeSuccess: createAction(Types.GET_DETAIL_PRODUCT_TYPE_SUCCESS, (id) => ({ payload: id || {} })),
    updateProductTypeSuccess: createAction(Types.UPDATE_PRODUCT_TYPE_SUCCESS, (id, data) => ({ payload: { ...data, params: id } })),
    createProductTypeFailed: createAction(Types.CREATE_PRODUCT_TYPE_FAILED, (data) => ({ payload: data || {} })),
    getCoutProductTypeFailed: createAction(Types.GET_PRODUCT_TYPE_COUNT_FAILED),
    getListProductTypeFailed: createAction(Types.GET_LIST_PRODUCT_TYPE_FAILED),
    getListAllProductTypeFailed: createAction(Types.GET_LIST_PRODUCT_TYPE_ALL_FAILED),
    getDetailProductTypeFailed: createAction(Types.GET_DETAIL_PRODUCT_TYPE_FAILED),
    updateProductTypeFailed: createAction(Types.UPDATE_PRODUCT_TYPE_FAILED),
    clearProductTypeAction: createAction(Types.CLEAR_PRODUCT_TYPE_ACTION)
}

export default productTypeAction;

