import { createDiscreteApi } from "naive-ui"

const { message } = createDiscreteApi(
    ['message',],
)

export interface ResponseData<T = any> {
    code: number,
    data?: T,
    success: boolean,
    message?: string
}

const codeChecker = (errorCode: number) => {
    switch (errorCode) {
        default: break
    }
}

export const responseHandler = <T,>(response: ResponseData<T>): Promise<ResponseData<T>> => {
    console.log(response);
    
    if (response.success) {
        return Promise.resolve(response)
    } else {
        if (response.message) {
            message.error(response.message)
        }
        codeChecker(response.code)
        return Promise.reject(undefined)
    }

}