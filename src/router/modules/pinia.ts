import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME } from '@/router/route-names'

export const piniaRoutes: RouteRecordRaw[] = [
  {
    path: '/pinia',
    name: ROUTE_NAME.PINIA,
    children: [
      {
        path: 'rectangle',
        name: ROUTE_NAME.PINIA_RECTANGLE,
        component: () => import('@/views/pinia/Rectangle.vue')
      },
      {
        path: 'user',
        name: ROUTE_NAME.PINIA_USER,
        component: () => import('@/views/pinia/user/UserList.vue')
      }
    ]
  }
]
