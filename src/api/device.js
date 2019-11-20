import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/device/index',
        method: 'get',
        params: data
    })
}

export function select(data){
    return request({
        url: '/v1/device/select',
        method: 'get',
        params: data
    })
}

export function del(data){
    return request({
        url: '/v1/device/delete',
        method: 'delete',
        data
    })
}

export function status(data){
    return request({
        url: '/v1/device/status',
        method: 'post',
        data
    })
}