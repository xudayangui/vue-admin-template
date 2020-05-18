import request from '@/utils/request'
export function getList(params) {return request({url: 'getlist',method: 'get',params})}
//首页异常
export function getAbnormalList(params) {return request({url: 'getAbnormalList',method: 'get',params})}