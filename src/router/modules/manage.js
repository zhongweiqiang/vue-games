import { route } from '@/utils/common'

const manageRouter = {

    path: '/manage',
    name: 'Manage',
    component: () => import('@/views/layout'),
    redirect: "/manage/list",
    children: [
        route('/manage/list', '/stock/manages/ManageList', 'ManageList', '库存管理'),
    ]
}

export default manageRouter
