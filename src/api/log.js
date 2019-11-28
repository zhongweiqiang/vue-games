import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/stock/store_log',
        method: 'get',
        params: data
    })
}
