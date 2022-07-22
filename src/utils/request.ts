import { AxiosRequestConfig, AxiosResponse } from "axios"
import type { Api } from "./apis"
import axios from "./axios"
import { ResponseData, responseHandler } from "./responseHandler"



export interface requestOptions extends Omit<AxiosRequestConfig, 'url' | 'method' | 'params' | 'data'> {
    showErrorMessage?: boolean,
    showSuccessMessage?: boolean
}

export const request = async <T = any,>(api: Api, params?: any, options?: requestOptions) => {
    try {
        const response: AxiosResponse<ResponseData<T>> = await axios({
            url: api.url,
            method: api.method,
            params: api.method === 'get' ? params : undefined,
            data: api.method === 'post' ? params : undefined,
            ...options
        })

        return responseHandler(response?.data, options)
    } catch (error) {
        return Promise.reject(error)
    }
}

export default request