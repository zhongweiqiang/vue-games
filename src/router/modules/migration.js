import { route } from '@/utils/common'

const migrationRouter = {

    path: '/migration',
    name: 'Migration',
    component: () => import('@/views/layout'),
    redirect: "/migration/list",
    children: [
        route('/migration/list', '/stock/migrations/MigrationList', 'MigrationList', '凭证迁移'),
    ]
}
export default migrationRouter