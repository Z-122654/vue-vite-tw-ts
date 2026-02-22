import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME } from '@/router/route-names'

export const alarmRoutes: RouteRecordRaw[] = [
  {
    path: '/alarm',
    name: ROUTE_NAME.ALARM,
    children: [
      {
        path: '',
        name: ROUTE_NAME.ALARM_HOME,
        component: () => import('@/views/alarm/AlarmHomeView.vue')
      },
      {
        path: 'config',
        name: ROUTE_NAME.ALARM_CONFIG_CREATE,
        component: () => import('@/views/alarm/AlarmConfigView.vue')
      },
      {
        path: 'config/:id',
        name: ROUTE_NAME.ALARM_CONFIG_EDIT,
        component: () => import('@/views/alarm/AlarmConfigView.vue')
      }
    ]
  }
]
