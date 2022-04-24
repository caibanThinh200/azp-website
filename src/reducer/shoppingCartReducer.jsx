import { createReducer } from "@reduxjs/toolkit";
import { message, notification } from "antd";
import { pullAllBy, update } from "lodash";
import ActionType from "../action/shoppingCartAction";
import INFO_DEFINE from "../Constant/infoDefine";

const initialState = {
  isShoppingCartFetching: false,
  result: JSON.parse(localStorage.getItem(INFO_DEFINE.KEY.cart)) || [],
  item: {},
  all: [],
  price: (JSON.parse(localStorage.getItem(INFO_DEFINE.KEY.cart)) || []).reduce(
    (prev, current) => {
      return prev + current.price * current?.quantity;
    },
    0
  ),
};

export default createReducer(initialState, (reducer) => {
  reducer
    .addCase(ActionType.addAction, (state, action) => {
      const updateCart = [...state.result, action.payload];
      localStorage.setItem(INFO_DEFINE.KEY.cart, JSON.stringify(updateCart));
      message.success(
        `Sản phẩm ${action.payload?.code} đã được thêm vào giỏ hàng`
      );
      return {
        ...state,
        result: [...state.result, action.payload],
        price: [...state.result, action.payload].reduce((prev, current) => {
          return prev + current.price * current?.quantity;
        }, 0),
      };
    })
    .addCase(ActionType.removeAction, (state, action) => {
      const updateCart = state.result.filter(
        (cart) => cart?.id !== action.payload?.id
      );
      localStorage.setItem(INFO_DEFINE.KEY.cart, JSON.stringify(updateCart));
      notification.warning({
        description: "Đã xóa sản phẩm khỏi giỏ hàng",
      });
      return {
        ...state,
        result: updateCart,
        price: state.price - action.payload?.price * action.payload?.quantity,
      };
    })
    .addCase(ActionType.updateQuantityAction, (state, action) => {
      const updateCart = state.result.map((item) => {
        if (item?.id === action.payload?.id) {
          item = {
            ...item,
            quantity:
              action.payload?.type === "increment"
                ? action.payload?.quantity + 1
                : action.payload?.quantity - 1,
          };
        }
        return item;
      });
      localStorage.setItem(INFO_DEFINE.KEY.cart, JSON.stringify(updateCart));
      return {
        ...state,
        result: updateCart,
        price:
          action.payload?.type === "increment"
            ? state.price + action.payload?.price * action.payload?.quantity
            : state.price - action.payload?.price * action.payload?.quantity,
      };
    });
});
