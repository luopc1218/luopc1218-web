<template>
    <n-upload :action="api.url" :accept="props.accept" :file-list="state.uploadingFileList" :max="1"
        @change="handleChange" :show-cancel-button="false" :custom-request="customRequest" :show-file-list="false">
        <slot />
    </n-upload>
</template>

<script setup lang="ts">
import { apis, request } from '@/utils';
import { defineProps, defineEmits, ref, reactive } from 'vue'
import { UploadProps as NUploadProps, NUpload, UploadFileInfo, UploadCustomRequestOptions } from 'naive-ui'

interface UploadProps {
    value?: string,
    accept?: string
}

interface UploadState {
    uploadingFileList: UploadFileInfo[]
}

const api = ref(apis.upload)
const props = defineProps<UploadProps>();

const state = reactive<UploadState>({
    uploadingFileList: []
})

const handleChange = (e: { file: UploadFileInfo, fileList: Array<UploadFileInfo>, event?: Event }) => {
    state.uploadingFileList = e.fileList.filter(item => item.status === "uploading" || item.status === "pending")
}

const emit = defineEmits(['update:value'])

const customRequest = ({
    file,
    onFinish,
    onError,
    onProgress
}: UploadCustomRequestOptions) => {
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.round(Math.random() * 10);
        onProgress({
            percent: progress
        })
        if (progress >= 90) {
            clearInterval(progressInterval)
        }
    }, 1000)
    const formData = new FormData()
    formData.append('file', file.file as File)
    request(apis.upload, formData, {
        headers: {
            "Content-Type": "application/formdata"
        },
        showSuccessMessage: true
    }).then(res => {
        clearInterval(progressInterval)
        onFinish()
        emit('update:value', res)

    }).catch(e => {
        onError()
    })
}

</script>

<style scoped>
</style>