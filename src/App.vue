<template>
  <n-config-provider :themeOverrides="themeOverrides" :theme="darkMode ? darkTheme : undefined" :locale="zhCN"
    :date-locale="dateZhCN">
    <div :class="darkMode ? 'darkMode' : ''">
      <Header />
      <n-scrollbar class="scrollContent">
        <router-view style="flex:1" />
        <Footer />
      </n-scrollbar>
    </div>
    <n-global-style />
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { GlobalThemeOverrides, darkTheme, zhCN, dateZhCN } from 'naive-ui'
import { useStore } from 'vuex'
import { globalStoreStates } from './store';

export default defineComponent({
  name: 'IndexPage',
  components: { Header, Footer },
  setup() {
   
    const store = useStore<globalStoreStates>()
    const darkMode = computed(() => store.state.theme.darkMode)
    const themeOverrides = computed<GlobalThemeOverrides>(() => ({
      common: {
        primaryColor: store.state.theme.primaryColor,
        primaryColorHover: store.state.theme.primaryColor,
        primaryColorPressed: store.state.theme.primaryColor,
        primaryColorSuppl: store.state.theme.primaryColor,
      },
    }))
    onMounted(() => {
      store.dispatch("getUserInfo")
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
.scrollContent {
  height: calc(100vh - 74px);
}

.darkMode {
  .supportDark {
    transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    background-color: #000 !important;
    color: #fff;
  }
}
</style>