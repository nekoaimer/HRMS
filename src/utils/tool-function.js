export const forEachValue = (obj, value) => {
  return Object.keys(obj).forEach(key => value(key, obj[key]))
}
