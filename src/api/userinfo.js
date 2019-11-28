import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/info/index',
        method: 'get',
        params: data
    })
}

export function detail(data){
    return request({
        url: '/v1/info/detail',
        method: 'get',
        params: data
    })
}

export function edit(data){
    return request({
        url: '/v1/info/update',
        method: 'post',
        data
    })
}

export function pay_reset_password(data){
    return request({
      url: '/v1/info/pay_reset_password',
      method: 'post',
      data
    })
  }