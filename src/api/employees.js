import request from '@/utils/request'

// 获取员工简单列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工综合列表
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 删除员工接口
export function delEmployee(id) {
  return request({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}

// 新增员工接口
export function addEmployee(data) {
  return request({
    method: 'post',
    url: `/sys/user`,
    data
  })
}


// 批量导入员工数据
export function importEmployee(data) {
  return request({
    method: 'post',
    url: `/sys/user/batch`,
    data
  })
}

// 保存用户基本信息
export function saveUserDetailById(data) {
  return request({
    method: 'put',
    url: `/sys/user/${data.id}`,
    data
  })
}
