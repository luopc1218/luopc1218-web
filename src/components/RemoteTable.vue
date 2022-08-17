<template>
    <div>
        <n-data-table :loading="state.getDataLoading" :data="state.data.list" :columns="props.columns" bordered
            :pagination="pagination">
        </n-data-table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, defineProps, computed, nextTick } from 'vue';
import { DataTableColumns } from 'naive-ui'
import { Api, PaginationData, request } from '@/utils';

const pagination = computed(() => ({
    "item-count": state.data.totalCount,
    page: state.page,
    "page-size": state.pageSize,
    "on-update:page": handlePageChange,
    "on-update:page-size": handlePageSizeChange,
}))

const props = defineProps<{
    columns: DataTableColumns,
    api: Api,
    params?: any,
    pageSize?: number
}>()

const state = reactive<{
    getDataLoading: boolean,
    data: PaginationData,
    page: number,
    pageSize: number
}>({
    getDataLoading: false,
    data: {
        list: [],
        totalCount: 0
    },
    page: 1,
    pageSize: props.pageSize || 20
})

const getData = async () => {
    state.getDataLoading = true;
    try {
        const data = await request<PaginationData>(props.api, { page: state.page, pageSize: state.pageSize, ...props.params })
        if (data) {
            state.data = data
        }
        state.getDataLoading = false;
    } catch (error) {
        state.getDataLoading = false;
    }
}

const handlePageChange = (page: number) => {
    state.page = page;
    nextTick(() => {
        getData()
    })
}

const handlePageSizeChange = (pageSize: number) => {
    state.pageSize = pageSize;
    nextTick(() => {
        getData()
    })
}

const resetData = () => {
    state.page = 1;
    nextTick(() => {
        getData()
    })
}

onMounted(() => {
    getData()
})

</script>

<style scoped>
</style>