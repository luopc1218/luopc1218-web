<template>
  <NConfigProvider :themeOverrides="themeOverrides" :theme="darkMode ? darkTheme : undefined">
    <Header />
    <router-view />
  </NConfigProvider>
</template>

<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import Header from './components/Header.vue'
import { NConfigProvider, GlobalThemeOverrides, darkTheme } from 'naive-ui'
import { useStore } from 'vuex'
import { globalStoreStates } from './store';

export default defineComponent({
  name: 'IndexPage',
  components: { Header, NConfigProvider },
  setup() {
    const store = useStore<globalStoreStates>()
    const darkMode = computed(() => store.state.theme.darkMode)
    const themeOverrides = computed<GlobalThemeOverrides>(() => ({
      common: {
        baseColor: store.state.theme.primaryColor,
      },
    }))
    return {
      themeOverrides,
      darkMode,
      darkTheme
    }
  }
});
</script>
