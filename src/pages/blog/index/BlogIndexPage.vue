<template>
    <div>test</div>
</template>
<script lang="ts" setup>import { onMounted, reactive } from 'vue';
import { useStore } from '@/store';
import { apis, request } from '@/utils';

const store = useStore()

const state = reactive<{
    getArticleListLoading: boolean;
    articleList: any[];
}>({
    getArticleListLoading: false,
    articleList: []
})

const getArticleList = async () => {
    state.getArticleListLoading = true
    try {
        const articleList = await request(apis.getArticleList)
        if (articleList) {
            state.articleList = articleList
        }
        state.getArticleListLoading = false;
    } catch (error) {
        state.getArticleListLoading = false;
    }
}

onMounted(() => {
    store.commit('setTitle', 'Luopc1218\'s Blog');
    store.commit('setPath', [{ title: '博客', url: '/blog' }])

    getArticleList()
})

</script>
<style lang="scss" scoped>
.home {}
</style>