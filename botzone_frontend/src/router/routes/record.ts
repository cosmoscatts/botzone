import { BASE_LAYOUT } from '~/layout'

export default {
  path: '/record',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'Record',
      component: () => import('~/pages/record/index.vue'),
      meta: {
        title: '对局记录',
        requiresAuth: true,
      },
    },
  ],
}
