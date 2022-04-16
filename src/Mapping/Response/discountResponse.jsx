export default class DiscountResponse {
    constructor(data) {
        this.setData(data);
    }

     setData(data) {
        this.id = data?._id || "";
        this.name = data?.name || "";
        this.code = data?.code || "";
        this.discount_value = data?.discount_value || 0;
        this.isPercent = data?.isPercent || false;
        this.status = data?.status || 0;
        this.created_at = data?.created_at || "";
        this.updated_at = data?.updated_at || "";
    }
};

export const DISCOUNT_CONSTANT = {
    STATUS_DEFINE: [
        {
            title: "Chưa kích hoạt",
            value: 0,
            color: "#808080"
        },
        {
            title: "Đang kích hoạt",
            value: 1,
            color: "#00FF00"
        },
        {
            title: "Đã hủy",
            value: 2,
            color: "#FF0000"
        },
        // {
        //     title: "Đã hủy",
        //     value: 3,
        //     color: "#FF0000"
        // }
    ],
}