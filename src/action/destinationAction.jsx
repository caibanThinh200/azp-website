import Types from "../Constant/Types/destinationTypes";
import { createAction } from "@reduxjs/toolkit";

const provinceAction = {
    getListProvinceAction: createAction(Types.GET_LIST_PROVINCE_ACTION),
    getListProvinceSuccess: createAction(Types.GET_LIST_PROVINCE_SUCCESS, province => ({ payload: province })),
    getListProvinceFailed: createAction(Types.GET_LIST_PROVINCE_FAILED)
}

const districtAction = {
    getListDistrictAction: createAction(Types.GET_LIST_DISTRICT_ACTION),
    getListDistrictSuccess: createAction(Types.GET_LIST_DISTRICT_SUCCESS, district => ({ payload: district })),
    getListDistrictFailed: createAction(Types.GET_LIST_DISTRICT_FAILED)
}

const wardAction = {
    getListWardAction: createAction(Types.GET_LIST_WARD_ACTION),
    getListWardSuccess: createAction(Types.GET_LIST_WARD_SUCCESS, ward => ({ payload: ward })),
    getListWardFailed: createAction(Types.GET_LIST_WARD_FAILED)
}

const destinationAction = {
    ...districtAction, 
    ...provinceAction,
    ...wardAction
}

export default destinationAction;