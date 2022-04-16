export default class ApiResponse {
    
    constructor(data){
        this.data = data.data || undefined;
        this.code = data.code || undefined;
        this.error = data.error || undefined;
        this.status = data.status || undefined;
        this.statusText = data.statusText;
        this.headers = data.headers || undefined;
        this.message = data.message || undefined;
        this.success = data.success || false;
        this.request = data.request || undefined;
        this.result = data.result || undefined;
    }
}