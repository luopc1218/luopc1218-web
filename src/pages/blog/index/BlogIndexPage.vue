<template>
    <div>test</div>
</template>
<script lang="ts" setup>import { onMounted } from 'vue';
import { useStore } from '@/store';

const store = useStore()

onMounted(() => {
    store.commit('setTitle', 'Luopc1218\'s Blog');
    store.commit('setPath', [{ title: '博客', url: '/blog' }])
})

</script>
<style lang="scss" scoped>
.home {}
</style>