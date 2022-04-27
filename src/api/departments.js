import request from '@/utils/request'

// 获取部门
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

// 删除部门
export function delDepartments(id) {
  return request({
    method: 'delete',
    url: `/company/department/${id}`
  })
}

// 新增部门
export function addDepartments(data) {
  return request({
    method: 'post',
    url: `/company/department`,
    data
  })
}

// 获取某部门详情
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 保存编辑数据
export function uptateDepartments(data) {
  return request({
    method: 'put',
    url: `/company/department/${data.id}`,
    data
  })
}
