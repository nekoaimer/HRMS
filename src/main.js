import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import Components from '@/components'
import * as directives from '@/directives'

// 注册自定义指令
import { forEachValue } from './utils/tool-function'
forEachValue(directives, (key, value) => {
  Vue.directive(key, value)
})


import '@/icons' // icon
import '@/permission' // permission control
Vue.config.devtools = true

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// 注册组件
Vue.use(Components)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

