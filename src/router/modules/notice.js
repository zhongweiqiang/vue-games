import { route } from '@/utils/common'

const NoticeRouter = {

    path: '/notice',
    name: 'Notice',
    component: () => import('@/views/layout'),
    redirect: "/notice/list",
    children: [
        route('/notice/list', '/system/notice/NoticeList', 'NoticeList', '公告列表'),
    ]
}
export default NoticeRouter