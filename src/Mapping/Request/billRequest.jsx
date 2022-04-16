import ProductRequest from './productRequest';
class BillRequest {
    constructor(data) {
        this.setData(data);
    }

     setData(data) {
        this.id = data?.id || "";
        this.products = data.products?.map((item) => new ProductRequest(item)) || [];
        this.contact = this.getContact(data.contact_info);
        this.status = data?.status || 1;
        this.total = data.total || 0;
    }

     getContact(contact) {
        // this.contact.name = contact?.name || "";
        // this.contact.address = contact?.address || "";
        // this.contact.phone = contact?.phone || "";
        // this.contact.note = contact?.note || "";
        return {
            name: contact?.name || "",
            address: contact?.address || "",
            phone: contact?.phone || "",
            email: contact?.email || "",
            note: contact?.note || "",
        }
    }
}

export default BillRequest;