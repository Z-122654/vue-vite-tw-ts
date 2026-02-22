import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME } from '@/router/route-names'

export const vueFlowRoutes: RouteRecordRaw[] = [
  {
    path: '/vueFlow',
    name: ROUTE_NAME.VUE_FLOW,
    children: [
      {
        path: 'baseDemo1',
        name: ROUTE_NAME.VUE_FLOW_BASE_DEMO_1,
        component: () => import('@/views/vue-flow/test1/BaseDemo.vue')
      },
      {
        path: 'baseDemo2',
        name: ROUTE_NAME.VUE_FLOW_BASE_DEMO_2,
        component: () => import('@/views/vue-flow/test2/BaseDemo.vue')
      }
    ]
  }
]
