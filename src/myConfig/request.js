import axios from 'axios'
import router from'../router/index'
import store from '../store'
import { getToken } from './auth'
import {Toast} from "vant";

// 创建axios实例
const service = axios.create({
  baseURL: '', // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200时抛错 可结合自己业务进行修改
     */
    const res = response.data;
    console.log(res);

    if (res.code !== 200) {
        if (res.code === 500 || res.code === 501 || res.code === 502) {
            Toast.fail('请重新登录');
            // 未登录跳转
            router.push('/');
            return Promise.reject('loginErr')
        }
        return Promise.reject('unknownError')
    } else {
        return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
