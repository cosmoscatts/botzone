import { BASE_LAYOUT } from '~/layout'

export default {
  path: '/profile',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'Profile',
      component: () => import('~/pages/profile/index.vue'),
      meta: {
        title: '个人资料',
        requiresAuth: true,
      },
    },
  ],
}
