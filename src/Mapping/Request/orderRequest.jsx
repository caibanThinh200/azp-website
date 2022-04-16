import ProductRequest from "./productRequest";

export default class OrderRequest {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.code = data?.code;
        this.contact = this.getContact(data?.contact);
        this.orders = (data?.orders || []).length > 0 && (data?.orders || []).map(order => new ProductRequest(order)) || [];
        this.status = data?.status || 1;
        this.cost = this.getCost(data?.cost);
        this.payment = data?.payment || 1;
    }

    getCost(cost) {
        return {
            totalOrder: cost?.totalOrder || 0,
            VATCost: cost?.VATCost || 0,
            ship: cost?.ship || 0,
            totalCost: cost?.totalCost || 0
        }
    }

    getContact(contact) {
        return {
            name: contact?.name || "",
            email: contact?.email || "",
            phone: contact?.phone || "",
            address: contact?.address || "",
            note: contact?.note || "",
            province: contact?.province || "0",
            district: contact?.district || "0",
            ward: contact?.ward || "0",
        }
    }
}