<template>
    <n-drawer :show="!!props.replyingComment" @update:show="handleClose" :width="500">
        <n-drawer-content
            :title="`回复：${props.replyingComment.authorName}${props.replyingComment.commentId ? '的回复' : ''}`" closable
            v-if="props.replyingComment">
            <div vertical class="comment">
                <n-space align="center" class="author">
                    <n-avatar round :src="props.replyingComment.authorAvatarUrl">

                    </n-avatar>
                    <div>
                        {{ props.replyingComment.authorName || "匿名" }}
                    </div>
                </n-space>
                <div class="time">
                    {{ formatTime(props.replyingComment.createTime) }}
                </div>
                <div class="content">
                    {{ props.replyingComment.content }}
                </div>
            </div>
            <n-divider></n-divider>
            <n-space vertical class="reply" align="center">
                <n-input type="textarea" :autosize="{ minRows: 2 }" style="width: 500px;"
                    v-model:value="state.replyContent">

                </n-input>
                <n-button round type="primary" size="large" :loading="state.replyLoading" @click="handleReply"
                    :disabled="!state.replyContent">
                    回复
                </n-button>
            </n-space>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, reactive } from 'vue'
import { formatTime, request, apis } from '@/utils'

const props = defineProps<{
    replyingComment?: any
}>()

const state = reactive({
    replyLoading: false,
    replyContent: ""
})

const emit = defineEmits(['update:replyingComment', 'replied'])

const handleReply = async () => {
    state.replyLoading = true;
    try {
        await request(apis.addArticleComment, {
            articleId: props.replyingComment.articleId,
            commentId: props.replyingComment.commentId ? props.replyingComment.commentId : props.replyingComment.id,
            subCommentId: props.replyingComment.commentId ? props.replyingComment.id : undefined,
            content: state.replyContent
        }, {
            showSuccessMessage: true
        })
        state.replyContent = ''
        state.replyLoading = false
        handleClose()
        emit("replied", props.replyingComment)
    } catch (e) {
        state.replyLoading = false
    }

}

const handleClose = () => {
    emit("update:replyingComment", undefined)
}


</script>

<style lang="scss" scoped>
.comment {
    .time {
        font-size: 12px;
        // color: #ccc;
        opacity: .6;
    }

    .content {
        padding: 1rem 0;
    }
}
</style>