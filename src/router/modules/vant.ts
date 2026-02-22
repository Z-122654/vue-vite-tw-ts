import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME } from '@/router/route-names'

export const vantRoutes: RouteRecordRaw[] = [
  {
    path: '/vant',
    name: ROUTE_NAME.VANT,
    children: [
      {
        path: 'list',
        name: ROUTE_NAME.VANT_LIST,
        component: () => import('@/views/vant/List.vue')
      },
      {
        path: 'form',
        name: ROUTE_NAME.VANT_FORM,
        component: () => import('@/views/vant/Form.vue')
      }
    ]
  }
]
