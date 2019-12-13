import request from '@/utils/request'

export function index(data){
    return request({
        url: '/v1/stock/statistic',
        method: 'get',
        params: data
    })
}

export function exportStatisticStock(data){
    return request({
        url: '/v1/stock/statistic_export',
        method: 'get',
        params: data,
        responseType: 'blob'
    })
}
