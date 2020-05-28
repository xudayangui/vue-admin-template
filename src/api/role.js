import request from '@/utils/request'
export function roleList(params) {return request({url: 'roleList',method: 'get',params})}
export function treeRoleList(params) {return request({url: 'treeRoleList',method: 'get',params})}
