import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/stock/in_index',
        method: 'get',
        params: data
    })
}

export function exportInStock(data){
    return request({
        url: '/v1/stock/in_export',
        method: 'get',
        params: data,
        responseType: 'blob'
    })
}