// 权限拦截在路由跳转 导航守卫

import router from '@/router'
import store from './store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 不需要导出 因为只需要让代码执行即可
// 前置守卫 next是前置守卫必须执行的钩子 next必须执行 如果不执行 页面就死了
/*
  next() 放过
  next(false) 终止跳转
  next() 跳转到某个地址
*/
const whiteList = ['/login', '/404'] // 定义白名单
router.beforeEach(async (to, from, next) => {
  nprogress.start() // 开启进度条
  if (store.getters.token) {
    // 如果有token
    if (to.path == '/login') {
      next('/')
    } else {
      //
      if (!store.getters.userId) {
        const result = await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 表示没有token
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done() // 解决手动切换地址进度条不关闭问题
})
// 后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
