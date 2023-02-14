<template>
  <div class="page">
    <n-spin :show="getIndexDataLoading">
      <Welcome :indexData="state.indexData" />
      <Link :indexData="state.indexData" />
      <TimeLine :indexData="state.indexData" />
      <About :indexData="state.indexData" />
      <LeaveMessage :indexData="state.indexData" />
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useStore } from '@/store';
import Welcome from '@/components/indexModules/Welcome.vue';
import About from '@/components/indexModules/About.vue';
import Link from '@/components/indexModules/Link.vue';
import LeaveMessage from '@/components/indexModules/LeaveMessage.vue';
import TimeLine from '@/components/indexModules/TimeLine.vue';
import { apis, request } from '@/utils';


export interface IndexData {
  title: string,
  paths: { title: string, description?: string, time: string }[],
  abouts: { key: string, value: string }[]
}

const store = useStore();

const state = reactive<{ indexData: IndexData }>({
  indexData: {
    title: "",
    paths: [],
    abouts: []
  }
})

const getIndexDataLoading = ref(false)

const getIndexData = async () => {
  getIndexDataLoading.value = true
  state.indexData = await request(apis.getIndexData).finally(() => {
    getIndexDataLoading.value = false
  })
}

onMounted(() => {
  store.commit('setTitle');
  store.commit('setPath', []);
  getIndexData();
});

</script>

<style lang="scss" scoped>
.page {
  // padding: 1rem;
}
</style>
