import axios from 'axios'
import { MessageBox, Message } from './../element/index'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // 跨域请求时发送Cookie
    timeout: 5000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(config => {
    // 在发送请求之前做一些事情
    if (store.getters.token) {
        //让每个请求都携带令牌
        // ['X-Token']是自定义标头键
        //请根据实际情况进行修改
        config.headers['X-Token'] = getToken()
    }
    return config
},error => {
    // 发生请求错误
    console.log(error) //用于调试
    return Promise.reject(error)
    }
)
//响应拦截器
service.interceptors.response.use(response => {
    const res = response.data
    // 如果自定义代码不是20000，则将其判断为错误
    if (res.code !== 200) {
        Message({message: res.message || 'Error',type: 'error',duration: 5 * 1000})
        // 50008：非法令牌； 50012：其他客户端登录； 50014：令牌已过期；;
        if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            // 重新登入
            MessageBox.confirm('您已注销，可以取消以保留在该页面上，或者再次登录','确认注销', {
                confirmButtonText: '重新登入',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
            })
        }
        return Promise.reject(new Error(res.message || 'Error'))
    } else {
        return res
    }
},error => {
    console.log('err' + error) //用于调试
    Message({message: error.message,type: 'error',duration: 5 * 1000})
    return Promise.reject(error)
})
export default service
