import { createRouter, createWebHistory } from 'vue-router'
import { homeRoutes } from '@/router/modules/home'
import { vantRoutes } from '@/router/modules/vant'
import { antRoutes } from '@/router/modules/ant'
import { piniaRoutes } from '@/router/modules/pinia'
import { echartsRoutes } from '@/router/modules/echarts'
import { elementRoutes } from '@/router/modules/element'
import { baseRoutes } from '@/router/modules/base'
import { vueFlowRoutes } from '@/router/modules/vue-flow'
import { imsRoutes } from '@/router/modules/ims'
import { alarmRoutes } from '@/router/modules/alarm'
import { systemRoutes } from '@/router/modules/system'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...homeRoutes,
    ...vantRoutes,
    ...antRoutes,
    ...piniaRoutes,
    ...echartsRoutes,
    ...elementRoutes,
    ...baseRoutes,
    ...vueFlowRoutes,
    ...imsRoutes,
    ...alarmRoutes,
    ...systemRoutes
  ]
})

export default router
