// 员工路由规则
import Layout from '@/layout'
console.log(Layout);
export default {
  name: 'approvals',
  path: '/approvals',
  component: Layout,
  children: [
    {
      // 二级路由的path什么都不写的时候 此时它表示二级路由的默认路由
      path: '', // 这里不写表示 /approvals 不但有布局layout 还有员工主页
      component: () => import('@/views/approvals'),
      // 路由元信息 存储数据
      meta: {
        title: '审批', // 左侧导航读取了title属性
        icon: 'tree'
      }
    }
  ]
}
