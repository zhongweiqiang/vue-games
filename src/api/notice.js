import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/notice/index',
        method: 'get',
        params: data
    })
}

export function add(data){
    return request({
        url: '/v1/notice/store',
        method: 'post',
        data
    })
}

export function del(data){
    return request({
        url: '/v1/notice/delete',
        method: 'delete',
        data
    })
}

export function edit(data){
    return request({
        url: '/v1/notice/update',
        method: 'post',
        data
    })
}

export function detail(data){
    return request({
        url: '/v1/notice/detail',
        method: 'get',
        params: data
    })
}


export function display(data){
    return request({
        url: '/v1/notice/display',
        method: 'get',
        params: data
    })
}