import { message } from "antd";
import ProductTypeAction from "../action/productTypeAction";
import { getListAllService, getDetailService, getListService, updateService, createService } from "../Service/productTypeService";
import ProductTypeRequest from "../Mapping/Request/productTypeRequest";

const create = data => async dispatch => {
    dispatch(ProductTypeAction.createProductTypeAction());
    message.loading({ content: "Đang xử lí", key: "create_action" })
    const requestPayload = new ProductTypeRequest(data);
    await createService(requestPayload).then(res => {
        if (res.status === "FAILED") {
            message.error({ content: "Đã có lỗi xảy ra", key: "create_action" });
            dispatch(ProductTypeAction.createProductTypeFailed());
        } else {
            dispatch(ProductTypeAction.createProductTypeSuccess());
            data.navigate("/product-type");
            message.success({ content: "Thêm loại sản phẩm thành công", key: "create_action" })
        }
    })
}

const getListAll = () => {
    return async dispatch => {
        dispatch(ProductTypeAction.getListAllProductTypeAction());
        const result = await getListAllService()
            .then(res => {
                if (res.status === "FAILED") {
                    message.error("Đã có lỗi xảy ra");
                    dispatch(ProductTypeAction.getListAllProductTypeFailed());
                } else {
                    dispatch(ProductTypeAction.getListAllProductTypeSuccess({ result: res?.result || [] }))
                }
            })
            .catch(e => {
                console.log(e);
                message.error("Đã có lỗi xảy ra");
                dispatch(ProductTypeAction.getListAllProductTypeFailed());
            })
    }
}

const getList = filter => async dispatch => {
    dispatch(ProductTypeAction.getListProductTypeAction());
    const result = await getListService(filter);
    if (result.status === "FAILED") {
        message.error("Đã có lỗi xảy ra");
        dispatch(ProductTypeAction.getListProductTypeFailed());
    } else {
        dispatch(ProductTypeAction.getListProductTypeSuccess({ result: result?.result || [] }))
    }
}

const getDetail = (id, isUpdate = false) => {
    return async dispatch => {
        dispatch(ProductTypeAction.getDetailProductTypeAction());
        await getDetailService(id)
            .then(res => {
                if (res.status === "FALIED") {
                    message.error("Đã có lỗi xảy ra");
                    dispatch(ProductTypeAction.getDetailProductTypeFailed());
                } else {
                    dispatch(ProductTypeAction.getDetailProductTypeSuccess({ item: res.result, isUpdate }));
                }
            })
            .catch(e => {
                console.log(e);
                message.error("Đã có lỗi xảy ra");
                dispatch(ProductTypeAction.getDetailProductTypeFailed());
            })
    }
}

const update = (id, data) => async dispatch => {
    dispatch(ProductTypeAction.updateProductTypeAction());
    const requestPayload = new ProductTypeRequest(data);
    const res = await updateService(id, requestPayload);
    message.loading({content: "Đang xử lí", key: "update_action"})
    if (res.status === "FAILED") {
        message.error({content: "Đã có lỗi xảy ra", key: "update_action"});
        dispatch(ProductTypeAction.updateProductTypeFailed());
    } else {
        dispatch(ProductTypeAction.updateProductTypeSuccess(res))
        dispatch(ProductTypeAction.getDetailProductTypeAction());
        await getDetailService(id).then(resDetail => {
            if (resDetail.status === "FAILED") {
                console.log(resDetail.error);
                message.error("Đã có lỗi xảy ra");
                dispatch(ProductTypeAction.getDetailProductTypeFailed());
            } else {
                dispatch(ProductTypeAction.getDetailProductTypeSuccess(resDetail?.result))
                // window.history.back();
            }
            message.success({content: "Cập nhật thành công", key: "update_action"})
        });
    }
}

const onClear = () => {
    return dispatch => {
        dispatch(ProductTypeAction.clearProductTypeAction());
    }
}


const ProductTypeThunk = {
    create,
    getListAll,
    getDetail,
    onClear,
    getList,
    update
}

export default ProductTypeThunk;