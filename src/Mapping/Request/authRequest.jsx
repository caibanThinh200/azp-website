export default class AuthRequest {
     email;
     password;
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.email = data.email || "";
        this.password = data.password || "";
    }
}