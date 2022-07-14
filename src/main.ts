import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import naive from 'naive-ui'
import { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'

declare global {
    interface Window {
        $message: MessageApiInjection
    }
}

createApp(App).use(store).use(router).use(naive).mount('#app')
