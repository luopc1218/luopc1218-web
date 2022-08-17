<template>
    <div>
        <RemoteTable :api="apis.getUserArticleList" :columns="tableColumns" />
    </div>
</template>

<script setup lang="ts">
import RemoteTable from '@/components/RemoteTable.vue';
import { apis } from '@/utils'

const tableColumns = [
    {
        title: '标题',
        key: 'title'
    },
    {
        title: '简介',
        key: 'description'
    },
    {
        title: '作者',
        key: 'authorName'
    },
    {
        title: "上传时间",
        key: 'createTime'
    },
    {
        title: "操作"
    }
]


</script>

<style scoped>
</style>