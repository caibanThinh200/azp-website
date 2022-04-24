import Types from "../Constant/Types/shoppingCartTypes";
import { createAction } from "@reduxjs/toolkit";

const shoppingCartAction = {
    addAction:  createAction(Types.ADD_TO_CART_ACTION, product => ({payload: product})),
    removeAction: createAction(Types.REMOVE_CART_ACTION, product => ({payload: product})),
    updateQuantityAction: createAction(Types.UPDATE_QUANITY_ACTION, product => ({payload: product}))
}

export default shoppingCartAction;