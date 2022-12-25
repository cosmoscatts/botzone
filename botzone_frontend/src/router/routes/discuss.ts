import { BASE_LAYOUT } from '~/layout'

export default {
  path: '/discuss',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'Discuss',
      component: () => import('~/pages/discuss/index.vue'),
      meta: {
        title: '讨论区',
        requiresAuth: true,
      },
    },
  ],
}
