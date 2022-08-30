<template>
    <n-space vertical>
        <PaginationData ref="paginationDataRef" :pageSize="5" :api="apis.getArticleSubCommentList" :params="{
            commentId: props.commentId
        }" manual>
            <template v-slot:default="{ data }">
                <n-space vertical align="center" :item-style="{ width: '100%' }" class="commentList">
                    <div v-for="item in data.list" :key="item.id" class="commentItem">
                        <n-space align="center">
                            <n-avatar size="small" round :src="item.authorAvatarUrl">

                            </n-avatar>
                            <router-link class="authorName" :to="`/profile?id=${item.authorId}`">
                                {{  item.authorName || "匿名"  }}

                            </router-link>
                            <div v-if="item.replyComment">
                                回复
                                {{  item.replyComment.authorName  }}
                            </div>

                            <div>
                                <span @click="handleReplySubComment(item)" class="content">
                                    {{  item.content  }}
                                </span>
                                <span class="replyContent">
                                    {{  item.replyContent  }}
                                </span>
                            </div>
                            <div class="time">
                                {{  formatTime(item.createTime)  }}
                            </div>
                        </n-space>
                    </div>
                </n-space>
            </template>
        </PaginationData>
    </n-space>
    <ReplyCommentDrawer v-model:replyingComment="state.replyingComment" @replied="handleCommentReplied" />

</template>
    
<script setup lang='ts'>
import { defineProps, ref, reactive, defineExpose } from 'vue'
import PaginationData from '@/components/PaginationData.vue'
import { apis, formatTime } from '@/utils'
import { useStore } from '@/store';
import ReplyCommentDrawer from './ReplyCommentDrawer.vue'

const props = defineProps<{
    commentId: number
}>()


const paginationDataRef = ref<any>(null)


const store = useStore()

const state = reactive({
    replyingComment: undefined
})

const handleReplySubComment = (subComment: any) => {
    state.replyingComment = subComment
}

const handleCommentReplied = () => {
    resetData()
}

const resetData = () => paginationDataRef?.value?.resetData()

defineExpose({
    resetData
})

</script>
    
<style lang="scss" scoped>
.commentList {
    .commentItem {
        .authorName {
            color: var(--primary-color)
        }

        .time {
            font-size: 12px;
            // color: #ccc;
            opacity: .6;
        }

        .content {
            cursor: pointer;
            transition: all .3s ease;
            flex: 1;

            &:hover {
                opacity: .3;
            }
        }

        .replyContent {
            padding-left: 1rem;
            opacity: .3;
        }
    }
}
</style>