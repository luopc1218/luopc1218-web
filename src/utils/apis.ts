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
    },
    upload: {
        url: '/api/file/upload',
        method: 'post'
    },
    getCountryTelCodeList: {
        url: '/api/getCountryTelCodeList',
        method: "get"
    },
    checkSignUpUsername: {
        url: "/api/user/checkSignUpUsername",
        method: "get"
    },
    sendPhoneCheckCode: {
        url: "/api/sendPhoneCheckCode",
        method: 'post'
    },
    signUp: {
        url: "/api/user/signUp",
        method: "post"
    },
    signIn: {
        url: '/api/user/signIn',
        method: "post"
    }
}

export default apis