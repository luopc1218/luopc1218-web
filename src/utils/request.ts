import { AxiosRequestConfig, AxiosResponse } from "axios"
import type { Api } from "./apis"
import axios from "./axios"
import { ResponseData, responseHandler } from "./responseHandler"



export type requestOptions = Omit<AxiosRequestConfig, 'url' | 'method' | 'params' | 'data'>

export const request = async <T,>(api: Api, params?: any, options?: requestOptions) => {
    const response: AxiosResponse<ResponseData<T>> = await axios({
        url: api.url,
        method: api.method,
        params: api.method === 'get' ? params : undefined,
        data: api.method === 'post' ? params : undefined,
        ...options
    })
    
    return responseHandler(response.data)
}

export default request