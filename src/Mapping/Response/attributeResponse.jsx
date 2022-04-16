import { Checkbox } from "antd";

class AttributeResponse {
    constructor(data) {
        this.setData(data);
    }

     setData(data) {
        this.id = data._id || "";
        this.name = data.name || "";
        this.code = data.code || "";
        this.types = data.types || [];
        this.unit = data.unit || "";
        this.filter = data?.filter || {};
        this.require = data?.require || false;
        this.required_field = data?.required_field || false;
        this.created_at = data.created_at || null;
        this.updated_at = data.updated_at || null
    }
}

export const ACCESSORY_CONSTANT = {
    labelCols: ["name", "code", "unit", "created_at", "updated_at"],
}

export default AttributeResponse;