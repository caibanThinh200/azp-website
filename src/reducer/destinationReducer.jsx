import { createReducer } from "@reduxjs/toolkit"
import destinationAction from "../action/destinationAction"

const initialState = {
    isFetching: {
        province: false,
        district: false,
        ward: false
    },
    result: {
        province: [],
        district: [],
        ward: []
    },
    item: {
        province: {},
        district: {},
        ward: {}
    },
}

export default createReducer(initialState, reducer =>
    reducer
        .addCase(destinationAction.getListProvinceAction, state => ({
            ...state,
            isFetching: { ...state.isFetching, province: true }

        }))
        .addCase(destinationAction.getListDistrictAction, state => ({
            ...state,
            isFetching: { ...state.isFetching, district: true }
        }))
        .addCase(destinationAction.getListWardAction, state => ({ 
            ...state, 
            isFetching: { ...state.isFetching, ward: true } 
        }))
        .addCase(destinationAction.getListProvinceSuccess, (state, action) => ({
            ...state,
            isFetching: { ...state.isFetching, province: false },
            result: { ...state.result, province: action.payload }
        }))
        .addCase(destinationAction.getListDistrictSuccess, (state, action) => ({ 
            ...state, 
            isFetching: { ...state.isFetching, district: false }, 
            result: { ...state.result, district: action.payload } 
        }))
        .addCase(destinationAction.getListWardSuccess, (state, action) => ({ 
            ...state, 
            isFetching: { ...state.isFetching, ward: false }, 
            result: { ...state.result, ward: action.payload } 
        }))
        .addCase(destinationAction.getListProvinceFailed, (state, action) => initialState)
        .addCase(destinationAction.getListDistrictFailed, (state, action) => initialState)
        .addCase(destinationAction.getListWardFailed, (state, action) => initialState)
)