import ApiService from "../Util/ApiService";
import currentConfig from "../Constant/env"
import Urls from "../Util/Urls";
import OrderResponse from "../Mapping/Response/orderResponse";

export const checkoutOrderService = data => {
    console.log(currentConfig.API_URL)
    return new ApiService({
        baseURL: currentConfig.API_URL,
        endpoint: Urls.ORDER.checkoutOrder,
        parser: parseItem
    }).post(data)
}

export const paymentService = (id, data) => {
    return new ApiService({
        baseURL: currentConfig.API_URL,
        endpointParams: {id},
        endpoint: Urls.ORDER.paymentOrder
    }).put(data)
}

export const getDetailService = id => {
    return new ApiService({
        baseURL: currentConfig.API_URL,
        endpointParams: {id},
        endpoint: Urls.ORDER.getDetail,
        parser: parseItem
    }).get()
}

const parseItem = response => Object.keys(response?.result || {}).length > 0 ? ({
    ...response,
    result: new OrderResponse(response?.result)
}) : response;
