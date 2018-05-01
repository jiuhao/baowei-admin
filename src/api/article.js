import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'admin/article/list',
    method: 'post',
    data: data
  })
}

export function add(data) {
  return request({
    url: 'admin/article/add',
    method: 'post',
    data: data
  })
}
