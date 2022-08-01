<template>
    <div class="footer" ref="footerRef">
        powered by luopc1218
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { onMounted, ref } from 'vue';

const footerRef = ref<any>(null)

const store = useStore()

onMounted(() => {
    store.commit('setFooterHeight', footerRef?.value?.clientHeight)
})
</script>

<style scoped>
.footer {
    text-align: center;
    padding: 2rem;
    color: #ccc;
}
</style>