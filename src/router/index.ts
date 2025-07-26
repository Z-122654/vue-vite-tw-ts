import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HelloWorld.vue'),
      props: {
        msg: 'Hello Vue 3 + TypeScript + Vite + Tailwind CSS/UI + Pinia + Vue Router'
      }
    },
    {
      path: '/vant/list',
      name: 'vantList',
      component: () => import('@/views/vant/List.vue')
    },
    {
      path: '/vant/form',
      name: 'vantForm',
      component: () => import('@/views/vant/Form.vue')
    },
    {
      path: '/ant/button',
      name: 'antButton',
      component: () => import('@/views/ant/Button.vue')
    },
    {
      path: '/pinia/rectangle',
      name: 'piniaRectangle',
      component: () => import('@/views/pinia/Rectangle.vue')
    },
    {
      path: '/pinia/user',
      name: 'piniaTable',
      component: () => import('@/views/pinia/user/UserList.vue')
    },
    {
      path: '/echart/devicePoint',
      name: 'echartDevicePoint',
      component: () => import('@/views/echarts/DevicePoint.vue')
    },
    {
      path: '/element/dialog/deepseekTestDialog',
      name: 'deepseekTestDialog',
      component: () => import('@/views/element/base/DeepseekTestDialog.vue')
    },
    {
      path: '/base/dropUploadFile',
      name: 'dropUploadFile',
      component: () => import('@/views/base/DropUploadFile.vue')
    },
    {
      path: '/ant/calendar',
      name: 'calendar',
      component: () => import('@/views/ant/Calendar.vue')
    },
    {
      path: '/ant/customCalendar',
      name: 'customCalendar',
      component: () => import('@/views/ant/CustomHeaderCalendar.vue')
    },
    {
      path: '/ant/timeRangePicker',
      name: 'timeRangePicker',
      component: () => import('@/views/ant/TimeRangePicker.vue')
    },
    {
      path: '/ant/mergeTable',
      name: 'timeRangePicker',
      component: () => import('@/views/ant/MergeTable.vue')
    },
    {
      path: '/base/tanshuti',
      name: 'tanshuti',
      component: () => import('@/views/base/TanShuTi.vue')
    }
  ]
})

export default router
