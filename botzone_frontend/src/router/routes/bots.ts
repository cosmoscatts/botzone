import { BASE_LAYOUT } from '~/layout'

export default {
  path: '/bots',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'Bots',
      component: () => import('~/pages/bots/index.vue'),
      meta: {
        title: '我的Bots',
        requiresAuth: true,
      },
    },
  ],
}
