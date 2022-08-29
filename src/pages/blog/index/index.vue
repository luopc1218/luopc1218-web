<template>
    <div class="blogIndexPage">
        <PaginationData :api="apis.getArticleList" :params="{ pageSize: 10 }">
            <template v-slot:default="{ data, pageSize }">
                <div class="articleList">
                    <router-link v-for="(item, index) in data.list" :key="item.id" :to="`/blog/article?id=${item.id}`">
                        <n-card hoverable class="articleItem"
                            :style="{ animationDelay: `${(index % pageSize) / pageSize}s` }">
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
                                        <n-tag class="tag" size="small" type="primary" v-for="tag in item.tags"
                                            :key="tag.id">{{
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
            </template>
        </PaginationData>

    </div>
</template>
<script lang="ts" setup>import { onMounted, reactive } from 'vue';
import { useStore } from '@/store';
import { apis, request } from '@/utils';
import { formatTime } from '@/utils/index'
import PaginationData from '@/components/PaginationData.vue'

const store = useStore()


onMounted(() => {
    store.commit('setPath', [{ title: '博客', url: '/blog' }, { title: "最新文章", url: "/blog" }])
})

</script>
<style lang="scss" scoped>
@keyframes flyTop {
    from {
        opacity: 0;
        transform: translateX(100%);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.blogIndexPage {
    .articleList {

        .articleItem {
            opacity: 0;
            margin-bottom: 1rem;
            animation: flyTop .3s ease;
            animation-fill-mode: forwards;

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