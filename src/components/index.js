import PageTools from './PageTools'

export default {
  install(Vue) {
    console.log(Vue);
    Vue.component('PageTools', PageTools)
  }
}
