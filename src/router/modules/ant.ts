import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_NAME } from '@/router/route-names'

export const antRoutes: RouteRecordRaw[] = [
  {
    path: '/ant',
    name: ROUTE_NAME.ANT,
    children: [
      {
        path: 'button',
        name: ROUTE_NAME.ANT_BUTTON,
        component: () => import('@/views/ant/Button.vue')
      },
      {
        path: 'calendar',
        name: ROUTE_NAME.ANT_CALENDAR,
        component: () => import('@/views/ant/Calendar.vue')
      },
      {
        path: 'customCalendar',
        name: ROUTE_NAME.ANT_CUSTOM_CALENDAR,
        component: () => import('@/views/ant/CustomHeaderCalendar.vue')
      },
      {
        path: 'timeRangePicker',
        name: ROUTE_NAME.ANT_TIME_RANGE_PICKER,
        component: () => import('@/views/ant/TimeRangePicker.vue')
      },
      {
        path: 'mergeTable',
        name: ROUTE_NAME.ANT_MERGE_TABLE,
        component: () => import('@/views/ant/MergeTable.vue')
      },
      {
        path: 'steps',
        name: ROUTE_NAME.ANT_STEPS,
        component: () => import('@/views/ant/Steps.vue')
      },
      {
        path: 'datePickerTest',
        name: ROUTE_NAME.ANT_DATE_PICKER_TEST,
        component: () => import('@/views/ant/DatePickerTest.vue')
      },
      {
        path: 'table',
        name: ROUTE_NAME.ANT_TABLE,
        children: [
          {
            path: 'table1',
            name: ROUTE_NAME.ANT_TABLE_1,
            component: () => import('@/views/ant/table/table1.vue')
          },
          {
            path: 'table2',
            name: ROUTE_NAME.ANT_TABLE_2,
            component: () => import('@/views/ant/table/table2.vue')
          }
        ]
      },
      {
        path: 'carousel',
        name: ROUTE_NAME.ANT_CAROUSEL,
        children: [
          {
            path: 'carousel01',
            name: ROUTE_NAME.ANT_CAROUSEL_01,
            component: () => import('@/views/ant/carousel/carousel01.vue')
          }
        ]
      },
      {
        path: 'tree',
        name: ROUTE_NAME.ANT_TREE,
        children: [
          {
            path: 'tree01',
            name: ROUTE_NAME.ANT_TREE_01,
            component: () => import('@/views/ant/tree/tree01.vue')
          }
        ]
      }
    ]
  }
]
