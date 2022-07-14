export interface Api {
    url: string,
    method: 'get' | 'post'
}

export const apis: Record<string, Api> = {
    getUserInfo: {
        url: "/api/user/getUserInfo",
        method: "get"
    }
}

export default apis