import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME } from '@/router/route-names'

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/base',
    name: ROUTE_NAME.BASE,
    children: [
      {
        path: 'dropUploadFile',
        name: ROUTE_NAME.BASE_DROP_UPLOAD_FILE,
        component: () => import('@/views/base/DropUploadFile.vue')
      },
      {
        path: 'tanshuti',
        name: ROUTE_NAME.BASE_TANSHUTI,
        component: () => import('@/views/base/TanShuTi.vue')
      },
      {
        path: 'vueRender',
        name: ROUTE_NAME.BASE_VUE_RENDER,
        component: () => import('@/views/base/VueRender.vue')
      }
    ]
  }
]
