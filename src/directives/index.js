export const imagerror = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    dom.onerror = function () {
      dom.src = options.value
    }
    // dom 表示当前指令作用对象
  }
}
