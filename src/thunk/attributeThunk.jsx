import { message } from "antd";
import AccessoryAction from "../action/accessoryAction";
import AttributeRequest from "../Mapping/Request/attributeRequest"
import { createService, getDetailService, getListAllService, getListService, updateService } from "../Service/accessoryService";

const getListAll = () => async dispatch => {
    dispatch(AccessoryAction.getListAllAccessoryAction());
    const result = await getListAllService();
    if (result.status === "FAILED") {
        message.error("Đã có lỗi xảy ra");
        dispatch(AccessoryAction.getListAllAccessoryFailed());
    } else {
        dispatch(AccessoryAction.getListAllAccessorySuccess(result))
    }
}

const getList = filter => async dispatch => {
    dispatch(AccessoryAction.getListAccessoryAction());
    const result = await getListService(filter);
    if (result.status === "FAILED") {
        message.error("Đã có lỗi xảy ra");
        dispatch(AccessoryAction.getListAccessoryFailed());
    } else {
        dispatch(AccessoryAction.getListAccessorySuccess(result))
    }
}

const create = data => async dispatch => {
    dispatch(AccessoryAction.createAccessoryAction());
    const requestPayload = new AttributeRequest(data);
    const result = await createService(requestPayload);
    if (result.status === "FAILED") {
        message.error("Đã có lỗi xảy ra");
        dispatch(AccessoryAction.createAccessoryFailed());
    } else {
        dispatch(AccessoryAction.createAccessorySuccess());
        data.navigate("/attribute");
        message.success("Thêm sản phẩm thành công");
    }
}

const getDetail = id => async dispatch => {
    dispatch(AccessoryAction.getDetailAccessoryAction());
    const result = await getDetailService(id);
    if (result.status === "FAILED") {
        message.error("Đã có lỗi xảy ra");
        dispatch(AccessoryAction.getDetailAccessoryFailed());
    } else {
        dispatch(AccessoryAction.getDetailAccessorySuccess(result.result))
    }
}

const update = (id, data) => async dispatch => {
    dispatch(AccessoryAction.updateAccessoryAction());
    const requestPayload = new AttributeRequest(data);
    const result = await updateService(id, requestPayload);
    if (result.status === "FAILED") {
        message.error("Đã có lỗi xảy ra");
        dispatch(AccessoryAction.updateAccessoryFailed());
    } else {
        dispatch(AccessoryAction.updateAccessorySuccess());
        dispatch(AccessoryAction.getDetailAccessoryAction());
        const res = await getDetailService(id);
        if (res.status === "FAILED") {
            message.error("Đã có lỗi xảy ra");
            dispatch(AccessoryAction.getDetailAccessoryFailed());
        } else {
            dispatch(AccessoryAction.getDetailAccessorySuccess(res.result))
            message.success("Cập nhật sản phẩm thành công");
        }
    }
}

const AttributeThunk = {
    getListAll,
    getList, 
    create,
    update,
    getDetail
}

export default AttributeThunk;                            