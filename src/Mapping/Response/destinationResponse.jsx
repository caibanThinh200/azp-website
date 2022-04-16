export class ProvinceResponse {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.code = data?.code || 0;
        this.code_name = data?.codename || "";
        this.districts = data?.districts || [];
        this.division_type = data?.division_type || "";
        this.name = data?.name || "";
        this.phone_code = data?.phone_code || "";
    }
}

export class DistrictResponse {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.code = data?.code || 0;
        this.code_name = data?.codename || "";
        this.wards = data?.wards || [];
        this.division_type = data?.division_type || "";
        this.name = data?.name || "";
        this.province_code = data?.province_code || "";
    }
}

export class WardResponse {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.code = data?.code || 0;
        this.code_name = data?.codename || "";
        this.division_type = data?.division_type || "";
        this.name = data?.name || "";
        this.district_code = data?.district_code || "";
    }
}