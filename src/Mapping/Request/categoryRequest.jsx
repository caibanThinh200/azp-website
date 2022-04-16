export default class CategoryRequest {
    constructor(data) {
        this.setData(data);
    }

     setData(data) {
        this.name = data?.name || "";
        this.code = data?.code || "";
        this.thumb = this.getThumbUrl(data?.thumb);
    }

    getThumbUrl(thumb = []) {
        return thumb.length > 0 && thumb[0].name || ""
    }
}