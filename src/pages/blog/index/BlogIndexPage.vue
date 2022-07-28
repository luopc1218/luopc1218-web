<template>
    <div class="blogIndexPage">
        <div class="articleList">
            <router-link v-for="item in state.articleList" :key="item.id" :to="`/blog/article?id=${item.id}`">
                <n-card hoverable class="articleItem">

                    <n-button text class="title">
                        {{ item.title }}
                    </n-button>
                    <n-space align="center">
                        <div class="time">
                            <span>发表于：</span>
                            <span>
                                {{ formatTime(item.createTime) }}
                            </span>
                        </div>
                        <div class="tagList" v-if="item.tags.length > 0">
                            <span>标签：</span>
                            <n-space>
                                <n-tag class="tag" size="small" checked v-for="tag in item.tags" :key="tag.id"
                                    checkable>{{
                                            tag.name
                                    }}
                                </n-tag>
                            </n-space>
                        </div>
                    </n-space>
                    <div class="description">
                        {{ item.description }}
                    </div>
                </n-card>
            </router-link>
        </div>
    </div>
</template>
<script lang="ts" setup>import { onMounted, reactive } from 'vue';
import { useStore } from '@/store';
import { apis, request } from '@/utils';
import { formatTime } from '@/utils/index'

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
    store.commit('setPath', [{ title: '博客', url: '/blog' }, { title: "最新文章", url: "/blog" }])

    getArticleList()
})

</script>
<style lang="scss" scoped>
.blogIndexPage {
    .articleList {
        .articleItem {
            margin-bottom: 1rem;
            cursor: pointer;

            .title {
                font-size: 25px;
                font-weight: bolder;
            }

            .time {
                font-size: 12px;
            }

            .tagList {
                font-size: 12px;

                display: flex;
                align-items: center;

                .tag {}
            }
        }
    }
}
</style>