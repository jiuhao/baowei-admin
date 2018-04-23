import request from '@/utils/request'

export function getList() {
  return request({
    url: '/admin/role/list',
    method: 'get'
  })
}

export function load(data) {
  return request({
    url: '/admin/role/load',
    method: 'post',
    data: data
  })
}
