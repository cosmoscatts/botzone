import { BASE_LAYOUT } from '~/layout'

export default {
  path: '/game',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'Game',
      component: () => import('~/pages/game/index.vue'),
      meta: {
        title: '游戏',
        requiresAuth: true,
      },
    },
  ],
}
