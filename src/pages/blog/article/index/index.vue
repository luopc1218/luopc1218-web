<template>
    <n-space vertical class="blogArticlePage supportDark">
        <n-card>
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
                    <div class="statistics">
                        <div class="viewCount">
                            {{ state.articleInfo.viewCount }}阅读
                        </div>
                        <n-space align="center" justify="center" :size="50">
                            <n-button text @click="handleToggleEvaluate('favorite')">
                                <n-space align="center" class="favorite">
                                    <i
                                        :class="state.articleEvaluate.pickedFavorite ? 'icon-favorites-fill' : 'icon-favorites'"></i>
                                    <div>{{ state.articleEvaluate.favoriteCount }}</div>
                                </n-space>
                            </n-button>
                            <n-button text @click="handleToggleEvaluate('good')">
                                <n-space align="center" class="favorite">
                                    <i :class="state.articleEvaluate.pickedGood ? 'icon-good-fill' : 'icon-good'"></i>
                                    <div>{{ state.articleEvaluate.goodCount }}</div>
                                </n-space>
                            </n-button>
                            <n-button text @click="handleToggleEvaluate('bad')">
                                <n-space align="center" class="favorite">
                                    <i :class="state.articleEvaluate.pickedBad ? 'icon-bad-fill' : 'icon-bad'"></i>
                                    <div>{{ state.articleEvaluate.badCount }}</div>
                                </n-space>
                            </n-button>
                        </n-space>
                    </div>
                </n-space>
            </n-spin>
        </n-card>
        <Comment v-if="state.articleInfo" :articleId="state.articleInfo.id" />
    </n-space>
</template>

<script setup lang="ts">
import { apis, request, formatTime } from '@/utils';
import { computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MdEditor from 'md-editor-v3'
import { useStore } from '@/store';
import Comment from './components/Comment.vue'

const router = useRouter()

const store = useStore()


const state = reactive<{
    articleInfo?: any,
    getArticleInfoLoading: boolean,
    articleEvaluate: {
        favoriteCount: number;
        goodCount: number;
        badCount: number;
        pickedFavorite: boolean;
        pickedGood: boolean;
        pickedBad: boolean;
    },
}>({
    articleInfo: undefined,
    getArticleInfoLoading: false,
    articleEvaluate: {
        favoriteCount: 0,
        goodCount: 0,
        badCount: 0,
        pickedFavorite: false,
        pickedGood: false,
        pickedBad: false,
    },
})

const route = useRoute()

const ownerMode = computed(() => state.articleInfo.authorId === store.state.user.userInfo?.id)

const articleId = computed(() => route.query?.id)

const getArticleInfo = async () => {
    state.getArticleInfoLoading = true
    try {
        const articleInfo = await request(apis.getArticleInfo, { id: articleId.value })
        if (articleInfo) {
            state.articleInfo = articleInfo;
            addArticleViewCount()
            getArticleEvaluate()
        }
        state.getArticleInfoLoading = false
    } catch (error) {
        state.getArticleInfoLoading = false
    }
}

const addArticleViewCount = async () => {
    try {
        await request(apis.addArticleViewCount, {
            articleId: articleId.value
        })
    } catch (error) {
        console.error(error)
    }
}
const getArticleEvaluate = async () => {
    try {
        const articleEvaluate = await request(apis.getArticleEvaluate, {
            articleId: articleId.value,
        })
        if (articleEvaluate) {
            state.articleEvaluate = articleEvaluate
        }
    } catch (error) {
        console.error(error);
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

const handleToggleEvaluate = async (evaluateType: string) => {
    if (!store.state.user.userInfo) {
        store.dispatch("user/requireSignIn")
    } else {
        try {
            await request(apis.toggleArticleEvaluate, {
                articleId: articleId.value,
                evaluateType: evaluateType
            })
            getArticleEvaluate()
        } catch (error) {
            console.error(error);
        }
    }
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
    // padding: 0 1rem;

    .articleInfo {
        .title {
            font-size: 36px;
        }

        .time {
            opacity: .5;
            font-size: 12px;
        }

        .content {
            .md {
                background: transparent;
            }
        }

        .statistics {

            .viewCount {
                font-size: 12px;
                opacity: .5;
            }

            .favorite {
                text-align: center;
                // color: red;
                // font-size: 16px;
                color: var(--primary-color);
                transition: all .3s ease;

                i {
                    font-size: 35px;
                }

                &:hover {
                    opacity: .5;
                }
            }


        }


    }
}
</style>