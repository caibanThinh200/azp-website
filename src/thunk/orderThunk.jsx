import { message } from "antd";
import orderAction from "../action/orderAction";
import OrderRequest from "../Mapping/Request/orderRequest";
import { checkoutOrderService, getDetailService, paymentService } from "../Service/orderService";

const checkout = data => async dispatch => {
    const requestPayload = new OrderRequest(data);
    dispatch(orderAction.checkoutAction());
    await checkoutOrderService(requestPayload).then(res => {
        if (res.status === "FAILED") {
            dispatch(orderAction.checkoutFailed());
        } else {
            dispatch(orderAction.checkoutSuccess(res.result));
        }
    })
}

const payment = (id, data, navigate) => async dispatch => {
    const requestPayload = new OrderRequest(data);
    dispatch(orderAction.paymentAction());
    await paymentService(id, requestPayload).then(res => {
        if(res.status === "FAILED") {
            dispatch(orderAction.paymentFailed())
        } else {
            dispatch(orderAction.paymentSuccess(res.result));
            dispatch(orderAction.clearOrderAction())
            message.success("Thanh toán đơn hàng thành công");
        }
    });
    navigate("/checkout/" + id);
}

const getDetail = (id, navigate) => async dispatch => {
    dispatch(orderAction.getDetailAction());
    const orderResult = await getDetailService(id);
    if(orderResult?.status === "FAILED") {
        dispatch(orderAction.getDetailFailed());
        navigate("/not-found")
    } else {
        if(Object.keys(orderResult?.result || {}).length < 1) {
            navigate("/not-found")
        } else {
            dispatch(orderAction.getDetailSuccess(orderResult?.result));
        }
    }
}

const OrderThunk = {
    checkout,
    payment,
    getDetail
}

export default OrderThunk;