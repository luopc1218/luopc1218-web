<template>
    <n-space vertical algin="center" class="paginationData" ref="paginationDataRef">
        <div>
            <n-empty v-if="!state.data?.totalCount"></n-empty>
            <slot v-else :data="state.data" :page="state.page" :pageSize="state.pageSize" />
        </div>
        <n-button v-if="hasMore && props.manual" @click="getMore">
            显示更多（{{ state.data?.totalCount - state.data?.list.length }}）
        </n-button>
        <div style="text-align:center" v-if="!hasMore">
            <span class="noMore">
                <n-spin size="small" v-if="state.getDataLoading"></n-spin>
                <span v-else>
                    没有更多了
                </span>
            </span>
        </div>
    </n-space>
</template>
    
<script setup lang='ts'>
import { Api, request, PaginationData } from '@/utils';
import { defineProps, onMounted, onUnmounted, reactive, computed, ref } from 'vue'
import mitt from '@/utils/mitt'

const props = defineProps<{
    api: Api,
    params?: any,
    page?: number,
    pageSize?: number,
    manual?: boolean
}>()

const paginationDataRef = ref<any>(null)


const state = reactive<{
    page: number,
    pageSize: number,
    data: PaginationData,
    getDataLoading: boolean
}>({
    page: props.page || 1,
    pageSize: props.pageSize || 20,
    data: {
        list: [],
        totalCount: 0
    },
    getDataLoading: false
})

const hasMore = computed(() => state.data?.totalCount > state.data?.list.length)

const getData = async () => {
    state.getDataLoading = true;
    try {
        const data = await request<PaginationData>(props.api, { page: state.page, pageSize: state.pageSize, ...props.params });
        if (data) {
            state.data.list = [...state.data.list, ...data.list];
            state.data.totalCount = data.totalCount;
        }
        state.getDataLoading = false;
    } catch (error) {
        state.getDataLoading = false;
    }
}

const getMore = () => {
    state.page += 1;
    getData()
}

const handleScroll = (e: any) => {
    if (!hasMore.value) return;
    const clientHeight = e?.target?.clientHeight
    const scrollTop = e?.target?.scrollTop;
    const offsetTop = paginationDataRef.value.$el.offsetTop;
    if (((scrollTop + clientHeight) >= (offsetTop + paginationDataRef.value.$el.clientHeight)) && !state.getDataLoading) {
        getMore()
    }
}

onMounted(() => {
    getData();
    mitt.on('scroll', handleScroll)
})

onUnmounted(() => {
    mitt.off('scroll', handleScroll)
})
</script>
    
<style lang="scss" scoped>
.paginationData {
    .noMore {
        cursor: not-allowed;
    }
}
</style>