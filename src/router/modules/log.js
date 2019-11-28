import { route } from '@/utils/common'

const logRouter = {

    path: '/log',
    name: 'Log',
    component: () => import('@/views/layout'),
    redirect: "/log/stock",
    children: [
        route('/log/stock', '/log/stocks/StockList', 'StockLog', '凭证日志'),
        route('/log/user', '/log/users/UserList', 'UserLog', '用户日志'),
        route('/log/trans', '/log/stocks/TransList', 'TransLog', '交易日志'),
    ]
}
export default logRouter