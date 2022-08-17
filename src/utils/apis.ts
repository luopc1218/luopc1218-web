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
    },
    getArticleTagList: {
        url: '/api/article/getArticleTagList',
        method: 'get'
    },
    addArticle: {
        url: '/api/article/addArticle',
        method: 'post'
    },
    saveArticle: {
        url: '/api/article/saveArticle',
        method: 'post'
    },
    deleteArticle: {
        url: "/api/article/deleteArticle",
        method: 'post'
    },
    getArticleList: {
        url: '/api/article/getArticleList',
        method: "get"
    },
    getArticleInfo: {
        url: '/api/article/getArticleInfo',
        method: "get"
    },
    getArticleEvaluate: {
        url: "/api/article/getArticleEvaluate",
        method: "get"
    },
    toggleArticleEvaluate: {
        url: "/api/article/toggleArticleEvaluate",
        method: "post"
    },
    getAdminInfo: {
        url: '/api/user/getAdminInfo',
        method: "get"
    },
    addLeaveMessage: {
        url: "/api/message/addLeaveMessage",
        method: 'post'
    },
    getLeaveMessageList: {
        url: "/api/message/getLeaveMessageList",
        method: "get"
    },
    addArticleViewCount: {
        url: "/api/article/addArticleViewCount",
        method: "post"
    },
    addArticleComment: {
        url: "/api/article/addArticleComment",
        method: "post"
    },
    getArticleCommentList: {
        url: "/api/article/getArticleCommentList",
        method: "get"
    },
    getArticleSubCommentList: {
        url: '/api/article/getArticleSubCommentList',
        method: 'get'
    },
    getNotice: {
        url: "/api/getNotice",
        method: 'get'
    },
    getHotArticleList: {
        url: '/api/article/getHotArticleList',
        method: 'get'
    },
    changeNotice: {
        url: '/api/changeNotice',
        method: 'post'
    }
}

export default apis