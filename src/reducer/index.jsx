import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import productTypeReducer from "./productTypeReducer";
import accessoryReducer from "./accessoryReducer";
import billReportReducer from "./billReportReducer";
import dashBoardReducer from './dashboardReducer';
import uploadReducer from "./uploadReducer";
import discountReducer from "./discountReducer";
import orderReducer from "./orderReducer";
import destinationReducer from "./destinationReducer";

export default combineReducers({
    authReducer,
    categoryReducer,
    productReducer,
    productTypeReducer,
    accessoryReducer,
    billReportReducer,
    dashBoardReducer,
    uploadReducer,
    discountReducer,
    orderReducer,
    destinationReducer
})