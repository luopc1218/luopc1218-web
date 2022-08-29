<template>
    <div class="remoteTable">
        <n-data-table :loading="state.getDataLoading" :data="state.data.list" :columns="props.columns" bordered
            :pagination="false">
        </n-data-table>
        <n-space justify="end">
            <n-pagination class="pagination" v-model:page="state.page" show-quick-jumper show-size-picker
                :page-count="pageCount" :page-sizes="[10, 20, 50, 100]" v-model:pageSize="state.pageSize" />
        </n-space>

    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, defineProps, nextTick, defineExpose, watch, computed } from 'vue';
import { DataTableColumns } from 'naive-ui'
import { Api, PaginationData, request } from '@/utils';



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
    pageSize: 10
})

const pageCount = computed(() => (state.data.totalCount / state.pageSize).toFixed(0))

const getData = async () => {
    state.getDataLoading = true;
    try {
        const data = await request<PaginationData>(props.api, { page: state.page, pageSize: state.pageSize, ...props.params },)
        if (data) {
            state.data = data
        }
        state.getDataLoading = false;
    } catch (error) {
        state.getDataLoading = false;
    }
}


watch([() => state.page, () => state.pageSize], () => {
    getData()
})

const resetData = () => {
    if (state.page === 1) {
        getData()
    }
    else {
        state.page = 1;
    }
}

onMounted(() => {
    getData()
})

defineExpose({
    resetData
})

</script>

<style lang="scss" scoped>
.remoteTable {
    .pagination {
        margin-top: 1rem;
    }
}
</style>