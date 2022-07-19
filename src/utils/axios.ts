import { default as baseAxios } from 'axios'


const axios = baseAxios.create({

});

axios.interceptors.request.use(config => {
    if (config.headers) {
        const accessToken: string = localStorage.getItem('accessToken') || '';
        // 在发送请求之前的处理；比如：设置请求头部Token
        config.headers.Authorization = "Bearer " + accessToken;
    }
    return config
}, error => {
    // 对请求错误的处理
    Promise.reject(error)
})


axios.interceptors.response.use(res => {
    // 对响应数据做处理
    return res
}, error => {
    window._notification.error({
        content: "网络错误",
        meta: error.message
    });
})

export default axios;