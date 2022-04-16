import { createAction } from "@reduxjs/toolkit";
import Types from "../Constant/Types/uploadType";

const accessoryAction = {
    uploadFileAction: createAction(Types.UPLOAD_FILE_ACTION, data => ({ payload: data })),
    uploadFileSuccess: createAction(Types.UPLOAD_FILE_SUCCESS, result => ({ payload: result })),
    uploadFileFailed: createAction(Types.UPLOAD_FILE_FAILED),
}

export default accessoryAction;

