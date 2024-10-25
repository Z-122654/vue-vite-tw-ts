import { createApp } from 'vue'
import App from '@/App.vue'
import '@/styles/index.sass'
import router from '@/router'
import { createPinia } from 'pinia'
import { List, Field, CellGroup } from 'vant'
import 'vant/lib/index.css';
import { globalComponents } from '@/components'
import { DatePicker } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';


const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(globalComponents)
app.use(List)
app.use(Field)
app.use(CellGroup)
app.use(DatePicker);
app.directive('v-focus');
app.mount('#app')
console.log('app.config',app.config)