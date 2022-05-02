import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import i18n from '@/lang'
import init from '@/utils/init'

// 初始化
Vue.use(init)

new Vue({
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App)
})
