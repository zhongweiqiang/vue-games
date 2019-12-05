import { route } from '@/utils/common'

const logRouter = {

    path: '/log',
    name: 'Log',
    component: () => import('@/views/layout'),
    redirect: "/log/stock",
    children: [
        route('/log/stock', '/log/stocks/StockList', 'StockLog', '凭证日志'),
        route('/log/user', '/log/users/UserList', 'UserLog', '用户日志'),
        route('/log/output', '/log/output/OutPutList', 'OutPutList', '出库手续费'),
        route('/log/fee', '/log/fee/FeeList', 'FeeLog', '手续费日志'),
        route('/log/withdraw', '/log/withdraw/WithdrawList', 'WithdrawList', '提现手续费'),
        route('/log/trans', '/log/trans/TransList', 'TransList', '交易续费'),
    ]
}
export default logRouter