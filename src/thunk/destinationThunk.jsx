import destinationAction from "../action/destinationAction"
import { getListDistrictService, getListProvinceService, getListWardService } from "../Service/destinationService";

const getListProvince = () => async dispatch => {
    dispatch(destinationAction.getListProvinceAction());
    const response = await getListProvinceService();
    if((response.result || []).length > 0) {
        dispatch(destinationAction.getListProvinceSuccess(response.result));
    } else {
        dispatch(destinationAction.getListProvinceFailed());
    }
}

const getListDistrict = code => async dispatch => {
    dispatch(destinationAction.getListDistrictAction());
    const response = await getListDistrictService(code);
    if((response.result || []).length > 0) {
        dispatch(destinationAction.getListDistrictSuccess(response.result));
    } else {
        dispatch(destinationAction.getListDistrictFailed());
    }
}

const getListWard = code => async dispatch => {
    dispatch(destinationAction.getListWardAction());
    const response = await getListWardService(code);
    if((response.result || []).length > 0) {
        dispatch(destinationAction.getListWardSuccess(response.result));
    } else {
        dispatch(destinationAction.getListWardFailed());
    }
}


// const provinceThunk = {
//     getListProvince
// }

const DestinationThunk = {
    getListProvince,
    getListDistrict,
    getListWard
}

export default DestinationThunk;