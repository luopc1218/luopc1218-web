<template>
    <div class="blogHeader">
        <n-breadcrumb>
            <n-breadcrumb-item v-for="item in store.state.path" :key="item.url">
                {{ item.title }}
            </n-breadcrumb-item>
        </n-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';

const store = useStore()
</script>

<style scoped>
.blogHeader {
    padding: 1rem 1rem 0 1rem;
}
</style>