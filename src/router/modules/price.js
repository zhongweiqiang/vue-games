import { route } from '@/utils/common'

const priceRouter = {
    path: '/price',
    name: 'Price',
    component: () => import('@/views/layout'),
    redirect: '/price/list',
    children: [
        route('/price/list',  '/game/prices/PriceList', 'PriceList', '面值列表'),
        route('/price/pass',  '/game/prices/PricePass', 'PricePass', '面值跳过列表'),
    ]

}

export default priceRouter