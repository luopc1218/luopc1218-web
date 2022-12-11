<template>
    <n-spin :show="state.getArticleInfoLoading">
        <n-card>
            <n-form ref="formRef" :label-width="80" :model="formValue" :rules="formRules">
                <n-form-item label="标题" path="title">
                    <n-input-group>
                        <RemoteSelect :api="apis.getArticleGroupList" valueKey="id" labelKey="label" style="width:180px"
                            placeholder="请选择文章组（可选）" v-model:value="formValue.groupId" />
                        <n-input v-model:value="formValue.title" placeholder="请输入文章标题" show-count
                            style="max-width:640px" :maxlength="40"></n-input>
                    </n-input-group>
                </n-form-item>
                <n-form-item label="简介" path="description">
                    <n-input type="textarea" v-model:value="formValue.description" placeholder="请输入文章简介" show-count
                        :maxlength="100" :autosize="{ minRows: 3 }">
                    </n-input>
                </n-form-item>
                <n-form-item label="标签" path="tag">
                    <n-dynamic-tags v-model:value="formValue.tags" @create="onCreateTag" type="primary">
                        <template #input="{ submit }">
                            <n-auto-complete ref="tagInputerRef" size="small" v-model:value="state.inputingTag"
                                :loading="state.getTagListLoading" :options="tagSelectOptions" placeholder="请输入标签"
                                autoFocus :clear-after-select="true" @select="handleSelectTag($event, submit)"
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
                <n-form-item>
                    <div style="width:100%;text-align:center">
                        <n-space justify="center">
                            <n-button size="large" style="width:150px" round type="primary" attr-type="submit"
                                @click="handleSubmit" :loading="state.submitLoading">{{ props.editMode ? '修改文章' : '发表文章'
                                }}
                            </n-button>
                        </n-space>
                    </div>
                </n-form-item>
            </n-form>
        </n-card>
    </n-spin>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, defineProps } from 'vue';
import { useStore } from '@/store/index';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { FormInst, AutoCompleteInst, FormRules } from 'naive-ui';
import RemoteSelect from '@/components/RemoteSelect.vue'
import apis from '@/utils/apis'
import { request } from '@/utils';
import _ from 'lodash'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()

const route = useRoute()

const store = useStore()

const props = defineProps<{
    editMode?: boolean,
    articleId?: number
}>()

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
        required: true,
        message: '请输入文章标题',
    },
    description: {
        required: true,
        message: '请输入文章简介'
    },
    content: {
        required: true,
        message: '请输入文章内容'
    },
}))

const state = reactive<{
    inputingTag: string;
    getTagListLoading: boolean;
    tagList: {
        id: number,
        name: string
    }[],
    submitLoading: boolean,
    getArticleInfoLoading: boolean
}>({
    inputingTag: '',
    getTagListLoading: false,
    tagList: [],
    submitLoading: false,
    getArticleInfoLoading: false
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


/**
 * 获取标签列表
 */
const getTagList = _.debounce(async (query: string) => {
    if (!query) {
        state.tagList = []
    } else {
        try {
            state.getTagListLoading = true
            const newTagList = await request<{
                id: number;
                name: string;
            }[]>(apis.getArticleTagList, { query }, {
                showErrorMessage: false
            })
            if (newTagList) {
                state.tagList = newTagList
            }
            state.getTagListLoading = false
        } catch (error) {
            state.getTagListLoading = false
            state.tagList = []
        }
    }
}, 500)

const handleAdd = async () => {
    state.submitLoading = true
    try {
        const articleInfo = await request(apis.addArticle, {
            title: formValue.title,
            description: formValue.description,
            content: formValue.content,
            tags: formValue.tags.filter(tag => !!tag.value).map(tag => tag.value),
            newTags: formValue.tags.filter(tag => !tag.value).map(tag => tag.label),
        }, {
            showSuccessMessage: true
        })
        state.submitLoading = false;
        if (articleInfo.id) {
            router.push(`/blog/article?id=${articleInfo.id}`)
        }
    } catch (e) {
        state.submitLoading = false;
    }
}

const handleSave = async () => {
    const d = window._dialog.create({
        title: '提示',
        content: '确定要修改这篇文章？',
        positiveText: '确认修改',
        onPositiveClick() {
            d.loading = true
            return new Promise<void>((reslove, reject) => {
                request(apis.saveArticle, {
                    id: props.articleId,
                    title: formValue.title,
                    description: formValue.description,
                    content: formValue.content,
                    tags: formValue.tags.filter(tag => !!tag.value).map(tag => tag.value),
                    newTags: formValue.tags.filter(tag => !tag.value).map(tag => tag.label),
                }, {
                    showSuccessMessage: true
                }).then(articleInfo => {
                    d.loading = false
                    if (articleInfo.id) {
                        router.push(`/blog/article?id=${articleInfo.id}`)
                    }
                    reslove()
                }).catch(e => {
                    d.loading = false
                    reject(e)
                })

            })
        }
    })

}



const handleSubmit = (e: Event) => {
    e.preventDefault();
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            if (props.editMode) {
                handleSave()
            } else {
                handleAdd()
            }
        }
    })
}

const getArticleInfo = async (articleId: number) => {
    state.getArticleInfoLoading = true;
    try {
        const articleInfo = await request(apis.getArticleInfo, {
            id: articleId
        })
        console.log(articleInfo);
        formValue.title = articleInfo.title;
        formValue.description = articleInfo.description;
        formValue.tags = articleInfo.tags.map((item: any) => ({
            label: item.name,
            value: item.id
        }));
        formValue.content = articleInfo.content;
        state.getArticleInfoLoading = false;
    } catch (e) {
        state.getArticleInfoLoading = false;
    }
}

onMounted(() => {
    if (props.editMode && props.articleId) {
        getArticleInfo(props.articleId)
    }
    store.commit('setPath', [
        { title: '博客', url: '/blog' },
        {
            title: `文章#${props.articleId}`, url: `/blog/article?id=${props.articleId}`, hide: !props.editMode
        },
        {
            title: "修改文章", url: `/blog/article/edit?articleId=${props.articleId}`, hide: !props.editMode
        },
        {
            title: '发表文章', url: "/blog/article/add", hide: !!props.editMode
        }])

})
</script>

<style scoped>
</style>