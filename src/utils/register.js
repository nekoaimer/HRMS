import Vue from "vue"
import Components from '@/components'
import CheckPermission from '@/mixins/checkPermission'
import * as directives from '@/directives'
import * as filters from '@/filters'

export const forEachDirectives = directives => {
  return Object.keys(directives).forEach((key) => Vue.directive(key, directives[key]))
}

export const forEachFilters = filters => {
  return Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]))
}

export default {
  install(Vue) {
    Vue.use(Components)
    Vue.mixin(CheckPermission)
    forEachDirectives(directives)
    forEachFilters(filters)
  }
}
