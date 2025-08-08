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
      path: '/vant',
      name: 'vant',
      children: [
        {
          path: 'list',
          name: 'vantList',
          component: () => import('@/views/vant/List.vue')
        },
        {
          path: 'form',
          name: 'vantForm',
          component: () => import('@/views/vant/Form.vue')
        }
      ]
    },
    {
      path: '/ant',
      name: 'ant',
      children: [
        {
          path: 'button',
          name: 'antButton',
          component: () => import('@/views/ant/Button.vue')
        },
        {
          path: 'calendar',
          name: 'antCalendar',
          component: () => import('@/views/ant/Calendar.vue')
        },
        {
          path: 'customCalendar',
          name: 'antCustomCalendar',
          component: () => import('@/views/ant/CustomHeaderCalendar.vue')
        },
        {
          path: 'timeRangePicker',
          name: 'antTimeRangePicker',
          component: () => import('@/views/ant/TimeRangePicker.vue')
        },
        {
          path: 'mergeTable',
          name: 'antTimeRangePicker',
          component: () => import('@/views/ant/MergeTable.vue')
        },
        {
          path: 'steps',
          name: 'antTimeRangePicker',
          component: () => import('@/views/ant/Steps.vue')
        }
      ]
    },
    {
      path: '/pinia',
      name: 'pinia',
      children: [
        {
          path: 'rectangle',
          name: 'piniaRectangle',
          component: () => import('@/views/pinia/Rectangle.vue')
        },
        {
          path: 'user',
          name: 'piniaUser',
          component: () => import('@/views/pinia/user/UserList.vue')
        }
      ]
    },
    {
      path: '/echarts',
      name: 'echarts',
      children: [
        {
          path: 'devicePoint',
          name: 'echartsDevicePoint',
          component: () => import('@/views/echarts/DevicePoint.vue')
        }
      ]
    },
    {
      path: '/element',
      name: 'element',
      children: [
        {
          path: 'dialog/deepseekTestDialog',
          name: 'deepseekTestDialog',
          component: () => import('@/views/element/base/DeepseekTestDialog.vue')
        }
      ]
    },
    {
      path: '/base',
      name: 'base',
      children: [
        {
          path: 'dropUploadFile',
          name: 'baseDropUploadFile',
          component: () => import('@/views/base/DropUploadFile.vue')
        },
        {
          path: 'tanshuti',
          name: 'baseTanshuti',
          component: () => import('@/views/base/TanShuTi.vue')
        }
      ]
    },
    {
      path: '/vueFlow',
      name: 'vueFlow',
      children: [
        {
          path: 'baseDemo',
          name: 'vueFlowBaseDemo',
          component: () => import('@/views/vue-flow/BaseDemo.vue')
        }
      ]
    }
  ]
})

export default router
