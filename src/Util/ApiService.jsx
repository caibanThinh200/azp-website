import axios, { AxiosInstance, AxiosStatic, ResponseType } from "axios";
import Methods from "./method";
import * as Func from "./function";
import ApiResponse from '../Mapping/ApiResponse';

export default class ApiService {
    constructor(options) {
        // this.getInstance(options);
        this.createServiceInstance(options);
        this.endpointParams = options.endpointParams || {};
        this.endpoint = Func.getPathWithParams(options.endpoint || undefined, this.endpointParams)
        this.headers = options.headers || {};
        this.params = options.params || {};
        this.responseType = options.responseType || "json";
        this.parser = options.parser;
    }

    createServiceInstance(options) {
        if (!options.baseURL) {
            throw new Error("Reqiure Base URL");
        } else {
            (this.axiosInstance) = axios.create({
                baseURL: options.baseURL,
                timeout: 20000,
                responseType: this.responseType
            });
        }
    }

    getRequestData(data) {
        if (data && typeof data.export === 'function') {
            return data.export()
        }
        return data;
    }

    createRequest(data, method = Methods.GET) {
        const dataReq = this.getRequestData(data);
        return new Promise((resolve, reject) => {
            const config =  Func.removeObjectEmptyValue({
                params: this.params || {},
                headers: Func.removeObjectEmptyValue({
                    ...this.headers,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    data: method === Methods.POST || method === Methods.PUT ? undefined : dataReq,
                })
            });
            const secondParams = method === Methods.PUT || method === Methods.POST ? dataReq : config;
            const thirdParams = method === Methods.PUT || method === Methods.POST ? config : undefined;
            (this.axiosInstance)[method](this.endpoint, secondParams, thirdParams)
                .then((response) => {
                    const result = this.parser ? this.parser(response.data) : new ApiResponse({ ...response, request: data, success: true })
                    resolve(result)
                })
        })
    }

    get = (data) => this.createRequest(data, Methods.GET);
    post = (data) => this.createRequest(data, Methods.POST);
    put = (data) => this.createRequest(data, Methods.PUT);
    delete = (data) => this.createRequest(data, Methods.DELETE);
}