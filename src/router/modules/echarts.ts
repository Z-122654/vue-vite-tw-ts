import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME } from '@/router/route-names'

export const echartsRoutes: RouteRecordRaw[] = [
  {
    path: '/echarts',
    name: ROUTE_NAME.ECHARTS,
    children: [
      {
        path: 'devicePoint',
        name: ROUTE_NAME.ECHARTS_DEVICE_POINT,
        component: () => import('@/views/echarts/DevicePoint.vue')
      },
      {
        path: 'secondPhaseCoalConsumption',
        name: ROUTE_NAME.ECHARTS_SECOND_PHASE_COAL_CONSUMPTION,
        component: () => import('@/views/echarts/secondPhaseCoalConsumption.vue')
      },
      {
        path: 'cylinderTest',
        name: ROUTE_NAME.ECHARTS_CYLINDER_TEST,
        component: () => import('@/views/echarts/CylinderTest.vue')
      },
      {
        path: 'cubeTest',
        name: ROUTE_NAME.ECHARTS_CUBE_TEST,
        component: () => import('@/views/echarts/CubeTest.vue')
      },
      {
        path: 'lollipopTest',
        name: ROUTE_NAME.ECHARTS_LOLLIPOP_TEST,
        component: () => import('@/views/echarts/LollipopTest.vue')
      },
      {
        path: 'progressBarTest',
        name: ROUTE_NAME.ECHARTS_PROGRESS_BAR_TEST,
        component: () => import('@/views/echarts/ProgressBarTest.vue')
      },
      {
        path: 'square3dBarTest',
        name: ROUTE_NAME.ECHARTS_SQUARE_3D_BAR_TEST,
        component: () => import('@/views/echarts/Square3DBarTest.vue')
      },
      {
        path: 'diamondEchart',
        name: ROUTE_NAME.ECHARTS_DIAMOND_ECHART,
        component: () => import('@/views/echarts/DiamondEchart.vue')
      }
    ]
  }
]
