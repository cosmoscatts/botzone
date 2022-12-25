import { createRouter, createWebHashHistory } from 'vue-router'
import { createRouterGuard } from './guard'
import routes from './format-routes'

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('~/pages/not-found/index.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouterGuard(router)

export default router
