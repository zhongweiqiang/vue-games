import request from '@/utils/request'

export function upload(data){
    return request({
        url: '/v1/money/upload',
        method: 'post',
        data
    })
}

export function pic(data){
    return request({
        url: '/v1/money/pic',
        method: 'get',
        params: data
    })
}

export function apply(data){
    return request({
        url: '/v1/money/apply',
        method: 'post',
        data
    })
}

export function index(data){
    return request({
        url: '/v1/money/index',
        method: 'get',
        params: data
    })
}

export function status(data){
    return request({
        url: '/v1/money/status',
        method: 'post',
        data
    })
}

export function picList(data){
    return request({
        url: '/v1/money/pic_list',
        method: 'get',
        params: data
    })
}
