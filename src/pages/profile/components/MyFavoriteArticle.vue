<template>
    <div>
        <RemoteTable ref="articleListTableRef" :api="apis.getArticleFavoriteList" :columns="tableColumns" />
    </div>
</template>

<script setup lang="ts">
import RemoteTable from '@/components/RemoteTable.vue';
import { apis, formatTime, request } from '@/utils'
import { DataTableColumns, NButton, NSpace, NTag } from 'naive-ui';
import { h, ref } from 'vue';
import { RouterLink } from 'vue-router';

const articleListTableRef = ref<any>(null)

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
            }, () => row.title)
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
            }, () => row.tags.map((item: any) => h(NTag, {
                type: 'primary'
            }, () => item.name)
            ))
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
        key: "control",
        render(row: any) {
            return h(NSpace, {}, () => [
                h(RouterLink, {
                    to: `/blog/article/edit?articleId=${row.id}`
                }, () => h(NButton, { text: true, type: 'primary' }, () => "修改")),
                h(NButton, { text: true, type: "error", onClick: () => handleDeleteArticle(row.id) }, () => "删除"),
            ])
        }
    }
]

const handleDeleteArticle = async (articleId: number) => {
    const d = window._dialog.warning({
        title: "删除文章",
        content: "确定要删除这篇文章嘛？",
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            d.loading = true
            try {
                await request(apis.deleteArticle, {
                    articleId
                }, { showSuccessMessage: true })
                d.loading = false
                articleListTableRef.value.resetData()
                return Promise.resolve()
            } catch (error) {
                d.loading = false
                return Promise.reject()
            }
        }
    })
}


</script>

<style scoped>
</style>