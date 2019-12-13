import request from '@/utils/request'

export function add(data){
    return request({
        url: '/v1/config/store',
        method: 'post',
        data
    })
}

export function index(data){
    return request({
        url: '/v1/config/index',
        method: 'get',
        params: data
    })
}

export function detail(data){
    return request({
        url: '/v1/config/detail',
        method: 'get',
        params: data
    })
}

export function edit(data){
    return request({
        url: '/v1/config/update',
        method: 'post',
        data
    })
}

export function pagesize(){
    return request({
        url: '/v1/config/pagesize',
        method: 'get'
    })
}