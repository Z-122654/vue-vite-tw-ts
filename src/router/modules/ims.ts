import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME } from '@/router/route-names'

export const imsRoutes: RouteRecordRaw[] = [
  {
    path: '/ims',
    name: ROUTE_NAME.IMS,
    children: [
      {
        path: 'toggle',
        name: ROUTE_NAME.IMS_TOGGLE,
        component: () => import('@/views/ims/ImsToggleTest.vue')
      }
    ]
  }
]
