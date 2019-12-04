import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/stock/store_log',
        method: 'get',
        params: data
    })
}

export function user(data){
    return request({
        url: '/v1/log/user',
        method: 'get',
        params: data
    })
}

export function fee(data){
    return request({
        url: '/v1/log/fee',
        method: 'get',
        params: data
    })
}
