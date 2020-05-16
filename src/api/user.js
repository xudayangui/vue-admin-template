import request from '@/utils/request'
export function login(data) {return request({url: '/login',method: 'get',data})}
export function getInfo(token) {return request({url: '/getInfo',method: 'get',params: { token }})}
export function logout(token) {return request({url: '/logout',method: 'get',params: { token }})}