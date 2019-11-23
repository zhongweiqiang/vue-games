import { route } from '@/utils/common'

const stockRouter = {

    path: '/stock',
    name: 'Stock',
    component: () => import('@/views/layout'),
    redirect: "/stock/list",
    children: [
        route('/stock/list', '/stock/stocks/StockList', 'StockList', '库存列表'),
    ]
}

export default stockRouter
