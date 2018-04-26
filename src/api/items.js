import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/item/list',
    method: 'get'
  })
}
