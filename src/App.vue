<template>
  <n-config-provider id="app" :themeOverrides="themeOverrides" :theme="darkMode ? darkTheme : undefined" :locale="zhCN"
    :date-locale="dateZhCN">
    <n-element :class="{ 'darkMode': darkMode }">
      <div class="supportDark viewport">
        <Header />
        <n-scrollbar :style="{ maxHeight: `calc(100vh - ${store.state.headerHeight}px)`, overflow: 'hidden' }"
          @scroll="handleScroll">
          <div class="content"
            :style="{ minHeight: `calc(100vh - ${store.state.headerHeight + store.state.footerHeight}px)` }">
            <div class="breadcrumb">
              <n-breadcrumb v-if="!route.meta.hideBreadcrumb">
                <n-breadcrumb-item v-for="item in store.state.path.filter(item => !item.hide)" :key="item.url">
                  <router-link :to="item.url">
                    {{ item.title }}
                  </router-link>
                </n-breadcrumb-item>
              </n-breadcrumb>
            </div>
            <router-view v-slot="{ Component, route }">
              <transition name="fade" mode="out-in">
                <component :is="Component" :key="route.path" />
              </transition>
            </router-view>
          </div>
          <Footer />
        </n-scrollbar>
      </div>
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

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { GlobalThemeOverrides, darkTheme, zhCN, dateZhCN } from 'naive-ui'
import { useStore } from '@/store'
import NaiveMessageIniter from '@/components/NaiveMessageIniter.vue'
import NaiveDialogIniter from '@/components/NaiveDialogIniter.vue'
import NaiveNotificationIniter from '@/components/NaiveNotificationIniter.vue'
import mitt from '@/utils/mitt'
import { useRoute } from 'vue-router';



const route = useRoute()
const store = useStore()
const darkMode = computed(() => store.state.theme.darkMode)
const themeOverrides = computed<GlobalThemeOverrides>(() => ({
  common: {
    primaryColor: store.state.theme.primaryColor,
    primaryColorHover: store.state.theme.primaryColor,
    primaryColorPressed: store.state.theme.primaryColor,
    primaryColorSuppl: store.state.theme.primaryColor,
    fontFamily: "myFont, system-ui"
  },
}))

const handleScroll = ((e: Event) => {
  mitt.emit('scroll', e)
})

onMounted(() => {
  if (localStorage.getItem('accessToken')) {
    store.dispatch("user/checkSignIn")
  }
})
</script>
<style lang="scss" scoped>
.viewport {
  height: 100vh;
  background: #f4f4f4;

  .content {
    .breadcrumb {
      padding: 0 1rem;
    }
  }
}
</style>
<style scoped>
#app {
  font-family: var(--font-family) system-ui;
}

/* 渐变设置 */
.fade-enter-from,
.fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active {
  transition: all .3s ease;
}

.fade-leave-active {
  transition: all .3s ease
}
</style>
<style lang="scss">
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
</style>