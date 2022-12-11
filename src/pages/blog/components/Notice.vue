<template>
    <n-card class="notice">
        <n-divider class="title">
            公告
        </n-divider>
        <n-spin :show="state.getNoticeLoading">
            <div v-if="state.notice" class="notice">
                {{ state.notice.content }}
                <div style="text-align:right">
                    <div>
                        ——— {{ state.notice.authorName }}
                    </div>
                    <div class="time">
                        {{ formatTime(state.notice.createTime) }}
                    </div>
                </div>
                <div style="text-align:center" v-if="store.state.user.adminMode">
                    <n-button type="primary" round @click="handleChangeNotice">修改</n-button>
                </div>
            </div>
            <n-empty v-else />
        </n-spin>
    </n-card>
</template>

<script setup lang="ts">
import { h, onMounted, reactive } from 'vue';
import { apis, formatTime, request } from '@/utils'
import { DialogReactive, NInput } from 'naive-ui'
import { useStore } from '@/store';

const store = useStore()

const state = reactive<{
    notice: any,
    getNoticeLoading: boolean,
    newNotice: string
}>({
    notice: undefined,
    getNoticeLoading: false,
    newNotice: "",
})


const getNotice = async () => {
    state.getNoticeLoading = true;
    try {
        const notice = await request(apis.getNotice)
        if (notice) {
            state.notice = notice
        }
        state.getNoticeLoading = false
    } catch (error) {
        state.getNoticeLoading = false
    }
}

const changeNotice = async (d: DialogReactive) => {
    if (!state.newNotice) {
        window._message.error("请输入新公告")
        return Promise.reject()
    } else {
        d.loading = true;
        try {
            await request(apis.changeNotice, {
                content: state.newNotice
            }, {
                showSuccessMessage: true
            })
            state.newNotice = ""
            d.loading = false;
            getNotice()
            return Promise.resolve()
        } catch (error) {
            d.loading = false
            return Promise.reject()
        }
    }
}

const handleChangeNotice = () => {
    const d = window._dialog.create({
        showIcon: false,
        title: '修改公告',
        content: () => h(NInput, {
            type: 'textarea',
            autosize: { minRows: 2 },
            value: state.newNotice,
            onUpdateValue: (value) => { state.newNotice = value },
            placeholder: "请输入新公告"
        }),
        positiveText: '提交',
        positiveButtonProps: {
        },
        onPositiveClick: () => changeNotice(d)
    })
}

onMounted(() => {
    getNotice()
})

</script>

<style lang="scss" scoped>
.notice {
    margin-bottom: 1rem;

    .title {
        margin: 0 0 1rem 0
    }

    .time {
        font-size: 12px;
        opacity: .8;
    }
}
</style>