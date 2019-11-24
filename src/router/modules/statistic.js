import { route } from '@/utils/common'

const statisticRouter = {

    path: '/statistic',
    name: 'Statistic',
    component: () => import('@/views/layout'),
    redirect: "/statistic/list",
    children: [
        route('/statistic/list', '/stock/statistics/StatisticList', 'StatisticList', '数据统计'),
    ]
}
export default statisticRouter