import { BASE_LAYOUT } from '~/layout'

export default {
  path: '/rank',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'Rank',
      component: () => import('~/pages/rank/index.vue'),
      meta: {
        title: '排行榜',
        requiresAuth: true,
      },
    },
  ],
}
