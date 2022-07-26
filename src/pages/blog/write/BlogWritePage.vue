<template>
    <div>
        <n-form ref="formRef" label-placement="top" :label-width="80" :model="formValue" :rules="rules">
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
            <n-form-item label="标签" path="tag"></n-form-item>
            <n-form-item label="正文（MarkDown）" path="content">
                <MdEditor v-model="formValue.content" :theme="store.state.theme.darkMode ? 'dark' : 'light'" />
            </n-form-item>
            <n-form-item>
                <n-button size="large" round type="primary" attr-type="submit" @click="handleSubmit">提交</n-button>
            </n-form-item>
        </n-form>

    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useStore } from '@/store/index';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { FormInst } from 'naive-ui';
import RemoteSelect from '@/components/RemoteSelect.vue'
import apis from '@/utils/apis'

interface FormValue {
    title: string;
    description: string;
    tag: any[];
    content: string;
    groupId?: number;
}

const store = useStore()

const formRef = ref<FormInst | null>(null)

const formValue = ref<FormValue>({
    title: "",
    groupId: undefined,
    description: '',
    tag: [],
    content: ''
})

const rules = {
    title: {
        require: true,
        message: '请输入文章标题'
    },
    description: {
        require: true,
        message: '请输入文章简介'
    },
    content: {
        require: true,
        message: '请输入文章内容'
    },
}

const state = reactive({

})

const handleSubmit = () => [
    formRef.value?.validate((errors) => {
        if (!errors) {
            console.log(formValue);

        }
    })
]

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