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
                <n-space class="time">
                    <div>发表于{{ formatTime(state.articleInfo.createTime) }}</div>
                    <div v-if="state.articleInfo.updateTime">修改于{{ formatTime(state.articleInfo.updateTime) }}</div>
                </n-space>
                <n-space class="ownerActions" v-if="ownerMode">
                    <router-link :to="`/blog/article/edit?articleId=${articleId}`">
                        <n-button text type="primary">编辑</n-button>
                    </router-link>

                    <n-button text type="primary" @click="handleDeleteArticle">删除</n-button>

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
import { useRoute, useRouter } from 'vue-router';
import MdEditor from 'md-editor-v3'
import { useStore } from '@/store';

const router = useRouter()

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

const handleDeleteArticle = () => {
    const d = window._dialog.error({
        title: "警告",
        content: "确定要删除这篇文章吗？",
        positiveText: "确定",
        positiveButtonProps: {
            type: "error"
        },
        onPositiveClick() {
            d.loading = true;
            return new Promise<void>((reslove, reject) => {
                request(apis.deleteArticle, {
                    articleId: articleId.value
                }, {
                    showSuccessMessage: true
                }).then(() => {
                    d.loading = false;
                    router.replace('/blog')
                    reslove()
                }).catch(e => {
                    d.loading = false
                    reject(e)
                })
            })
        }
    })
}


onMounted(() => {
    store.commit("setPath", [
        {
            title: '博客', url: '/blog',
        },
        {
            title: `文章#${articleId.value}`, url: route.fullPath
        }
    ])

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