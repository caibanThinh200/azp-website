import { omit } from 'lodash';
export default class ProductRequest {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.id = data?.id || "";
        this.name = data?.name || "";
        this.shortDescription = data?.shortDescription || "";
        this.detailDescription = data?.detailDescription || "";
        this.quantity = data?.quantity || 0;
        this.attribute = data?.attributes || {};
        // this.code = this.parseCodeNumber(data?.code) || 0;
        // this.saled_count = data?.saled_count || 0;
        this.discount_value = data?.discount_value || 0;
        this.discount_price = data?.discount_price || 0;
        this.is_percent = data?.isPercent || false;
        this.price = data?.price || 0;
        this.status = data?.status || 1;
        this.mainThumb = (data?.main_thumb || []).map(thumb => thumb) || [];
        this.subThumb = (data?.sub_thumb || []).map(thumb => thumb) || [];
        this.product_type = data?.product_type || 1;
        this.category = data?.category || "";
        this.created_at = data?.created_at || "";
        this.updated_at = data?.updated_at || "";
    }

    getField() {
        return omit(this, ["setData", "getFormData", "parseCodeNumber", "getField"])
    }

    getFormData() {
        const formData = new FormData();

        if (Object.keys(this.attribute).length > 0) {
            Object.keys(this.attribute).map(item => {
                formData.append(`attribute[${item}]`, this.attribute[item])
            });
        }

        if (this.mainThumb.length > 0) {
            this.mainThumb.map(thumb => formData.append("mainThumb", thumb))
        };

        if (this.subThumb.length > 0) {
            this.subThumb.map(thumb => {
                formData.append("subThumb", thumb)
            })
        };

        Object.keys(omit(this.getField(), ["mainThumb", "subThumb", "attribute"])).map(item => {
            formData.append(item, this[item]);
        });
        return formData;
    }

    parseCodeNumber(code) {
        return parseInt(code?.toString().slice(6)) || 0;
    }
}