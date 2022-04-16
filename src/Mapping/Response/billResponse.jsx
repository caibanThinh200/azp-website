class BillResponse {
    constructor(data) {
        this.setData(data);
    }

     setData(data) {
        this.id = data?._id || ""
        this.products = data.products || [];
        this.code = data.code || "";
        this.contact = this.getContact(data.user);
        this.name = this.contact.name || ""
        this.phone = this.contact.phone || "";
        this.address = this.contact.address || "";
        this.email = this.contact.email || "";
        this.note = this.contact.note || "";
        this.status = data?.status || 1;
        this.total = data.total || 0;
        this.created_at = data.created_at || null;
    }

     getContact(contact) {
        // this.contact.name = contact?.name || "";
        // this.contact.address = contact?.address || "";
        // this.contact.phone = contact?.phone || "";
        // this.contact.note = contact?.note || "";
        return {
            name: contact?.name || "",
            email: contact?.email || "",
            address: contact?.address || "",
            phone: contact?.phone || "",
            note: contact?.note || "",
        }
    }
}

export const BILL_REPORT_CONSTANT = {
    labelCols: ["code", "status", "name", "phone", "total", "email", "created_at", "updated_at"],
    status: {
        init: {
            title: "Khởi tạo",
            value: 1,
            color: "primary"
        },
        approve: {
            title: "Đã duyệt",
            value: 2,
            color: "success"
        },
        cancel: {
            title: "Đã hủy",
            value: 3,
            color: "error"
        }
    }
}

export default BillResponse;