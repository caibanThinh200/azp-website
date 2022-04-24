import { createReducer } from "@reduxjs/toolkit"
import orderAction from "../action/orderAction"

const initialState = {
    isOrderFetching: false,
    result: [],
    item: {},
    all: [],
    isSubmit: false,
    isUpdate: false,
    total: 0,
    page_index: 1,
    page_size: 5,
    page_count: 1,
    disable_scroll: false,
}

export default createReducer(initialState, reducer => {
    reducer
        .addCase(orderAction.checkoutAction, (state, action) => ({ ...state, isOrderFetching: true }))
        .addCase(orderAction.checkoutSuccess, (state, action) => ({ ...state, isOrderFetching: false, item: action.payload || {} }))
        .addCase(orderAction.checkoutFailed, () => initialState)
        .addCase(orderAction.paymentAction, (state, action) => ({ ...state, isOrderFetching: false }))
        .addCase(orderAction.paymentSuccess, (state, action) => ({ ...state, isOrderFetching: false, item: action.payload || {} }))
        .addCase(orderAction.paymentFailed, () => initialState)
        .addCase(orderAction.getDetailAction, (state, action) => ({ ...state, isOrderFetching: true }))
        .addCase(orderAction.getDetailSuccess, (state, action) => ({ ...state, isOrderFetching: false, item: action?.payload || {} }))
        .addCase(orderAction.getDetailFailed, () => initialState)
        .addCase(orderAction.clearOrderAction, () => initialState)
})