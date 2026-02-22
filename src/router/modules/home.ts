import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME } from '@/router/route-names'

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTE_NAME.HOME,
    component: () => import('@/views/HelloWorld.vue'),
    props: {
      msg: 'Hello Vue 3 + TypeScript + Vite + Tailwind CSS/UI + Pinia + Vue Router'
    }
  }
]
