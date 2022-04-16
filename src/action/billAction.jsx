import { createAction } from "@reduxjs/toolkit";
import Types from "../Constant/Types/billTypes";

const billReportAction = {
    getListBillAction: createAction(Types.BILL_GET_LIST_ACTION, (filter) => ({ payload: filter })),
    getBillDetailAction: createAction(Types.BILL_GET_DETAIL_ACTION, (id) => ({payload: id})),
    updateBillAction: createAction(Types.BILL_UPDATE_ACTION, (data) => ({payload: data})),
    getListBillSuccess: createAction(Types.BILL_GET_LIST_SUCCESS, (bill) => ({payload: bill})),
    getBillDetailSuccess: createAction(Types.BILL_GET_DETAIL_SUCCESS, (bill) => ({payload: bill})),
    updateBillSuccess: createAction(Types.BILL_UPDATE_SUCCESS, result => ({payload: result})),
    getListBillFailed: createAction(Types.BILL_GET_LIST_FAILED),
    getBillDetailFailed: createAction(Types.BILL_GET_DETAIL_FAILED),
    updateBillFailed: createAction(Types.BILL_UPDATE_FAILED)
}

export default billReportAction;