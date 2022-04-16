export default class DiscountRequest {
    constructor(data) {
        this.setData(data);
    }

     setData(data) {
        this.name = data?.name || "";
        this.code = data?.code || "";
        this.status = data?.status || 0;
        this.discount_value = data?.discount_value || 0;
        this.isPercent = data?.isPercent || false;
    }
}