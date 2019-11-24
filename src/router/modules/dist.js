import { route } from '@/utils/common'

const distRouter = {

    path: '/dist',
    name: 'Dist',
    component: () => import('@/views/layout'),
    redirect: "/dist/list",
    children: [
        route('/dist/list', '/stock/dists/DistList', 'DistList', '凭证分配'),
    ]
}
export default distRouter