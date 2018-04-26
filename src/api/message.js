import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/message/list',
    method: 'post',
    data: data
  })
}
