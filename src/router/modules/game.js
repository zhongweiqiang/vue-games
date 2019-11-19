import { route } from '@/utils/common'

const gameRouter = {
    path: '/game',
    name: 'Game',
    component: () => import('@/views/layout'),
    redirect: '/game/list',
    children: [
        route('/game/list',  '/game/games/GameList', 'GameList', '游戏列表'),
        route('/game/add',  '/game/games/GameAdd', 'GameAdd', '游戏添加'),
    ]

}

export default gameRouter