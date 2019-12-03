import { route } from '@/utils/common'

const saleRouter = {

    path: '/sale',
    name: 'Sale',
    component: () => import('@/views/layout'),
    redirect: "/sale/list", // 后台登import('@/views/users/UserLst')陆默认页面
    children: [
        route('/sale/list', '/trans/sales/SaleList', 'SaleList', '出售列表'),
        route('/buy/list', '/trans/buy/BuyList', 'BuyList', '购买列表'),
        route('/afford/list', '/trans/afford/AffordList', 'AffordList', '预供列表'),

        // {
        //   name: 'UserLst',
        //   path: '/member/list',
        //   component: () => import('@/views/users/UserLst')
        // }

    ]
}
export default saleRouter
