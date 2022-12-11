<template>
    <BlogArticleAddPage v-if="!!articleId" editMode :articleId="articleId" />
    <n-empty v-else>

    </n-empty>
</template>
    
<script setup lang='ts'>
import BlogArticleAddPage from '@/pages/blog/article/add/index.vue'
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()


const articleId = computed<number | undefined>(() => typeof route.query?.articleId === 'string' ? parseInt(route.query?.articleId) : undefined)
</script>
    
<style>
</style>