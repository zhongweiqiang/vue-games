import { route } from '@/utils/common'

const deviceRouter = {
    path: '/device',
    name: 'Device',
    component: () => import('@/views/layout'),
    redirect: '/device/list',
    children: [
        route('/device/list',  '/device/devices/DeviceList', 'DeviceList', '设备列表')
    ]

}

export default deviceRouter