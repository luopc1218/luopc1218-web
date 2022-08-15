<template>
    <PaginationData :api="apis.getArticleSubCommentList" :params="{
        commentId: props.commentId
    }" manual>

    </PaginationData>

</template>
    
<script setup lang='ts'>
import { defineProps, onMounted, reactive } from 'vue'
import PaginationData from '@/components/PaginationData.vue'
import { apis } from '@/utils'

const props = defineProps<{
    commentId: number
}>()

const state = reactive({

})

onMounted(() => {
})
</script>
    
<style>
</style>