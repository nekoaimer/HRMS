import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import '@/icons' // icon
import '@/permission' // permission control

import ElementUI from 'element-ui'
import Register from '@/utils/register'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import i18n from '@/lang'
// import 'element-ui/lib/theme-chalk/index.css'

export default {
  install(Vue) {
    Vue.config.productionTip = false

    // set ElementUI lang to EN
    // Vue.use(ElementUI, { locale })
    // 如果想要中文版 element-ui，按如下方式声明
    Vue.use(ElementUI, {
      // element本身支持i18n的处理
      // 此时 i18n就会根据当前的locale属性去寻找对应的显示内容
      i18n: (key, value) => i18n.t(key, value) // t方法 会去对应的语言包里寻找对应的内容
      // 改变locale的值 就可以改变对应的当前语言
    })

    // 注册全局组件、指令、过滤器和全局混入
    Vue.use(Register)
  }
}
