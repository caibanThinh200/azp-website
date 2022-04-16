import { createReducer } from "@reduxjs/toolkit";
import ActionType from "../action/uploadAction";

const initialState = {
    isUploadFetching: false,
    result: [],
    item: {},
    all: [],
    isSubmit: false,
    isUpdate: false,
}

export default createReducer(initialState, reducer => {
    reducer
        .addCase(ActionType.uploadFileAction, (state, action) => ({...state, isAccessoryFetching: true}))
        .addCase(ActionType.uploadFileSuccess, (state, action) => ({...state, isAccessoryFetching: false, item: action.payload.item}))
        .addCase(ActionType.uploadFileFailed, (state, action) => (initialState))
})