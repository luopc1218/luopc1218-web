<template>
    <n-card>
        <n-space vertical class="articleComment">
            <div class="title">
                评论
            </div>
            <n-space vertical align="center" v-if="store.state.user.userInfo">
                <n-space align="start" justify="center" class="createComment">
                    <n-avatar round :src="store.state.user.userInfo.avatarUrl"></n-avatar>
                    <n-input v-model:value="state.inputingComment" placeholder="请输入评论内容" class="commentInput"
                        type="textarea" :autosize="{ minRows: 4 }">
                    </n-input>
                </n-space>
                <n-button :disabled="!state.inputingComment" size="large" round type="primary"
                    @click="addArticleComment">发表评论</n-button>
            </n-space>
            <div class="tips">
                tips：点击正文即可回复
            </div>
            <PaginationData ref="paginationDataRef" :api="apis.getArticleCommentList"
                :params="{ articleId: props.articleId }">
                <template v-slot:default="{ data }">
                    <n-space vertical align="center" :item-style="{ width: '100%' }" class="
                    commentList">
                        <n-card v-for="item, index in data.list" :key="item.id" class="commentItem"
                            :style="{ animationDelay: `${index / 10}s` }">
                            <n-space align="center">
                                <n-avatar round :src="item.authorAvatarUrl">

                                </n-avatar>
                                <router-link class="authorName" :to="`/profile?id=${item.authorId}`">
                                    {{ item.authorName || "匿名" }}
                                </router-link>
                            </n-space>
                            <div class="time">
                                {{ formatTime(item.createTime) }}
                            </div>
                            <div class="content" @click="handleReplyComment(item)">
                                {{ item.content }}
                            </div>
                            <div>
                                <n-button text @click="toogleSubComments(item)"><i
                                        :class="state.showSubComments.includes(item.id) ? 'icon-comments-fill' : 'icon-comments'"></i>
                                    {{ item.subCommentCount
                                    }}
                                </n-button>

                                <div v-if="state.showSubComments.includes(item.id)">
                                    <n-divider style="margin:1rem 0"></n-divider>
                                    <SubComment :commentId="item.id" />
                                </div>
                            </div>
                        </n-card>
                    </n-space>
                </template>
            </PaginationData>
        </n-space>
    </n-card>
    <ReplyCommentDrawer v-model:replyingComment="state.replyingComment" @replied="handleCommentReplied" />

</template>
    
<script setup lang='ts'>
import { useStore } from '@/store';
import { apis, request, formatTime } from '@/utils';
import { defineProps, onMounted, reactive, ref, nextTick } from 'vue'
import PaginationData from '@/components/PaginationData.vue'
import SubComment from './SubComment.vue'
import ReplyCommentDrawer from './ReplyCommentDrawer.vue'

const store = useStore()

const props = defineProps<{
    articleId: any
}>()

const state = reactive<{
    inputingComment: string,
    addArticleCommentLoading: boolean,
    showSubComments: number[],
    replyingComment?: any
}>({
    inputingComment: "",
    addArticleCommentLoading: false,
    showSubComments: [],
    replyingComment: undefined
})

const paginationDataRef = ref<any>(null)


const addArticleComment = async () => {
    state.addArticleCommentLoading = true;
    try {
        await request(apis.addArticleComment, {
            articleId: props.articleId,
            content: state.inputingComment
        })
        state.inputingComment = "";
        paginationDataRef?.value?.resetData()
        state.addArticleCommentLoading = false
    } catch (error) {
        state.addArticleCommentLoading = false
    }
}

const toogleSubComments = (comment: any) => {
    const commentIndex = state.showSubComments.findIndex(item => item === comment.id)
    if (commentIndex >= 0) {
        state.showSubComments.splice(commentIndex, 1)
    } else {
        state.showSubComments.push(comment.id)
    }
}

const handleReplyComment = (comment: any) => {
    state.replyingComment = comment
}


const handleCommentReplied = (comment: any) => {
    state.showSubComments = [];
    nextTick(() => {
        toogleSubComments(comment);
    })

}
</script>
    
<style lang="scss" scoped>
@keyframes flyIn {
    from {
        opacity: 0;
        transform: translateX(100%);
    }

    to {
        opacity: 1;
        transform: none;
    }
}


.articleComment {
    .title {
        font-size: 25px;
    }

    .createComment {

        .commentInput {
            width: 600px;
        }
    }

    .tips {
        font-size: 12px;
    }

    .commentList {
        .commentItem {
            opacity: 0;
            animation: flyIn .3s ease;
            animation-fill-mode: forwards;

            .authorName {
                color: var(--primary-color)
            }

            .time {
                font-size: 12px;
                // color: #ccc;
                opacity: .6;
            }

            .content {
                padding: 1rem 0;
                cursor: pointer;
                transition: all .3s ease;

                &:hover {
                    opacity: .3;
                }
            }
        }
    }


}
</style>