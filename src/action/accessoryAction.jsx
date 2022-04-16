import { createAction } from "@reduxjs/toolkit";
import Types from "../Constant/Types/accessoryTypes";

const accessoryAction = {
    createAccessoryAction: createAction(Types.CREATE_ACCESSORY_ACTION, (data) => ({ payload: data || {} })),
    getListAccessoryAction: createAction(Types.GET_LIST_ACCESSORY_ACTION, (data) => ({ payload: data || {} })),
    getListAllAccessoryAction: createAction(Types.GET_LIST_ALL_ACCESSORY_ACTION),
    getDetailAccessoryAction: createAction(Types.GET_DETAIL_ACCESSORY_ACTION, (id) => ({ payload: id || {} })),
    updateAccessoryAction: createAction(Types.UPDATE_ACCESSORY_ACTION, (id, data) => ({ payload: { ...data, params: id } })),
    createAccessorySuccess: createAction(Types.CREATE_ACCESSORY_SUCCESS, (data) => ({ payload: data || {} })),
    getListAccessorySuccess: createAction(Types.GET_LIST_ACCESSORY_SUCCESS),
    getListAllAccessorySuccess: createAction(Types.GET_LIST_ALL_ACCESSORY_SUCCESS, (data) => ({ payload: data || {} })),
    getDetailAccessorySuccess: createAction(Types.GET_DETAIL_ACCESSORY_SUCCESS, (id) => ({ payload: id || {} })),
    updateAccessorySuccess: createAction(Types.UPDATE_ACCESSORY_SUCCESS, (id, data) => ({ payload: { ...data, params: id } })),
    createAccessoryFailed: createAction(Types.CREATE_ACCESSORY_FAILED),
    getListAccessoryFailed: createAction(Types.GET_LIST_ACCESSORY_FAILED),
    getListAllAccessoryFailed: createAction(Types.GET_LIST_ALL_ACCESSORY_FAILED),
    getDetailAccessoryFailed: createAction(Types.GET_DETAIL_ACCESSORY_FAILED),
    updateAccessoryFailed: createAction(Types.UPDATE_ACCESSORY_FAILED)
}

export default accessoryAction;

