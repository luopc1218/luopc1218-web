<template>
    <n-select v-bind="selectProps" :options="options" :loading="state.loading" :value="props.value"
        @update:value="handleUpdate"></n-select>
</template>

<script setup lang="ts">
import { Api, request } from '@/utils';
import { SelectProps, SelectOption } from 'naive-ui'
import { defineProps, defineEmits, computed, reactive, onMounted, VNode, VNodeChild } from 'vue'

interface RemoteSelectProps extends Omit<SelectProps, 'options' | 'loading' | 'value' | 'on-update:value' | 'onUpdateValue'> {
    api: Api,
    valueKey: string,
    labelKey: string,
    value?: any,
    params?: any,
    labelFormat?: (label: string, response: any) => string
}

interface RemoteSelectState {
    response: any[],
    loading: boolean,
}

const props = defineProps<RemoteSelectProps>();


const selectProps = computed(() => {
    const { api, value, valueKey, labelKey, params, ...restProps } = props
    return restProps
})
const state = reactive<RemoteSelectState>({
    response: [],
    loading: false
})
const emit = defineEmits(['update:value'])

const getOptions = async () => {
    try {
        state.loading = true;
        const responseData = await request<any[]>(props.api, props.params);
        if (responseData) {
            state.response = responseData
        }
        state.loading = false;
    } catch (error) {
        state.loading = false;
    }
}

const options = computed<SelectOption[]>(() => {
    return state.response.map(item => ({
        label: props.labelFormat ? props.labelFormat(item[props.labelKey], item) : item[props.labelKey],
        value: item[props.valueKey]
    }));
})

const handleUpdate = (value: any) => {
    emit('update:value', value)
}


onMounted(() => {
    getOptions()
})
</script>

<style scoped>
</style>