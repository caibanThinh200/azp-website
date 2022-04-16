class AttributeRequest {
    constructor(data) {
        this.setData(data);
    } 

    setData(data) {
        this.name = data?.name || "";
        this.unit = data?.unit || "";
        this.require = data?.require || false;
        this.filter = data?.filter || {}
    }
}

export default AttributeRequest;