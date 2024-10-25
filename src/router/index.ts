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
      name: 'vant-list',
      component: () => import('@/views/vant/List.vue')
    },
    {
      path: '/vant/form',
      name: 'vant-form',
      component: () => import('@/views/vant/Form.vue')
    },
    {
      path: '/ant/button',
      name: 'ant-button',
      component: () => import('@/views/ant/Button.vue')
    },
    {
      path: '/pinia/rectangle',
      name: 'pinia-rectangle',
      component: () => import('@/views/pinia/Rectangle.vue')
    },
    {
      path: '/pinia/table',
      name: 'pinia-table',
      component: () => import('@/views/pinia/Table.vue')
    }
  ]
})

export default router
