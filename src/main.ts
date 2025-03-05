import { createApp } from 'vue'
import App from '@/App.vue'
import '@/styles/index.sass'
import router from '@/router'
import { createPinia } from 'pinia'
import vant from 'vant'
import 'vant/lib/index.css'
import { globalComponents } from '@/components'
import antDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueMarkdown from 'vue-markdown'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(globalComponents)
app.use(vant)
app.use(antDesignVue)
app.use(ElementPlus)
app.use(VueMarkdown)
app.directive('v-focus')

app.mount('#app')
console.log('app.config', app.config)