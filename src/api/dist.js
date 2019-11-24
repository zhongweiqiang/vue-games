import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/stock/dist_index',
        method: 'get',
        params: data
    })
}

export function dist(data){
    return request({
        url: '/v1/stock/dist',
        method: 'post',
        data
    })
}
