import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME } from '@/router/route-names'

export const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/404',
    name: ROUTE_NAME.NOT_FOUND,
    component: () => import('@/views/system/NotFoundView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]
