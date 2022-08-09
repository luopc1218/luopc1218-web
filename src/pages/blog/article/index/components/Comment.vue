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

            <PaginationData ref="paginationDataRef" :api="apis.getArticleCommentList"
                :params="{ articleId: props.articleId }">
                <template v-slot:default="{ data }">
                    <n-space vertical align="center" :item-style="{ width: '100%' }" class="
                    commentList">
                        <n-card v-for="item, index in data.list" :key="item.id" class="commentItem"
                            :style="{ animationDelay: `${index / 10}s` }">
                            <n-space align="center" class="author">
                                <n-avatar round :src="item.authorAvatarUrl">

                                </n-avatar>
                                <div>
                                    {{ item.authorName || "匿名" }}
                                </div>
                            </n-space>
                            <div class="time">
                                {{ formatTime(item.createTime) }}
                            </div>
                            {{ item.content }}
                        </n-card>
                    </n-space>
                </template>
            </PaginationData>
        </n-space>

    </n-card>
</template>
    
<script setup lang='ts'>
import { useStore } from '@/store';
import { apis, request, formatTime } from '@/utils';
import { defineProps, onMounted, reactive, ref } from 'vue'
import PaginationData from '@/components/PaginationData.vue'

const store = useStore()

const props = defineProps<{
    articleId: any
}>()

const state = reactive<{
    inputingComment: string,
    addArticleCommentLoading: boolean
}>({
    inputingComment: "",
    addArticleCommentLoading: false,

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

    .commentList {
        .commentItem {
            opacity: 0;
            animation: flyIn .3s ease;
            animation-fill-mode: forwards;

            .time {
                font-size: 12px;
                // color: #ccc;
                opacity: .6;
            }
        }
    }


}
</style>