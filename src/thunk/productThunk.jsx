import { message } from 'antd';
import {
    createProductAction,
    createProductFailed,
    createProductSuccess,
    getDetailProductAction,
    getDetailProductFailed,
    getDetailProductSuccess,
    getListProductAction,
    getListProductFailed,
    getListProductSuccess,
    updateProductAction,
    updateProductSuccess,
    updateProductFailed,
    clearProductAction
} from '../action/productAction';
import {
    createService,
    getDetailService,
    getListService,
    updateService
} from "../Service/productService";
import ProductRequest from "../Mapping/Request/productRequest";

const create = (data) => {
    return async dispatch => {
        dispatch(createProductAction());
        const requestPayload = new ProductRequest(data);
        message.loading({content: "Đang xử lí", key: "create_action"})
        await createService(requestPayload)
            .then(res => {
                dispatch(createProductSuccess());
                if (res.data.status === "FAILED") {
                    console.log(res.error);
                    message.error({content: "Đã có lỗi xảy ra", key: "create_action"});
                    dispatch(createProductFailed());
                } else {
                    message.success({content: "Thêm sản phẩm thành công", key: "create_action"});
                    data.navigate("/product");
                    // window.history.back();
                }
            })
            .catch(e => {
                message.error({content: "Đã có lỗi xảy ra", key: "create_action"});
                dispatch(createProductFailed());
            });
    }
};

const getList = (filter) => {
    return async dispatch => {
        dispatch(getListProductAction());
        const res = await getListService(filter);
        if (res.status === "FAILED") {
            console.log(res.error);
            message.error("Đã có lỗi xảy ra");
            dispatch(getListProductFailed());
        } else {
            dispatch(getListProductSuccess(res));
            // window.history.back();
        }
    }
}

const getDetail = (slug, isUpdate = false) => {
    return async dispatch => {
        dispatch(getDetailProductAction());
        const res = await getDetailService(slug);
        if (res.status === "FAILED") {
            console.log(res.error);
            message.error("Đã có lỗi xảy ra");
            dispatch(getDetailProductFailed());
        } else {
            // if (isUpdate) {
            //     let newAttribute = {};
            //     Object.keys(res.result?.attripbute || {}).map(key => {
            //         newAttribute = { ...newAttribute, [key]: "" }
            //     });
            //     dispatch(getDetailProductSuccess({ ...res?.result, attribute: newAttribute }))
            // } else {
            //     dispatch(getDetailProductSuccess(res?.result))
            // }
            dispatch(getDetailProductSuccess(res?.result))
        }
    }
}

const update = (id, data) => {
    return async dispatch => {
        dispatch(updateProductAction());
        const requestPayload = new ProductRequest(data);
        const res = await updateService(id, requestPayload);
        message.loading({content: "Đang xử lí", key: "update_action"})
        if (res.status === "FAILED") {
            message.error({content: "Đã có lỗi xảy ra", key: "update_action"});
            dispatch(updateProductFailed());
        } else {
            dispatch(updateProductSuccess(res))
            dispatch(getDetailProductAction());
            await getDetailService(id).then(resDetail => {
                if (resDetail.status === "FAILED") {
                    console.log(resDetail.error);
                    message.error({content: "Đã có lỗi xảy ra", key: "update_action"});
                    dispatch(getDetailProductFailed());
                } else {
                    dispatch(getDetailProductSuccess(resDetail?.result))
                    // window.history.back();
                }
                message.success({content: "Cập nhật sản phẩm thành công", key: "update_action"})
            });
        }
    }
}

const clearProduct = () => {
    return dispatch => {
        dispatch(clearProductAction());
    }
}

const productThunk = {
    create,
    getList,
    getDetail,
    update,
    clearProduct
}

export default productThunk;