import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/dashboard/dashboard',
        method: 'get',
        params: data
    })
}