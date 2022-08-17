<template>
    <div>
        <RemoteTable :api="apis.getUserArticleList" :columns="tableColumns" />
    </div>
</template>

<script setup lang="ts">
import RemoteTable from '@/components/RemoteTable.vue';
import { apis, formatTime } from '@/utils'
import { DataTableColumns, NSpace, NTag } from 'naive-ui';
import { h } from 'vue';
import { RouterLink } from 'vue-router';

const tableColumns: DataTableColumns = [
    {
        title: '标题',
        key: 'title',
        render(row: any) {
            return h(RouterLink, {
                to: `/blog/article?id=${row.id}`,
                style: {
                    color: "var(--primary-color)"
                }
            }, row.title)
        }
    },
    {
        title: '简介',
        key: 'description'
    },
    {
        title: "标签",
        key: 'tags',
        render(row: any) {
            return h(NSpace, {
                align: "center"
            }, row.tags.map((item: any) => h(NTag, {
                type: 'primary'
            }, item.name)))
        }
    },
    {
        title: '作者',
        key: 'authorName'
    },
    {
        title: "上传时间",
        key: 'createTime',
        render(row: any) {
            return formatTime(row.createTime)
        }
    },
    {
        title: "操作",
        key: "control"
    }
]


</script>

<style scoped>
</style>