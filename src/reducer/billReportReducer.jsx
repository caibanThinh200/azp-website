import billAction from '../action/billAction';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    isBillFetching: false,
    result: [],
    isModal: false,
    resultSubmit: {
        code: 0,
        message: ""
    },
    item: {},
    isSubmit: false,
    isUpdate: false,
    total: 0,
    month: 1,
    revenue: 0,
    page_index: 1,
    page_size: 5,
    page_count: 1
}

export default createReducer(initialState, reducer => {
    reducer
        .addCase(billAction.getListBillAction, (state, action) => ({...state, isBillFetching: true}))
        .addCase(billAction.getBillDetailAction, (state, action) => ({...state, isBillFetching: true}))
        .addCase(billAction.updateBillAction, (state, action) => ({...state, isBillFetching: true}))
        .addCase(billAction.getListBillSuccess, (state, action) => ({...state, isBillFetching: false, ...action.payload}))
        .addCase(billAction.getBillDetailSuccess, (state, action) => ({...state, isBillFetching: false, item: action.payload}))
        .addCase(billAction.updateBillSuccess, (state, action) => ({...state, isBillFetching: false, resultSubmit: action.payload}))
        .addCase(billAction.getListBillFailed, (state, action) => initialState)
        .addCase(billAction.getBillDetailFailed, (state, action) => initialState)
        .addCase(billAction.updateBillFailed, (state, action) => ({...initialState, resultSubmit: action.payload}))
})