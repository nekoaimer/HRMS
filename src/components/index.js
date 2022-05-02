import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import ScreenFull from './ScreenFull'
import Print from 'vue-print-nb'
import ThemePicker from './ThemePicker'
import LangSelect from './Lang'
import TagsView from './TagsView'

export default {
  install(Vue) {
    // 组件的注册
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel) // 注册Excel导入导出组件
    Vue.component('ImageUpload', ImageUpload) // 注册图片上传组件
    Vue.use(Print) // 注册打印组件
    Vue.component('ScreenFull', ScreenFull) // 注册全屏组件
    Vue.component('ThemePicker', ThemePicker) // 注册主题颜色组件
    Vue.component('LangSelect', LangSelect) // 注册语言栏组件
    Vue.component('TagsView', TagsView) // 注册多页签栏
  }
}
