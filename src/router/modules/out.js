import { route } from '@/utils/common'

const outRouter = {

    path: '/out',
    name: 'Out',
    component: () => import('@/views/layout'),
    redirect: "/out/list",
    children: [
        route('/out/list', '/stock/outs/OutList', 'OutList', '出库列表'),
    ]
}
export default outRouter