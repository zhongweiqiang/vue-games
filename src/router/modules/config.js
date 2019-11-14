import { route } from '@/utils/common'

const configRouter = {
    path: '/config',
    name: 'Config',
    component: () => import('@/views/layout'),
    redirect: '/config/list',
    children: [
        route('/config/list',  '/system/configs/ConfList', 'ConfList', '配置列表'),
        route('/config/add',  '/system/configs/ConfAdd', 'ConfAdd', '配置添加'),
    ]

}

export default configRouter