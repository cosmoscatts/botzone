import { BASE_LAYOUT } from '~/layout'

export default {
  path: '/login',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'Login',
      component: () => import('~/pages/login/index.vue'),
      meta: {
        title: '登录',
        requiresAuth: true,
      },
    },
  ],
}
