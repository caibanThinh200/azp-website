import { message } from "antd";
import DiscountAction from "../action/discountAction";
import DiscountRequest from "../Mapping/Request/discountRequest"
import { 
    createService, 
    getDetailService, 
    getListAllService, 
    getListService, 
    updateService 
} from "../Service/discountService";

const getListAll = () => async dispatch => {
    dispatch(DiscountAction.getListAllDiscountAction());
    const result = await getListAllService();
    if (result.status === "FAILED") {
        message.error("Đã có lỗi xảy ra");
        dispatch(DiscountAction.getListAllDiscountFailed());
    } else {
        dispatch(DiscountAction.getListAllDiscountSuccess(result))
    }
}

const getList = filter => async dispatch => {
    dispatch(DiscountAction.getListDiscountAction());
    const result = await getListService(filter);
    if (result.status === "FAILED") {
        message.error("Đã có lỗi xảy ra");
        dispatch(DiscountAction.getListDiscountFailed());
    } else {
        dispatch(DiscountAction.getListDiscountSuccess(result))
    }
}

const create = data => async dispatch => {
    dispatch(DiscountAction.createDiscountAction());
    const requestPayload = new DiscountRequest(data);
    const result = await createService(requestPayload);
    if (result.status === "FAILED") {
        message.error("Đã có lỗi xảy ra");
        dispatch(DiscountAction.createDiscountFailed());
    } else {
        dispatch(DiscountAction.createDiscountSuccess());
        data.navigate("/discount");
        message.success("Thêm sản phẩm thành công");
    }
}

const getDetail = id => async dispatch => {
    dispatch(DiscountAction.getDetailDiscountAction());
    const result = await getDetailService(id);
    if (result.status === "FAILED") {
        message.error("Đã có lỗi xảy ra");
        dispatch(DiscountAction.getDetailDiscountFailed());
    } else {
        dispatch(DiscountAction.getDetailDiscountSuccess(result.result))
    }
}

const update = (id, data) => async dispatch => {
    dispatch(DiscountAction.updateDiscountAction());
    const requestPayload = new DiscountRequest(data);
    const result = await updateService(id, requestPayload);
    if (result.status === "FAILED") {
        message.error("Đã có lỗi xảy ra");
        dispatch(DiscountAction.updateDiscountFailed());
    } else {
        dispatch(DiscountAction.updateDiscountSuccess());
        dispatch(DiscountAction.getDetailDiscountAction());
        const res = await getDetailService(id);
        if (res.status === "FAILED") {
            message.error("Đã có lỗi xảy ra");
            dispatch(DiscountAction.getDetailDiscountFailed());
        } else {
            dispatch(DiscountAction.getDetailDiscountSuccess(res.result))
            message.success("Cập nhật sản phẩm thành công");
        }
    }
}

const DiscountThunk = {
    getListAll,
    getList, 
    create,
    update,
    getDetail
}

export default DiscountThunk;                            