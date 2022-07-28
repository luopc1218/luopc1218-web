<template>
  <n-config-provider :themeOverrides="themeOverrides" :theme="darkMode ? darkTheme : undefined" :locale="zhCN"
    :date-locale="dateZhCN">
    <n-element :class="{ 'darkMode': darkMode, 'viewport': true }">
      <Header />
      <n-scrollbar class="scrollContent">
        <router-view />
        <Footer />
      </n-scrollbar>
    </n-element>
    <n-message-provider>
      <NaiveMessageIniter />
    </n-message-provider>
    <n-dialog-provider>
      <NaiveDialogIniter />
    </n-dialog-provider>
    <n-notification-provider>
      <NaiveNotificationIniter />
    </n-notification-provider>
    <n-global-style />
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { GlobalThemeOverrides, darkTheme, zhCN, dateZhCN } from 'naive-ui'
import { useStore } from '@/store'
import { globalStoreStates } from './store';
import NaiveMessageIniter from '@/components/NaiveMessageIniter.vue'
import NaiveDialogIniter from '@/components/NaiveDialogIniter.vue'
import NaiveNotificationIniter from '@/components/NaiveNotificationIniter.vue'


export default defineComponent({
  name: 'IndexPage',
  components: { Header, Footer, NaiveMessageIniter, NaiveDialogIniter, NaiveNotificationIniter },
  setup() {

    const store = useStore()
    const darkMode = computed(() => store.state.theme.darkMode)
    const themeOverrides = computed<GlobalThemeOverrides>(() => ({
      common: {
        primaryColor: store.state.theme.primaryColor,
        primaryColorHover: store.state.theme.primaryColor,
        primaryColorPressed: store.state.theme.primaryColor,
        primaryColorSuppl: store.state.theme.primaryColor,
      },
    }))

    const initLive2d = () => {
      setTimeout(() => {
        window.L2Dwidget.init({
          pluginRootPath: 'live2dw/',
          pluginJsPath: 'live2dw/lib/',
          pluginModelPath: 'live2dw/live2d-widget-model-hibiki/assets/', //中间这个haru_2就是你的老婆,想换个老婆,换这个就可以了
          tagMode: false,
          debug: false,
          model: { jsonPath: '/live2dw/live2d-widget-model-hibiki/assets/hibiki.model.json' },
          display: { position: 'right', width: 120, height: 270, "vOffset": 0, hOffset: 50 },  //调整大小,和位置
          mobile: { show: false },   //要不要盯着你的鼠标看
          log: false,
        })
      }, 500)
    }

    onMounted(() => {
      if (localStorage.getItem('accessToken')) {
        store.dispatch("user/checkSignIn")
      }
      // initLive2d()
    })
    return {
      themeOverrides,
      darkMode,
      darkTheme, zhCN, dateZhCN
    }
  }
});
</script>
<style lang="scss">
.viewport {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .scrollContent {
    // height: calc(100vh - 74px);
    flex: 1
  }
}


.darkMode {
  .supportDark {
    transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    background-color: #000 !important;
    color: #fff;
  }
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}



@font-face {
  font-family: "myFont"; //给引入的字体起个名字
  src: url("./assets/fonts/汉仪忘川跳简.ttf"); //引入字体文件
}

* {
  font-family:cursive;

}
</style>