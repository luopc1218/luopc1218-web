<template>
    <div>
        <n-data-table :data="state.data.list" :columns="props.columns" bordered></n-data-table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, defineProps } from 'vue';
import { DataTableColumns } from 'naive-ui'

const props = defineProps<{
    columns: DataTableColumns
}>()

const state = reactive({
    getDataLoading: false,
    data: {
        list: [],
        totalCount: 0
    }
})

const getData = async () => {
    state.getDataLoading = true;
    try {
        state.getDataLoading = false;
    } catch (error) {
        state.getDataLoading = false;
    }
}

onMounted(() => {

})

</script>

<style scoped>
</style>