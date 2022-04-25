import { getToken, setToken, removeToken, getTimeStamp, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById }  from '@/api/user'
import { resetRouter } from '@/router'
import { remove } from 'nprogress'

const state = {
  token: getToken(),
  userInfo: {} // 这里如果定义null，那么从null取值会报错
}
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, result) {
    // 更新一个对象
    state.userInfo = result // 这是响应式
    // state.userInfo = { ...result } // 这也是响应式 浅拷贝
  },
  removeUserInfo() {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
    console.log(result);
    setTimeStamp()
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    const baseInfo = await getUserDetailById(result.userId)
    const baseResult = { ...result, ...baseInfo }
    context.commit('setUserInfo', baseResult)
    console.log('baseResult', baseResult);
    return baseResult
  },
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

