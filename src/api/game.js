import request from '@/utils/request'

export function add(data){
    return request({
        url: '/v1/game/store',
        method: 'post',
        data
    })
}


export function index(data){
    return request({
        url: '/v1/game/index',
        method: 'get',
        params: data
    })
}

export function del(data){
    return request({
        url: '/v1/game/delete',
        method: 'delete',
        data
    })
}

export function status(data){
    return request({
        url: '/v1/game/status',
        method: 'post',
        data
    })
}

export function detail(data){
    return request({
        url: '/v1/game/detail',
        method: 'get',
        params: data
    })
}

export function edit(data){
    return request({
        url: '/v1/game/update',
        method: 'post',
        data
    })
}