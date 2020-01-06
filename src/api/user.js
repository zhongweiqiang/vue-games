import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/v1/auth/login',
    method: 'post',
    data
  })
}

export function index(data) {
  return request({
    url: '/v1/user/index',
    method: 'get',
    params: data
  })
}

export function add(data) {
  return request({
    url: '/v1/user/store',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/v1/user/update',
    method: 'post',
    data
  })
}

export function status(data) {
  return request({
    url: '/v1/user/status',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/v1/user/delete',
    method: 'delete',
    data
  })
}

export function reset_password(data) {
  return request({
    url: '/v1/user/reset_password',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/v1/user/detail',
    method: 'get',
    params: data
  })
}

export function tag_data(data) {
  return request({
    url: '/v1/user/tag_data',
    method: 'get',
    params: data
  })
}

export function refreshToken(){
  return request({
    url: '/v1/auth/refresh',
    method: 'get',
  })
}

export function getElement(){
  return request({
    url: '/v1/menu/element',
    method: 'get'
  })
}

export function select(data){
  return request({
    url: '/v1/user/select',
    method: 'get',
    params: data
  })
}

export function userSelect(data){
  return request({
    url: '/v1/user/select',
    method: 'get',
    params: data
  })
}

export function info(data){
  return request({
    url: '/v1/user/info',
    method: 'get',
    params: data
  })
}

export function logout(data){
  return request({
    url: '/v1/auth/logout',
    method: 'post',
    data
  })
}

export function user_reset_password(data){
  return request({
    url: '/v1/user/user_reset_password',
    method: 'post',
    data
  })
}

export function pay_update_password(data){
  return request({
    url: '/v1/user/pay_update_password',
    method: 'post',
    data
  })
}

export function start_member_description(data){
  return request({
    url: '/v1/user/start_member_description',
    method: 'get',
    params: data
  })
}

