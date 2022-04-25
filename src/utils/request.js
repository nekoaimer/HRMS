import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from './auth'
import router from '@/router'

const TimeOut = 3600 // 定义超时时间 1小时

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      //
      store.dispatch('user/logout') // 登出操作
      router.push('/login')
      return Promise.reject(new Error('token 超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
  res => {
    const { success, message, data } = res.data

    if (success) {
      return data
    } else {
      // 业务已经错了
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  err => {
    Message.error(err)
    return Promise.reject(err)
  }
)

// 超时逻辑 (当前时间 - 缓存时间) 是否大于 时间差
function IsCheckTimeOut() {
  const currentTime = +new Date // 当前时间
  const timeStamp = getTimeStamp() // 缓存时间
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service
