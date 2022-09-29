import { message } from 'antd'
import layoutAction from '../action/layoutAction'
import LayoutRequest from '../Mapping/Request/layoutRequest'
import {
    createService,
    getDetailService,
    getListAllService,
    getListService,
    updateService,
} from '../Service/layoutService'

const getListAll = () => async (dispatch) => {
    dispatch(layoutAction.getListAllLayoutAction())
    const result = await getListAllService()
    if (result.status === 'FAILED') {
        message.error('Đã có lỗi xảy ra')
        dispatch(layoutAction.getListAllLayoutFailed())
    } else {
        dispatch(layoutAction.getListAllLayoutSuccess(result))
    }
}

const getList = (filter) => async (dispatch) => {
    dispatch(layoutAction.getListLayoutAction())
    const result = await getListService(filter)
    if (result.status === 'FAILED') {
        message.error('Đã có lỗi xảy ra')
        dispatch(layoutAction.getListLayoutFailed())
    } else {
        dispatch(layoutAction.getListLayoutSuccess(result))
    }
}

const create = (data) => async (dispatch) => {
    dispatch(layoutAction.createLayoutAction())
    const requestPayload = new LayoutRequest(data)
    const result = await createService(requestPayload)
    if (result.status === 'FAILED') {
        message.error('Đã có lỗi xảy ra')
        dispatch(layoutAction.createLayoutFailed())
    } else {
        dispatch(layoutAction.createLayoutSuccess())
        data.navigate('/layout')
        message.success('Thêm bảng tin thành công')
    }
}

const getDetail = () => async (dispatch) => {
    console.log(1111111)
    dispatch(layoutAction.getDetailLayoutAction())
    const result = await getDetailService()
    // console.log(result)
    if (result.status === 'FAILED') {
        message.error('Đã có lỗi xảy ra')
        dispatch(layoutAction.getDetailLayoutFailed())
    } else {
        dispatch(layoutAction.getDetailLayoutSuccess(result.result))
    }
}

const update = (data) => async (dispatch) => {
    dispatch(layoutAction.updateLayoutAction())
    const requestPayload = new LayoutRequest(data)
    const result = await updateService(requestPayload)
    if (result.status === 'FAILED') {
        message.error('Đã có lỗi xảy ra')
        dispatch(layoutAction.updateLayoutFailed())
    } else {
        dispatch(layoutAction.updateLayoutSuccess())
        dispatch(layoutAction.getDetailLayoutAction())
        const res = await getDetailService()
        if (res.status === 'FAILED') {
            message.error('Đã có lỗi xảy ra')
            dispatch(layoutAction.getDetailLayoutFailed())
        } else {
            dispatch(layoutAction.getDetailLayoutSuccess(res.result))
            message.success('Cập nhật bảng tin thành công')
        }
    }
}

const clear = () => async (dispatch) => {
    dispatch(layoutAction.clearLayoutAction())
}

const LayoutThunk = {
    getListAll,
    getList,
    create,
    update,
    getDetail,
    clear,
}

export default LayoutThunk
