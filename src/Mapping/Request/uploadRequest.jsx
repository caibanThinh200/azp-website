class UploadRequest {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        const formData = new FormData();
        formData.append("file", data);
        // if(Object.keys(data || {}).length > 0) {
        //     Object.keys(data || {}).map(item => {
        //         this.formData.append("file", item);
        //     });
        // }
        this.form = formData;
    }

    getFormData(data) {
        return this.form;
    }
}

export default UploadRequest;