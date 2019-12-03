import request from '@/utils/request'
import { finished } from 'stream'

export function afford(data){
    return request({
        url: '/v1/afford/afford',
        method: 'post',
        data
    })
}

export function index(data){
    return request({
        url: '/v1/afford/index',
        method: 'get',
        params: data
    })
}

export function finish(data){
    return request({
        url: '/v1/afford/finish',
        method: 'post',
        data
    })
}

export function done(data){
    return request({
        url: '/v1/afford/done',
        method: 'post',
        data
    })
}