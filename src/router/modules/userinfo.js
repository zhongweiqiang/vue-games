import { route } from '@/utils/common'

const infoRouter = {
    path: '/info',
    name: 'Info',
    component: () => import('@/views/layout'),
    redirect: '/info/list',
    children: [
        route('/info/list', '/system/userinfo/InfoList', 'InfoList', '详情列表'),
        route('/info/edit', '/system/userinfo/InfoEdit', 'InfoEdit', '用户详情修改'),
    ]
}

export default infoRouter