import { route } from '@/utils/common'

const inRouter = {

    path: '/ins',
    name: 'Ins',
    component: () => import('@/views/layout'),
    redirect: "/ins/list",
    children: [
        route('/ins/list', '/stock/ins/InList', 'InsList', '入库列表'),
    ]
}
export default inRouter