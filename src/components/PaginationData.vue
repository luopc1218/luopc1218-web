<template>
    <n-spin size="small" :show="state.getDataLoading">
        <n-space vertical algin="center" class="paginationData" ref="paginationDataRef">
            <div>
                <n-empty v-if="state.data.totalCount === 0"></n-empty>
                <slot v-else :data="state.data" :page="state.page" :pageSize="state.pageSize" />
            </div>
            <n-button text v-if="hasMore && props.manual" @click="getMore">
                显示更多（{{  state.data.totalCount - state.data?.list.length  }}）
            </n-button>

            <div style="text-align:center" v-if="!hasMore && state.data.list.length > 0 && !props.hideNoMoreText">
                <span class="noMore">
                    <span>
                        没有更多了
                    </span>
                </span>
            </div>
        </n-space>
    </n-spin>

</template>
    
<script setup lang='ts'>
import { Api, request, PaginationData } from '@/utils';
import { defineProps, onMounted, onUnmounted, reactive, computed, ref, defineExpose } from 'vue'
import mitt from '@/utils/mitt'

const props = defineProps<{
    api: Api,
    params?: any,
    page?: number,
    pageSize?: number,
    manual?: boolean,
    hideNoMoreText?: boolean
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

const resetData = () => {
    state.page = 1;
    getData(true)
}

const getData = async (reset?: boolean) => {
    state.getDataLoading = true;
    try {
        const data = await request<PaginationData>(props.api, { page: state.page, pageSize: state.pageSize, ...props.params });
        if (data) {
            if (reset) {
                state.data = data
            } else {
                state.data.list = [...state.data.list, ...data.list];
                state.data.totalCount = data.totalCount;
            }

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
    if (!hasMore.value || props.manual) return;
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

defineExpose({
    resetData
})
</script>
    
<style lang="scss" scoped>
.paginationData {
    overflow: hidden;

    .noMore {
        cursor: not-allowed;
    }
}
</style>