import Vue from "vue"

export const forEachDirectives = directives => {
  return Object.keys(directives).forEach((key) => Vue.directive(key, directives[key]))
}

export const forEachFilters = filters => {
  return Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]))
}

