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
        },
        {
          path: 'datePickerTest',
          name: 'antDatePickerTest',
          component: () => import('@/views/ant/DatePickerTest.vue')
        },
        {
          path: 'table',
          name: 'table',
          children: [
            {
              path: 'table1',
              name: 'table1',
              component: () => import('@/views/ant/table/table1.vue')
            },
            {
              path: 'table2',
              name: 'table2',
              component: () => import('@/views/ant/table/table2.vue')
            },
          ]
        },
        {
          path: 'carousel',
          name: 'carousel',
          children: [
            {
              path: 'carousel01',
              name: 'carousel01',
              component: () => import('@/views/ant/carousel/carousel01.vue')
            }
          ]
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
        },
        {
          path: 'secondPhaseCoalConsumption',
          name: 'echartsSecondPhaseCoalConsumption',
          component: () => import('@/views/echarts/secondPhaseCoalConsumption.vue')
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
        },
        {
          path: 'vueRender',
          name: 'vueRender',
          component: () => import('@/views/base/VueRender.vue')
        }
      ]
    },
    {
      path: '/vueFlow',
      name: 'vueFlow',
      children: [
        {
          path: 'baseDemo1',
          name: 'vueFlowBaseDemo1',
          component: () => import('@/views/vue-flow/test1/BaseDemo.vue')
        },
        {
          path: 'baseDemo2',
          name: 'vueFlowBaseDemo2',
          component: () => import('@/views/vue-flow/test2/BaseDemo.vue')
        }
      ]
    }
  ]
})

export default router
