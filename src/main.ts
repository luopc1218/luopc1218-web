import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
import naive from 'naive-ui'
import { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'
import { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'

declare global {
    interface Window {
        _message: MessageApiInjection;
        _dialog: DialogApiInjection;
        _notification: NotificationApiInjection;
        L2Dwidget: any
    }
}

createApp(App).use(store).use(router).use(naive).mount('#app')
