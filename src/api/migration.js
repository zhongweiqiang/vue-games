import request from '@/utils/request'

export function migration(data){
    return request({
        url: '/v1/stock/migration',
        method: 'post',
        data
    })
}

// 凭证管理页面分配凭证
export function distribution(data){
    return request({
        url: '/v1/stock/distribution',
        method: 'post',
        data
    })
}
