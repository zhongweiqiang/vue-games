import request from '@/utils/request'

export function add(data){
    return request({
        url: '/v1/price/store',
        method: 'post',
        data
    })
}


export function index(data){
    return request({
        url: '/v1/price/index',
        method: 'get',
        params: data
    })
}

export function del(data){
    return request({
        url: '/v1/price/delete',
        method: 'delete',
        data
    })
}



export function status(data){
    return request({
        url: '/v1/price/status',
        method: 'post',
        data
    })
}

export function detail(data){
    return request({
        url: '/v1/price/detail',
        method: 'get',
        params: data
    })
}

export function edit(data){
    return request({
        url: '/v1/price/update',
        method: 'post',
        data
    })
}

export function pass(data){
    return request({
        url: '/v1/price/pass',
        method: 'post',
        data
    })
}

export function priceSelect(data){
    return request({
        url: '/v1/price/select',
        method: 'get',
        params: data
    })
}

export function select(data){
    return request({
        url: '/v1/price/select',
        method: 'get',
        params: data
    })
}