<template>
    <div class="blogArticlePage">
        <n-spin :show="state.getArticleInfoLoading">
            <n-empty v-if="!state.articleInfo"></n-empty>
            <div class="articleInfo" v-else>
                {{ state.articleInfo.title }}
            </div>
        </n-spin>
    </div>
</template>

<script setup lang="ts">
import { apis, request } from '@/utils';
import { computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';


const state = reactive<{
    articleInfo?: {
        title: string
    },
    getArticleInfoLoading: boolean
}>({
    articleInfo: undefined,
    getArticleInfoLoading: false
})

const route = useRoute()

const articleId = computed(() => route.query?.id)

const getArticleInfo = async () => {
    state.getArticleInfoLoading = true
    try {
        const articleInfo = await request(apis.getArticleInfo, { id: articleId.value })
        if (articleInfo) {
            state.articleInfo = articleInfo
        }
        state.getArticleInfoLoading = false
    } catch (error) {
        state.getArticleInfoLoading = false
    }
}

onMounted(() => {
    console.log(route);

    getArticleInfo()
})

</script>

<style scoped>
</style>