import { createApp } from 'vue'
import App from './App.vue'
import Router from './routes/index.js'
import './assets/scss/main-bp.scss'
createApp(App)
    .use(Router)
    .mount('#app')
