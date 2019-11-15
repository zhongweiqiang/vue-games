import { route } from '@/utils/common'

const sonRouter = {

    path: '/son',
    name: 'Son',
    component: () => import('@/views/layout'),
    redirect: "/son/list",
    children: [
        route('/son/list', '/account/son/SonList', 'SonList', '子账户列表'),
        route('/son/add', '/account/son/SonAdd','SonAdd', '子账户添加'),
        route('/son/edit', '/account/son/SonEdit', 'SonEdit', '子账户修改')
    ]
}

export default sonRouter
