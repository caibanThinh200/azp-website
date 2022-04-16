import { createAction } from "@reduxjs/toolkit";
import Types from "../Constant/Types/discountTypes";

const discountAction = {
    createDiscountAction: createAction(Types.CREATE_DISCOUNT_ACTION, (data) => ({ payload: data || {} })),
    getListDiscountAction: createAction(Types.GET_LIST_DISCOUNT_ACTION, (data) => ({ payload: data || {} })),
    getListAllDiscountAction: createAction(Types.GET_LIST_ALL_DISCOUNT_ACTION),
    getDetailDiscountAction: createAction(Types.GET_DETAIL_DISCOUNT_ACTION, (id) => ({ payload: id || {} })),
    updateDiscountAction: createAction(Types.UPDATE_DISCOUNT_ACTION, (id, data) => ({ payload: { ...data, params: id } })),
    createDiscountSuccess: createAction(Types.CREATE_DISCOUNT_SUCCESS, (data) => ({ payload: data || {} })),
    getListDiscountSuccess: createAction(Types.GET_LIST_DISCOUNT_SUCCESS),
    getListAllDiscountSuccess: createAction(Types.GET_LIST_ALL_DISCOUNT_SUCCESS, (data) => ({ payload: data || {} })),
    getDetailDiscountSuccess: createAction(Types.GET_DETAIL_DISCOUNT_SUCCESS, (id) => ({ payload: id || {} })),
    updateDiscountSuccess: createAction(Types.UPDATE_DISCOUNT_SUCCESS, (id, data) => ({ payload: { ...data, params: id } })),
    createDiscountFailed: createAction(Types.CREATE_DISCOUNT_FAILED),
    getListDiscountFailed: createAction(Types.GET_LIST_DISCOUNT_FAILED),
    getListAllDiscountFailed: createAction(Types.GET_LIST_ALL_DISCOUNT_FAILED),
    getDetailDiscountFailed: createAction(Types.GET_DETAIL_DISCOUNT_FAILED),
    updateDiscountFailed: createAction(Types.UPDATE_DISCOUNT_FAILED)
}

export default discountAction;

