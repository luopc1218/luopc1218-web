import { requestOptions } from "./request"

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

export const responseHandler = <T,>(response: ResponseData<T>, options?: requestOptions): Promise<T | undefined> => {
    if (response.success) {
        return Promise.resolve(response.data)
    } else {
        if (response.message && options?.showErrorMessage) {
            window?._message.error(response.message)
        }
        codeChecker(response.code)
        return Promise.reject(new Error(response.message))
    }

}