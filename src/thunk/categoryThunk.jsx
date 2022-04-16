import { message } from "antd";
import {
    clearCategoryAction,
    createCategoryAction,
    createCategoryFailed,
    createCategorySuccess,
    getDetailCategoryAction,
    getDetailCategoryFailed,
    getDetailCategorySuccess,
    getListAllCategoryAction,
    getListAllCategoryFailed,
    getListAllCategorySuccess,
    getListCategoryAction,
    getListCategoryFailed,
    getListCategorySuccess,
    updateCategoryAction,
    updateCategoryFailed,
} from "../action/categoryAction";
import {
    createService,
    getDetailService,
    getListAllService,
    getListService,
    updateService
} from "../Service/categoryService";
import CategoryRequest from "../Mapping/Request/categoryRequest";
import { updateProductSuccess } from "../action/productAction";

const getListAll = () => {
    return async dispatch => {
        dispatch(getListAllCategoryAction());
        const result = await getListAllService();
        if (result.status === "FAILED") {
            console.log(result.error);
            message.error("Đã có lỗi xảy ra");
            dispatch(getListAllCategoryFailed());
        } else {
            dispatch(getListAllCategorySuccess(result.result))
        }
    }
}

const getList = () => {
    return async dispatch => {
        dispatch(getListCategoryAction());
        const result = await getListService();
        if (result.status === "FAILED") {
            console.log(result.error);
            message.error("Đã có lỗi xảy ra");
            dispatch(getListCategoryFailed());
        } else {
            dispatch(getListCategorySuccess(result.result))
        }
    }
}

const create = (data) => {
    const requestPayload = new CategoryRequest(data);
    return async dispatch => {
        dispatch(createCategoryAction());
        await createService(requestPayload).then(res => {
            if (res.data.status === "FAILED") {
                console.log(res.data.error);
                message.error("Đã có lỗi xảy ra");
                dispatch(createCategoryFailed());
            } else {
                data?.navigate("/category");
                message.success(res.data.result);
                dispatch(createCategorySuccess());
            }
        });
    }
}

const getDetail = (id) => {
    return async dispatch => {
        dispatch(getDetailCategoryAction());
        const result = await getDetailService(id).then(res => {
            if (res.status === "FAILED") {
                console.log(result.error);
                message.error("Đã có lỗi xảy ra");
                dispatch(getDetailCategoryFailed());
            } else {
                dispatch(getDetailCategorySuccess(res.result))
            }
        });
    }
}

const update = (id, data) => {
    const requestPayload = new CategoryRequest(data);
    return async dispatch => {
        dispatch(updateCategoryAction());
        await updateService(id, requestPayload).then(async res => {
            if (res.data.status === "FAILED") {
                console.log(res.data.error);
                message.error("Đã có lỗi xảy ra");
                dispatch(updateCategoryFailed());
            } else {
                dispatch(updateProductSuccess(res.data.result));
                dispatch(getDetailCategoryAction());
                await getDetailService(id).then(resDetail => {
                    if (resDetail.status === "FAILED") {
                        console.log(resDetail.error);
                        message.error("Đã có lỗi xảy ra");
                        dispatch(getDetailCategoryFailed());
                    } else {
                        dispatch(getDetailCategorySuccess(resDetail.result))
                        message.success(res.data?.result)
                    }
                });
            }
        });
    }
}

const onClear = () => dispatch => dispatch(clearCategoryAction());

const categoryThunk = {
    getListAll,
    getList,
    create,
    getDetail,
    update,
    onClear
}

export default categoryThunk;