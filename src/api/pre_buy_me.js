import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/stock/out_index',
        method: 'get',
        params: data
    })
}
