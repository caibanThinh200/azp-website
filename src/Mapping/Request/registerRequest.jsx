export default class RegisterRequest {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.name = data.name || "";
        this.password = data.password || "";
        this.email = data.email || "";
        this.phone = data.phone || "";
        this.address = data.address || "";
        this.gender = data.gender || 0;
    };
}  