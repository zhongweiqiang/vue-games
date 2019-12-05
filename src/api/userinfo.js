import request from '@/utils/request'

export function index(data) {
    return request({
        url: '/v1/info/index',
        method: 'get',
        params: data
    })
}

export function detail(data) {
    return request({
        url: '/v1/info/detail',
        method: 'get',
        params: data
    })
}

export function edit(data) {
    return request({
        url: '/v1/info/update',
        method: 'post',
        data
    })
}

export function pay_reset_password(data) {
    return request({
        url: '/v1/info/pay_reset_password',
        method: 'post',
        data
    })
}

export function select(data){
    return request({
        url: '/v1/info/select',
        method: 'get',
        params: data
    })
}

export function judge_status(data){
    return request({
        url: '/v1/info/judge_status',
        method: 'post',
        data
    })
}

export function reset_nickname(data){
    return request({
        url: '/v1/info/reset_nickname',
        method: 'post',
        data
    })
}