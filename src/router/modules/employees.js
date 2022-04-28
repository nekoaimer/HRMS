// 员工路由规则
import Layout from '@/layout'
export default {
  name: 'employees',
  path: '/employees',
  component: Layout,
  children: [
    {
      // 二级路由的path什么都不写的时候 此时它表示二级路由的默认路由
      path: '', // 这里不写表示 /employees 不但有布局layout 还有员工主页
      component: () => import('@/views/employees'),
      // 路由元信息 存储数据
      meta: {
        title: '员工管理', // 左侧导航读取了title属性
        icon: 'people'
      }
    },
    {
      path: 'detail/:id?',
      component: () => import('@/views/employees/detail'),
      meta: {
        title: '员工详情'
      },
      hidden: true, // 表示该内容不在左侧菜单栏显示
    }
  ]
}
