import { createApp } from 'vue'
import App from './App.vue'
import Router from './routes/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/scss/main-bp.scss'

createApp(App)
    .use(Router)
    .use(ElementPlus)
    .mount('#app')
