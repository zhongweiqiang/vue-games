import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/buy/index',
        method: 'get',
        params: data
    })
}

export function add(data){
    return request({
        url: '/v1/buy/store',
        method: 'post',
        data
    })
}

export function remain(data){
    return request({
        url: '/v1/sale/remain',
        method: 'get',
        params: data
    })
}

export function down(data){
    return request({
        url: '/v1/buy/down',
        method: 'post',
        data
    })
}

export function afford(data){
    return request({
        url: '/v1/buy/afford',
        method: 'post',
        data
    })
}


export function edit(data){
    return request({
        url: '/v1/buy/update',
        method: 'post',
        data
    })
}

export function mySale(data){
    return request({
        url: '/v1/sale/me',
        method: 'get',
        params: data
    })
}

export function qiugou_me(data){
    return request({
        url: 'v1/buy/qiugou_me',
        method: 'get',
        params: data
    })
}

export function me_pre(data){
    return request({
        url: '/v1/buy/me_pre',
        method: 'get',
        params: data
    })
}

export function affordUser(data){
    return request({
        url: '/v1/buy/afford_user',
        method: 'get',
        params: data
    })
}

export function punish(data){
    return request({
        url: '/v1/buy/punish',
        method: 'post',
        data
    })
}

export function affordUserPrompt(data){
    return request({
        url: '/v1/buy/afford_user_prompt',
        method: 'get',
        params: data
    })
}