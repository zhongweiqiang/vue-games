import request from '@/utils/request'

export function add(data) {
  return request({
    url: '/v1/son/store',
    method: 'post',
    data
  })
}

export function index(data) {
  return request({
    url: '/v1/son/index',
    method: 'get',
    params: data
  })
}

export function detail(data) {
    return request({
      url: '/v1/son/detail',
      method: 'get',
      params: data
    })
  }

export function edit(data) {
  return request({
    url: '/v1/son/update',
    method: 'post',
    data
  })
}

export function del(data){
  return request({
    url: '/v1/son/delete',
    method: 'delete',
    data
  })
}

export function status(data){
  return request({
    url: '/v1/son/status',
    method: 'post',
    data
  })
}

export function son_statistic(data){
  return request({
    url: '/v1/stock/son_statistic',
    method: 'get',
    params: data
  })
}
