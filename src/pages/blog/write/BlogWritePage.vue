<template>
    <div>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules">
            <n-form-item label="标题" path="title">
                <n-input-group>
                    <RemoteSelect :api="apis.getArtivleGroupList" valueKey="id" labelKey="label" style="width:180px"
                        placeholder="请选择文章组（可选）" v-model:value="formValue.groupId" />
                    <n-input v-model:value="formValue.title" placeholder="请输入文章标题" show-count style="max-width:640px"
                        :maxlength="40"></n-input>
                </n-input-group>
            </n-form-item>
            <n-form-item label="简介" path="description ">
                <n-input type="textarea" v-model:value="formValue.description" placeholder="请输入文章简介" show-count
                    :maxlength="100" :autosize="{ minRows: 3 }">
                </n-input>
            </n-form-item>
            <n-form-item label="标签" path="tag">
                <n-dynamic-tags v-model:value="formValue.tags" @create="onCreateTag">
                    <template #input="{ submit }">
                        <n-auto-complete ref="tagInputerRef" size="small" v-model:value="state.inputingTag"
                            :loading="state.getTagListLoading" :options="tagSelectOptions" placeholder="请输入标签" autoFocus
                            :clear-after-select="true" @select="handleSelectTag($event, submit)"
                            @blur="submit(state.inputingTag); state.inputingTag = ''" @update:value="getTagList" />
                    </template>
                    <template #trigger="{ activate, disabled }">
                        <n-button size="small" type="primary" dashed :disabled="disabled"
                            @click="handleAddTag(activate)">
                            添加
                        </n-button>
                    </template>
                </n-dynamic-tags>

            </n-form-item>
            <n-form-item label="正文（MarkDown）" path="content">
                <MdEditor v-model="formValue.content" :theme="store.state.theme.darkMode ? 'dark' : 'light'" />
            </n-form-item>
            <n-space justify="center">
                <n-button size="large" style="width:150px" round type="primary" attr-type="submit"
                    @click="handleSubmit">提交</n-button>
            </n-space>
        </n-form>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import { useStore } from '@/store/index';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { FormInst, AutoCompleteInst, FormRules } from 'naive-ui';
import RemoteSelect from '@/components/RemoteSelect.vue'
import apis from '@/utils/apis'
import { request } from '@/utils';

const store = useStore()

const tagInputerRef = ref<AutoCompleteInst | undefined>(undefined)

const formRef = ref<FormInst | undefined>(undefined)

const formValue = reactive<{
    title: string;
    description: string;
    tags: any[];
    content: string;
    groupId?: number;
}>({
    title: "",
    groupId: undefined,
    description: '',
    tags: [],
    content: ''
})

const formRules = computed<FormRules>(() => ({
    title: {
        require: true,
        message: '请输入文章标题',
    },
    description: {
        require: true,
        message: '请输入文章简介'
    },
    content: {
        require: true,
        message: '请输入文章内容'
    },
}))

const state = reactive<{
    inputingTag: string;
    getTagListLoading: boolean;
    tagList: {
        id: number,
        name: string
    }[]
}>({
    inputingTag: '',
    getTagListLoading: false,
    tagList: []
})



const handleAddTag = (activate: any) => {
    activate();
    nextTick(() => {
        tagInputerRef.value?.focus()
    })

}

const handleSelectTag = (value: any, submit: any) => {
    const tag = state.tagList.find(item => item.id === value)
    formValue.tags.push({
        value: tag?.id,
        label: tag?.name
    })
}

const tagSelectOptions = computed(() => state.tagList.map(item => ({
    value: item?.id,
    label: item?.name,
    disabled: formValue.tags.findIndex(findItem => findItem.value === item.id) >= 0
})))

const onCreateTag = (value: string) => {
    return {
        value: undefined,
        label: value
    }
}

const getTagList = async (query: string) => {
    if (!query) {
        state.tagList = []
    } else {
        try {
            state.getTagListLoading = true
            const newTagList = await request<{
                id: number;
                name: string;
            }[]>(apis.getArticleTagList, { query })
            if (newTagList) {
                state.tagList = newTagList
            }
            state.getTagListLoading = false
        } catch (error) {
            state.getTagListLoading = false
            state.tagList = []
        }
    }

}

const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log(formRef);

    formRef.value?.validate((errors) => {
        console.log(errors);

        if (!errors) {
            console.log(formValue);

        }
    })
}

onMounted(() => {
    store.commit('setTitle', 'Luopc1218\'s Blog');
    store.commit('setPath', [
        { title: '博客', url: '/blog' },
        {
            title: '写文章', url: '/blog/write'
        }])
})
</script>

<style scoped>
</style>