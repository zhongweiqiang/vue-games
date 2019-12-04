import { route } from '@/utils/common'

const saleRouter = {

    path: '/sale',
    name: 'Sale',
    component: () => import('@/views/layout'),
    redirect: "/sale/list", // 后台登import('@/views/users/UserLst')陆默认页面
    children: [
        route('/buyed/list', '/trans/buyed/BuyedList', 'BuyedList', '我的购买'),
        route('/sale/list', '/trans/sales/SaleList', 'SaleList', '出售列表'),
        route('/buy/list', '/trans/buy/BuyList', 'BuyList', '购买列表'),
        route('/afford/list', '/trans/afford/AffordList', 'AffordList', '预供列表'),
        route('/saled/list', '/trans/saled/SaledList', 'SaledList', '我的出售'),
        route('/pre_buy_me/list', '/trans/pre_buy_me/PreBuyMeList', 'PreBuyMeList', '我的求购(预供货)'),
        route('/buy_me/list', '/trans/buy_me/BuyMeList', 'BuyMeList', '我的求购(即时供货)'),
        

        // {
        //   name: 'UserLst',
        //   path: '/member/list',
        //   component: () => import('@/views/users/UserLst')
        // }

    ]
}
export default saleRouter
