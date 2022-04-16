import { createAction } from "@reduxjs/toolkit";
import orderTypes from "../Constant/Types/orderType";

const orderAction = {
    checkoutAction: createAction(orderTypes.CHECKOUT_ORDER_ACTION),
    checkoutSuccess: createAction(orderTypes.CHECKOUT_ORDER_SUCCESS, order => ({ payload: order })),
    checkoutFailed: createAction(orderTypes.CHECKOUT_ORDER_FAILED),
    paymentAction: createAction(orderTypes.PAYMENT_ORDER_ACTION),
    paymentSuccess: createAction(orderTypes.PAYMENT_ORDER_SUCCESS, payment => ({ payload: payment })),
    paymentFailed: createAction(orderTypes.PAYMENT_ORDER_FAILED),
    getDetailAction: createAction(orderTypes.GET_ORDER_DETAIL_ACTION),
    getDetailSuccess: createAction(orderTypes.GET_ORDER_DETAIL_SUCCESS, order => ({payload: order})),
    getDetailFailed: createAction(orderTypes.GET_ORDER_DETAIL_FAILED),
    clearOrderAction: createAction(orderTypes.CLEAR_ORDER_ACTION)
}

export default orderAction;