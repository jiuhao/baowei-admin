import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/list',
    method: 'post',
    data: data
  })
}
