import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME } from '@/router/route-names'

export const elementRoutes: RouteRecordRaw[] = [
  {
    path: '/element',
    name: ROUTE_NAME.ELEMENT,
    children: [
      {
        path: 'dialog/deepseekTestDialog',
        name: ROUTE_NAME.ELEMENT_DEEPSEEK_TEST_DIALOG,
        component: () => import('@/views/element/base/DeepseekTestDialog.vue')
      }
    ]
  }
]
