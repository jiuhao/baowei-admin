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

export function load(data) {
  return request({
    url: 'admin/article/load',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: 'admin/article/update',
    method: 'post',
    data: data
  })
}

