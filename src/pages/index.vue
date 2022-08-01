<template>
    <div class="indexPage">
        <Link />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '@/store';
import Link from '@/components/indexModules/Link.vue'



const store = useStore()

onMounted(() => {
    store.commit('setTitle');
    store.commit('setPath', [])
})

</script>

<style lang="scss" scoped>
.indexPage {
    padding: 1rem;
}
</style>    