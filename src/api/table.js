import request from '@/utils/request'
export function getList(params) {return request({url: 'getlist',method: 'post',params})}