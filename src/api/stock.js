import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/stock/index',
        method: 'get',
        params: data
    })
}

export function detail(data){
    return request({
        url: '/v1/stock/detail',
        method: 'get',
        params: data
    })
}

export function status(data){
    return request({
        url: '/v1/stock/status',
        method: 'post',
        data
    })
}

export function del(data){
    return request({
        url: '/v1/stock/delete',
        method: 'delete',
        data
    })
}

export function exportStock(data){
    return request({
        url: '/v1/stock/export_stock',
        method: 'get',
        params: data,
        responseType: 'blob'
    })
}