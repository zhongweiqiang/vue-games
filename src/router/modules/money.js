import { route } from '@/utils/common'

const moneyRouter = {

    path: '/money',
    name: 'Money',
    component: () => import('@/views/layout'),
    redirect: "/money/list",
    children: [
        route('/money/list', '/money/money/MoneyList', 'MoneyList', '充值提现'),
        route('/pay/list', '/money/pays/PayList', 'PayList', '支付列表'),
        route('/give/list', '/money/give/GiveList', 'GiveList', '支付列表'),
    ]
}
export default moneyRouter