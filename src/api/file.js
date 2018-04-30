import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/admin/file/list',
    method: 'post',
    data: data
  })
}
