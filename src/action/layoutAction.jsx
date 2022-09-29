import { createAction } from "@reduxjs/toolkit";
import Types from "../Constant/Types/layoutTypes";

const layoutAction = {
    createLayoutAction: createAction(Types.CREATE_LAYOUT_ACTION, (data) => ({ payload: data || {} })),
    getListLayoutAction: createAction(Types.GET_LIST_LAYOUT_ACTION, (data) => ({ payload: data || {} })),
    getListAllLayoutAction: createAction(Types.GET_LIST_ALL_LAYOUT_ACTION),
    getDetailLayoutAction: createAction(Types.GET_DETAIL_LAYOUT_ACTION, (id) => ({ payload: id || {} })),
    updateLayoutAction: createAction(Types.UPDATE_LAYOUT_ACTION, (id, data) => ({ payload: { ...data, params: id } })),
    createLayoutSuccess: createAction(Types.CREATE_LAYOUT_SUCCESS, (data) => ({ payload: data || {} })),
    getListLayoutSuccess: createAction(Types.GET_LIST_LAYOUT_SUCCESS),
    getListAllLayoutSuccess: createAction(Types.GET_LIST_ALL_LAYOUT_SUCCESS, (data) => ({ payload: data || {} })),
    getDetailLayoutSuccess: createAction(Types.GET_DETAIL_LAYOUT_SUCCESS, (id) => ({ payload: id || {} })),
    updateLayoutSuccess: createAction(Types.UPDATE_LAYOUT_SUCCESS, (id, data) => ({ payload: { ...data, params: id } })),
    createLayoutFailed: createAction(Types.CREATE_LAYOUT_FAILED),
    getListLayoutFailed: createAction(Types.GET_LIST_LAYOUT_FAILED),
    getListAllLayoutFailed: createAction(Types.GET_LIST_ALL_LAYOUT_FAILED),
    getDetailLayoutFailed: createAction(Types.GET_DETAIL_LAYOUT_FAILED),
    updateLayoutFailed: createAction(Types.UPDATE_LAYOUT_FAILED),
    clearLayoutAction: createAction(Types.CLEAR_LAYOUT_ACTION)
}

export default layoutAction;

