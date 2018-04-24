import request from '@/utils/request'

export function getList(data) {
  return request({
    url: 'admin/article/list',
    method: 'post',
    data: data
  })
}
