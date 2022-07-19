export interface Api {
    url: string,
    method: 'get' | 'post'
}

export const apis: Record<string, Api> = {
    checkSignIn: {
        url: "/api/user/checkSignIn",
        method: "get"
    },
    getUserInfo: {
        url: "/api/user/getUserInfo",
        method: "get"
    },
    getNavLink: {
        url: '/api/getNavLink',
        method: "get"
    }
}

export default apis