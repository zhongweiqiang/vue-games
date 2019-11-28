import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/stock/dist_index',
        method: 'get',
        params: data
    })
}

export function dist(data){
    return request({
        url: '/v1/stock/dist',
        method: 'post',
        data
    })
}

export function son_to_user(data){
    return request({
        url: '/v1/stock/son_to_user',
        method: 'post',
        data
    })
}

export function migration_dist(data){
    return request({
        url: '/v1/stock/migration_dist',
        method: 'post',
        data
    })
}

export function getCount(data){
    return request({
        url: '/v1/stock/get_count',
        method: 'post',
        data
    })
}
