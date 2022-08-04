<template>
    <n-card class="blogArticlePage supportDark">
        <n-spin :show="state.getArticleInfoLoading">
            <n-empty v-if="!state.articleInfo"></n-empty>
            <n-space vertical class="articleInfo" v-else>
                <n-space align="center">
                    <div class="title">
                        {{ state.articleInfo.title }}
                    </div>
                    <n-tag class="tag" size="small" type="primary" v-for="item in state.articleInfo.tags"
                        :key="item.id">
                        {{ item.name }}
                    </n-tag>
                </n-space>
                <n-space class="author" align="center">
                    <n-avatar round :src="state.articleInfo.authorAvatarUrl"></n-avatar>
                    <div>{{ state.articleInfo.authorName }}</div>
                </n-space>
                <div class="time">
                    {{ formatTime(state.articleInfo.createTime) }}
                </div>
                <n-space class="ownerActions" v-if="ownerMode">
                    <n-button text type="primary">编辑</n-button>
                    
                    <n-button text type="primary">删除</n-button>
                    
                </n-space>
                <div class="description">
                    <n-card>
                        {{ state.articleInfo.description }}
                    </n-card>
                </div>
                <div class="content">
                    <MdEditor previewOnly v-model="state.articleInfo.content"
                        :theme="store.state.theme.darkMode ? 'dark' : 'light'" />
                </div>
            </n-space>
        </n-spin>
    </n-card>
</template>

<script setup lang="ts">
import { apis, request, formatTime } from '@/utils';
import { computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import MdEditor from 'md-editor-v3'
import { useStore } from '@/store';

const store = useStore()


const state = reactive<{
    articleInfo?: any,
    getArticleInfoLoading: boolean
}>({
    articleInfo: undefined,
    getArticleInfoLoading: false
})

const route = useRoute()

const ownerMode = computed(() => state.articleInfo.authorId === store.state.user.userInfo?.id)

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

<style lang="scss" scoped>
.blogArticlePage {

    .articleInfo {
        .title {
            font-size: 36px;
        }

        .time {
            opacity: .8;
            font-size: 12px;
        }

        .content {}
    }
}
</style>