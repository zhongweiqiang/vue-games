import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/sale/index',
        method: 'get',
        params: data
    })
}

export function add(data){
    return request({
        url: '/v1/sale/store',
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
        url: '/v1/sale/down',
        method: 'post',
        data
    })
}

export function buy(data){
    return request({
        url: '/v1/sale/buy',
        method: 'post',
        data
    })
}

export function edit(data){
    return request({
        url: '/v1/sale/update',
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