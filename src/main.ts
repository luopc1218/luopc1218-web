import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import naive from 'naive-ui'



createApp(App).use(store).use(router).use(naive).mount('#app')
