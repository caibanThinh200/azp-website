class ProductTypeRequest {

    constructor(data) {
        this.setData(data);
    }

     setData(data) {
        this.id = data._id || "";
        this.name = data.name || "";
        this.type = this.parseTypeNumber(data.type);
        this.thumb = (data?.thumb || []).length > 0 && data?.thumb[0] || {};
        this.attributes = data.attributes || [];
        this.created_at = data.created_at || null;
        this.updated_at = data.updated_at || null;
    }

     parseTypeNumber(type) {
        return parseInt(type?.toString().slice(3)) || 0;
    }
}

export default ProductTypeRequest